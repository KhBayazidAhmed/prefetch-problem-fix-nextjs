# 🚀 Smart Link Prefetch Demo

A comprehensive demonstration of intelligent link prefetching strategies in Next.js featuring network-aware, priority-based, and highly configurable prefetching capabilities.

## 🌟 Features

- **🌐 Network-Aware Prefetching**: Automatically adjusts prefetching based on connection type and data saver mode
- **⚡ Priority-Based Prefetching**: High/medium/low priority levels for different types of links
- **🎯 Intelligent Prefetching**: Combines viewport-based and hover-based prefetching strategies
- **🔄 Automatic Retry Logic**: Configurable retry attempts with exponential backoff
- **📊 Visual Status Indicator**: Optional prefetch status indicator with color coding
- **🛑 AbortController Support**: Properly cancels ongoing prefetch requests
- **💾 Memory Efficient**: Cleans up resources and timers properly
- **📝 TypeScript Support**: Fully typed with comprehensive TypeScript definitions
- **📱 Responsive Design**: Beautiful, modern UI with excellent UX practices

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/KhBayazidAhmed/smart-link-prefetch-demo.git
cd smart-link-prefetch-demo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the demo.

## 🎮 Demo Features

The demo includes several interactive examples:

- **Immediate Prefetch**: Links that prefetch as soon as they enter the viewport
- **Delayed Prefetch**: Links with configurable delays before prefetching
- **Hover-Only Prefetch**: Links that only prefetch on hover/focus
- **Network-Aware Demo**: Demonstrates how prefetching adapts to network conditions
- **Retry Logic Demo**: Shows automatic retry behavior with visual feedback

## 🔧 Usage

### Basic Usage

```tsx
import SmartLink from './components/SmartLink';

// Simple usage
<SmartLink href="/some-page">Click me</SmartLink>

// High priority link with status indicator
<SmartLink 
  href="/critical-page"
  priority="high"
  showStatus={true}
>
  Critical Page
</SmartLink>
```

### Advanced Configuration

```tsx
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

// Hover-only prefetching with custom delay
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

## 📚 API Reference

### SmartLink Props

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

## 🧠 Prefetching Strategies

### 1. Network-Aware Prefetching

The component automatically detects and adapts to network conditions:

- **Fast connections (4G)**: All priority levels prefetch normally
- **Medium connections (3G)**: High and medium priority links prefetch
- **Slow connections (2G)**: Only high priority links prefetch  
- **Data Saver Mode**: All prefetching is disabled

### 2. Viewport-Based Prefetching

- Triggers when links enter the viewport using IntersectionObserver
- Configurable viewport margin and threshold
- Optional delay before prefetching begins
- Automatically cancels if link leaves viewport before delay completes

### 3. Hover-Based Prefetching

- Triggers on hover (mouseenter) or focus events
- Configurable delay before prefetching starts
- Automatically cancels if hover ends before delay completes
- Works alongside viewport prefetching

### 4. Retry Logic

- Configurable maximum retry attempts
- Exponential backoff between retries
- Visual feedback during retry attempts
- Detailed retry callbacks for monitoring

## 🎨 Status Indicator

The visual status indicator shows prefetch states:

- **Gray**: Idle state
- **Blue (pulsing)**: Loading/prefetching
- **Green**: Successfully prefetched
- **Red**: Error occurred
- **Yellow (pulsing)**: Retrying after error

## 🏆 Best Practices

### Priority Levels

- **High Priority**: Critical navigation, above-the-fold links
- **Medium Priority**: Important but not critical links
- **Low Priority**: Optional or below-the-fold content

### Network Optimization

- Use higher priorities for essential user flows
- Consider user's connection when setting delays
- Monitor retry attempts for network issues
- Respect data saver preferences

### Performance Tips

- Set appropriate viewport delays based on content importance
- Use status indicators for debugging and user feedback
- Configure retry logic based on expected network conditions
- Clean up resources properly to prevent memory leaks

## 🛠️ Technical Implementation

### Core Technologies

- **Next.js 15.3.2**: App Router with advanced prefetching
- **React 19**: Latest React features and hooks
- **TypeScript**: Full type safety and development experience
- **Tailwind CSS**: Modern, responsive styling
- **IntersectionObserver API**: Efficient viewport detection
- **Network Information API**: Network condition awareness

### Key Features

- Automatic resource cleanup and memory management
- AbortController for request cancellation
- Exponential backoff retry strategy
- Comprehensive error handling
- Performance monitoring and callbacks

## 🏗️ Project Structure

```
smart-link-prefetch-demo/
├── app/
│   ├── components/          # Reusable components
│   │   ├── SmartLink.tsx   # Main smart link component
│   │   ├── NetworkStatus.tsx # Network status display
│   │   ├── DemoNav.tsx     # Demo navigation
│   │   └── BackButton.tsx  # Navigation helper
│   ├── immediate/          # Immediate prefetch demo
│   ├── delayed/            # Delayed prefetch demo
│   ├── hover/              # Hover-only prefetch demo
│   ├── network/            # Network-aware demo
│   ├── retry/              # Retry logic demo
│   ├── article/[id]/       # Dynamic article pages
│   ├── data/               # Demo data
│   └── globals.css         # Global styles
├── public/                 # Static assets
└── README.md              # This file
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Uses modern web APIs for optimal performance
- Inspired by modern web performance best practices

## 📞 Support

If you have any questions or need help, please:

1. Check the [documentation](#-api-reference) above
2. Look through existing [issues](https://github.com/KhBayazidAhmed/smart-link-prefetch-demo/issues)
3. Create a new issue if needed

---

⭐ If this project helped you, please consider giving it a star on GitHub!
