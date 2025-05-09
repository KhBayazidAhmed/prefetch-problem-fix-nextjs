'use client';
import { useState, useEffect } from 'react';

// Add NetworkInformation interface that matches the browser's implementation
interface NetworkInformation extends EventTarget {
  readonly effectiveType: string;
  readonly saveData: boolean;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

interface NetworkStatusProps {
  className?: string;
}

export default function NetworkStatus({ className = '' }: NetworkStatusProps) {
  const [networkStatus, setNetworkStatus] = useState<string>('Checking...');

  // Update network status when it changes
  const handleNetworkChange = () => {
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.connection) {
      const connection: NetworkInformation | undefined = navigator.connection;
      if (connection) {
        setNetworkStatus(`${connection.effectiveType}${connection.saveData ? ' (Data Saver)' : ''}`);
      } else {
        setNetworkStatus('Not available');
      }
    } else {
      setNetworkStatus('Not available');
    }
  };

  // Initial network status check and event listener setup
  useEffect(() => {
    handleNetworkChange();
    
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.connection) {
      navigator.connection.addEventListener('change', handleNetworkChange);
      return () => {
        navigator.connection?.removeEventListener('change', handleNetworkChange);
      };
    }
  }, []);

  return (
    <div className={`p-4 bg-gray-50 rounded-lg ${className}`}>
      <p className="text-sm text-gray-600">
        Current Network: <span className="font-medium">{networkStatus}</span>
      </p>
      <p className="text-xs text-gray-500 mt-1">
        • High priority links will prefetch on all networks except slow-2g
        <br />
        • Medium priority links will prefetch on 3g and better
        <br />
        • Low priority links will only prefetch on 4g
      </p>
    </div>
  );
}