'use client';

import Link, { type LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useEffect, useCallback, useState, useMemo } from 'react';

export interface SmartLinkProps extends LinkProps {
  prefetch?: boolean;
  rootMargin?: string;
  viewportDelay?: number;
  enableViewport?: boolean;
  enableHover?: boolean;
  hoverDelay?: number;
  threshold?: number;
  priority?: 'high' | 'medium' | 'low';
  maxRetries?: number;
  retryDelay?: number;
  onPrefetchStart?: () => void;
  onPrefetchSuccess?: () => void;
  onPrefetchError?: (error: unknown) => void;
  onPrefetchRetry?: (attempt: number) => void;
  children: React.ReactNode;
  className?: string;
  showStatus?: boolean;
}

type PrefetchState = 'idle' | 'loading' | 'success' | 'error' | 'retrying';

interface NetworkInfo {
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  saveData: boolean;
}

// NetworkInformation interface for TypeScript compatibility
interface NetworkInformation extends EventTarget {
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  saveData: boolean;
  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, listener: EventListener): void;
}

declare global {
  interface Navigator {
    connection?: NetworkInformation;
  }
}

/**
 * SmartLink - An intelligent link component with advanced prefetching strategies
 * 
 * This component provides sophisticated prefetching capabilities including:
 * - Network-aware prefetching that adapts to connection quality
 * - Priority-based prefetching (high/medium/low) for different link importance
 * - Viewport-based prefetching with customizable intersection thresholds
 * - Hover-based prefetching with configurable delays
 * - Automatic retry logic with exponential backoff
 * - Visual status indicators for prefetch states
 * - Comprehensive cleanup and memory management
 * - Full TypeScript support with detailed type definitions
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <SmartLink href="/page">My Link</SmartLink>
 * 
 * // Advanced configuration
 * <SmartLink 
 *   href="/important-page"
 *   priority="high"
 *   showStatus={true}
 *   maxRetries={3}
 *   onPrefetchSuccess={() => console.log('Prefetched!')}
 * >
 *   Important Link
 * </SmartLink>
 * ```
 */
