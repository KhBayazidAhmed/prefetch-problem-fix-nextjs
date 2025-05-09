# How to Fix the Rerender Problem in IRDFoundation Website

## 1. Turn off Automatic Prefetch

By default, `<Link>` in production will prefetch its page bundle as soon as it enters the viewport. You can disable that globally on each link:

```typescript
import Link from 'next/link';

// anywhere in your app...
<Link href="/about" prefetch={false}>
  About
</Link>
```

## 2. Manually Prefetch on Demand

Instead of eager prefetching everything, you can trigger it only when the user is about to need it—e.g. when the link scrolls into view, or on mouse-over. This keeps your initial load light, but still gives you instant nav once the user indicates interest.

### Implementation: SmartLink Component

```typescript
// components/SmartLink.tsx
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useEffect, useCallback } from 'react';

interface SmartLinkProps extends LinkProps {
  prefetch?: boolean;
  rootMargin?: string;
  hoverDelay?: number;
  children: React.ReactNode;
}

const SmartLink: React.FC<SmartLinkProps> = ({
  href,
  prefetch = true,
  rootMargin = '200px',
  hoverDelay = 100,
  children,
  ...linkProps
}) => {
  const router = useRouter();
  const ref = useRef<HTMLAnchorElement>(null);
  const hoverTimer = useRef<number>();

  // Intersection-based prefetch
  useEffect(() => {
    if (!prefetch || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          router.prefetch(href.toString());
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [href, prefetch, rootMargin, router]);

  // Hover/focus-based prefetch
  const handleHover = useCallback(() => {
    if (!prefetch) return;
    hoverTimer.current = window.setTimeout(() => {
      router.prefetch(href.toString());
    }, hoverDelay);
  }, [href, hoverDelay, prefetch, router]);

  const cancelHover = useCallback(() => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }
  }, []);

  return (
    <Link
      ref={ref}
      href={href}
      prefetch={false}
      onMouseEnter={handleHover}
      onFocus={handleHover}
      onMouseLeave={cancelHover}
      onBlur={cancelHover}
      {...linkProps}
    >
      {children}
    </Link>
  );
};

export default React.memo(SmartLink);
```

### Features of SmartLink Component

- **Intersection Observer**: Prefetches content when the link enters the viewport
- **Hover/Focus Detection**: Prefetches on mouse hover or focus with configurable delay
- **Configurable Options**:
  - `prefetch`: Enable/disable prefetching
  - `rootMargin`: Control when intersection observer triggers
  - `hoverDelay`: Set delay before prefetch on hover
- **Memory Efficient**: Uses `React.memo` to prevent unnecessary rerenders




