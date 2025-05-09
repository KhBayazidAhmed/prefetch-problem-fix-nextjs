This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Smart Prefetching Link Component

A Next.js link component that implements intelligent prefetching strategies with network awareness and priority-based prefetching.

## Features

- **Network-Aware Prefetching**: Automatically adjusts prefetching based on connection type and data saver mode
- **Priority-Based Prefetching**: High/medium/low priority levels for different types of links
- **Intelligent Prefetching**: Combines viewport-based and hover-based prefetching
- **Automatic Retry Logic**: Configurable retry attempts with exponential backoff
- **Visual Status Indicator**: Optional prefetch status indicator with color coding
- **AbortController Support**: Properly cancels ongoing prefetch requests
- **Memory Efficient**: Cleans up resources and timers properly
- **TypeScript Support**: Fully typed with TypeScript

## Usage

```tsx
import SmartLink from './components/SmartLink';

// Basic usage
<SmartLink href="/some-page">Click me</SmartLink>

// High priority link with status indicator
<SmartLink 
  href="/critical-page"
  priority="high"
  showStatus={true}
>
  Critical Page
</SmartLink>

// Network-aware link with retry support
<SmartLink 
  href="/important-page"
  priority="medium"
  maxRetries={3}
  retryDelay={2000}
  onPrefetchRetry={(attempt) => console.log(`Retry attempt ${attempt}`)}
>
  Important Page
</SmartLink>

// Hover-only prefetching
<SmartLink 
  href="/optional-page"
  enableViewport={false}
  enableHover={true}
  hoverDelay={500}
  priority="low"
>
  Optional Page
</SmartLink>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | Required | The URL to navigate to |
| `prefetch` | `boolean` | `true` | Whether to enable prefetching |
| `priority` | `'high' \| 'medium' \| 'low'` | `'medium'` | Prefetch priority level |
| `rootMargin` | `string` | `'200px'` | Margin around the viewport for intersection detection |
| `viewportDelay` | `number` | `0` | Delay in milliseconds before prefetching on viewport entry |
| `enableViewport` | `boolean` | `true` | Whether to enable viewport-based prefetching |
| `enableHover` | `boolean` | `true` | Whether to enable hover-based prefetching |
| `hoverDelay` | `number` | `0` | Delay in milliseconds before prefetching on hover |
| `maxRetries` | `number` | `2` | Maximum number of retry attempts on failure |
| `retryDelay` | `number` | `1000` | Base delay in milliseconds between retry attempts |
| `showStatus` | `boolean` | `false` | Whether to show the prefetch status indicator |
| `onPrefetchStart` | `() => void` | `undefined` | Callback when prefetch starts |
| `onPrefetchSuccess` | `() => void` | `undefined` | Callback when prefetch succeeds |
| `onPrefetchError` | `(error: unknown) => void` | `undefined` | Callback when prefetch fails |
| `onPrefetchRetry` | `(attempt: number) => void` | `undefined` | Callback when retry attempt starts |
| `className` | `string` | `undefined` | CSS classes to apply to the link |
| `children` | `ReactNode` | Required | Link content |

## Prefetching Behavior

The component implements multiple prefetching strategies:

1. **Network-Aware Prefetching**:
   - Automatically detects connection type (2G, 3G, 4G)
   - Respects data saver mode
   - Adjusts prefetching based on priority and network conditions
   - High priority links prefetch even on slower connections
   - Low priority links only prefetch on fast connections

2. **Viewport-based Prefetching**:
   - Triggers when the link enters the viewport
   - Respects the `viewportDelay` setting
   - Uses IntersectionObserver for efficient detection
   - Configurable viewport margin via `rootMargin`

3. **Hover-based Prefetching**:
   - Triggers on hover or focus
   - Configurable delay via `hoverDelay`
   - Works alongside viewport prefetching

4. **Automatic Retry Logic**:
   - Configurable retry attempts
   - Exponential backoff between retries
   - Retry status tracking and callbacks

## Status Indicator

The component can show a visual status indicator with the following states:

- Gray: Idle
- Blue (pulsing): Loading
- Green: Success
- Red: Error
- Yellow (pulsing): Retrying

## Best Practices

1. **Priority Levels**:
   - Use `high` for critical navigation and above-the-fold links
   - Use `medium` for important but not critical links
   - Use `low` for optional or below-the-fold content

2. **Network Conditions**:
   - High priority links will prefetch even on 2G
   - Medium priority links prefetch on 3G and better
   - Low priority links only prefetch on 4G
   - All prefetching is disabled when data saver is enabled

3. **Retry Configuration**:
   - Use higher `maxRetries` for critical links
   - Adjust `retryDelay` based on expected network conditions
   - Monitor retry attempts through `onPrefetchRetry` callback

4. **Viewport Delay**:
   - Use `0` for critical above-the-fold links
   - Use higher values for less important links
   - Consider user's connection speed when setting delays

5. **Status Indicator**:
   - Enable for debugging or user feedback
   - Use tooltips to show detailed status information
   - Consider hiding for less important links

## Example Implementation

```tsx
// Critical navigation (immediate prefetch, high priority)
<SmartLink 
  href="/home"
  priority="high"
  viewportDelay={0}
  rootMargin="100px"
  showStatus={true}
>
  Home
</SmartLink>

// Secondary navigation (delayed prefetch, medium priority)
<SmartLink 
  href="/about"
  priority="medium"
  viewportDelay={1000}
  rootMargin="200px"
  maxRetries={2}
>
  About
</SmartLink>

// Optional content (hover only, low priority)
<SmartLink 
  href="/contact"
  priority="low"
  enableViewport={false}
  enableHover={true}
  hoverDelay={500}
>
  Contact
</SmartLink>
```

## Performance Considerations

- Network-aware prefetching prevents unnecessary requests on slow connections
- Priority-based prefetching ensures critical content loads first
- Automatic retry logic handles temporary network issues
- The component is memoized to prevent unnecessary re-renders
- Resources are properly cleaned up on unmount
- AbortController prevents unnecessary network requests
- Default settings are optimized for most use cases

## Browser Support

- Works in all modern browsers
- Network Information API support for network-aware prefetching
- Gracefully degrades in older browsers
- No polyfills required for core functionality

## NetworkStatus Component

The `NetworkStatus` component displays the current network status based on the Network Information API. It shows the effective connection type and whether the data saver mode is enabled.

### Browser Support

Please note that the Network Information API is not supported in all browsers. Ensure you are using a modern browser that implements this API.

### Usage

```tsx
import NetworkStatus from './components/NetworkStatus';

// Basic usage
<NetworkStatus className="custom-class" />
```

This component will display the current network type and indicate if the data saver mode is active. It updates automatically when the network status changes.