const SmartLink = React.memo<SmartLinkProps>(({
  href,
  prefetch = true,
  rootMargin = '200px',
  viewportDelay = 0,
  hoverDelay = 0,
  threshold = 0.1,
  enableViewport = true,
  enableHover = true,
  priority = 'medium',
  maxRetries = 2,
  retryDelay = 1000,
  onPrefetchStart,
  onPrefetchSuccess,
  onPrefetchError,
  onPrefetchRetry,
  showStatus = false,
  children,
  className,
  ...linkProps
}) => {
  const router = useRouter();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const viewportTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const [prefetchState, setPrefetchState] = useState<PrefetchState>('idle');
  const [retryCount, setRetryCount] = useState(0);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    effectiveType: '4g',
    saveData: false
  });

  // Normalize URL for consistent handling
  const url = useMemo(() => typeof href === 'object' ? href.pathname || '/' : href.toString(), [href]);

  // Determine if prefetching should be allowed based on network conditions and priority
  const shouldPrefetch = useMemo(() => {
    if (!prefetch || !url.startsWith('/') || prefetchState === 'success') return false;

    // Respect data saver mode and very slow connections
    if (networkInfo.saveData || networkInfo.effectiveType === 'slow-2g') return false;

    // Priority-based network adaptation
    if (networkInfo.effectiveType === '2g') {
      return priority === 'high';
    }
    if (networkInfo.effectiveType === '3g') {
      return priority === 'high' || priority === 'medium';
    }

    return true;
  }, [prefetch, url, prefetchState, networkInfo, priority]);

  // Monitor network conditions using Network Information API
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator && navigator.connection) {
      const connection = navigator.connection;

      const updateNetworkInfo = () => {
        if (connection) {
          setNetworkInfo({
            effectiveType: connection.effectiveType,
            saveData: connection.saveData
          });
        }
      };

      updateNetworkInfo();
      connection.addEventListener('change', updateNetworkInfo);

      return () => {
        connection.removeEventListener('change', updateNetworkInfo);
      };
    }
  }, []);

  // Core prefetch logic with comprehensive error handling and retry support
  const prefetchUrl = useCallback(async () => {
    if (!shouldPrefetch || prefetchState === 'loading') return;

    // Cancel any existing prefetch operation
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // Create new AbortController for this prefetch operation
    controllerRef.current = new AbortController();

    try {
      setPrefetchState('loading');
      onPrefetchStart?.();

      await router.prefetch(url);

      setPrefetchState('success');
      setRetryCount(0);
      onPrefetchSuccess?.();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // Expected abort, not an actual error
        return;
      } else if (retryCount < maxRetries) {
        setPrefetchState('retrying');
        setRetryCount(prev => prev + 1);
        onPrefetchRetry?.(retryCount + 1);

        // Exponential backoff retry strategy
        retryTimerRef.current = setTimeout(() => {
          prefetchUrl();
        }, retryDelay * Math.pow(2, retryCount));
      } else {
        setPrefetchState('error');
        onPrefetchError?.(error);
      }
    } finally {
      controllerRef.current = null;
    }
  }, [url, router, prefetchState, shouldPrefetch, retryCount, maxRetries, retryDelay, onPrefetchStart, onPrefetchSuccess, onPrefetchError, onPrefetchRetry]);

  // Viewport-based prefetching using IntersectionObserver
  useEffect(() => {
    if (!shouldPrefetch || !enableViewport || !linkRef.current) return;

    const observerOptions = {
      rootMargin,
      threshold
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        // Clear any existing viewport timer
        if (viewportTimerRef.current) {
          clearTimeout(viewportTimerRef.current);
        }

        if (viewportDelay > 0) {
          viewportTimerRef.current = setTimeout(() => {
            prefetchUrl();
            viewportTimerRef.current = null;
          }, viewportDelay);
        } else {
          prefetchUrl();
        }
      } else if (viewportTimerRef.current) {
        // Cancel prefetch if element leaves viewport before delay completes
        clearTimeout(viewportTimerRef.current);
        viewportTimerRef.current = null;
      }
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    observer.observe(linkRef.current);

    return () => {
      observer.disconnect();
      if (viewportTimerRef.current) {
        clearTimeout(viewportTimerRef.current);
        viewportTimerRef.current = null;
      }
    };
  }, [shouldPrefetch, enableViewport, rootMargin, threshold, viewportDelay, prefetchUrl]);

  // Hover-based prefetching with configurable delay
  const handleHover = useCallback(() => {
    if (!shouldPrefetch || !enableHover) return;

    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }

    if (hoverDelay > 0) {
      hoverTimerRef.current = setTimeout(() => {
        prefetchUrl();
        hoverTimerRef.current = null;
      }, hoverDelay);
    } else {
      prefetchUrl();
    }
  }, [shouldPrefetch, enableHover, hoverDelay, prefetchUrl]);

  // Cancel hover prefetch if interaction ends before delay completes
  const handleHoverEnd = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  // Comprehensive cleanup on component unmount
  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      if (viewportTimerRef.current) {
        clearTimeout(viewportTimerRef.current);
      }

      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }

      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
    };
  }, []);

  // Visual status indicator styles
  const statusStyles = {
    idle: 'bg-gray-200',
    loading: 'bg-blue-500 animate-pulse',
    success: 'bg-green-500',
    error: 'bg-red-500',
    retrying: 'bg-yellow-500 animate-pulse'
  };

  return (
    <div className="inline-flex items-center">
      <Link
        ref={linkRef}
        href={href}
        prefetch={false} // We handle prefetching manually for better control
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverEnd}
        onFocus={handleHover}
        onBlur={handleHoverEnd}
        className={className}
        {...linkProps}
      >
        {children}
      </Link>
      {showStatus && (
        <span
          className={`ml-2 w-2 h-2 rounded-full ${statusStyles[prefetchState]}`}
          title={`Prefetch status: ${prefetchState}${retryCount > 0 ? ` (Attempt ${retryCount}/${maxRetries})` : ''}`}
        />
      )}
    </div>
  );
});

SmartLink.displayName = 'SmartLink';

export default SmartLink;