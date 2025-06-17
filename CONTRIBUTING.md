# Contributing to SmartLink Prefetch Demo

Thank you for considering contributing to the SmartLink Prefetch Demo! This project showcases intelligent link prefetching strategies for Next.js applications.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/smart-link-prefetch-demo.git
   cd smart-link-prefetch-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code formatting and conventions
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Ensure all props and interfaces are properly typed

### Component Structure

- Place reusable components in `app/components/`
- Each component should have a single responsibility
- Use React.memo for performance optimization where appropriate
- Implement proper cleanup for timers and event listeners

### Prefetching Features

When working on prefetching functionality:

- Always implement proper AbortController cleanup
- Use exponential backoff for retry logic
- Respect network conditions and data saver mode
- Provide comprehensive callback support
- Add visual status indicators where helpful

## 🧪 Testing

### Manual Testing

1. **Test Different Network Conditions**
   - Use browser dev tools to simulate 2G, 3G, 4G connections
   - Enable data saver mode to test data-conscious behavior
   - Verify prefetching adapts appropriately

2. **Test Different Scenarios**
   - Viewport-based prefetching
   - Hover-based prefetching
   - Priority-based behavior
   - Retry logic on failures
   - Status indicator accuracy

3. **Cross-Browser Testing**
   - Test in Chrome, Firefox, Safari, Edge
   - Verify Network Information API fallbacks
   - Check mobile responsiveness

## 📝 Making Changes

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, well-documented code
   - Test your changes thoroughly
   - Update documentation if needed

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add descriptive commit message"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Include screenshots if UI changes are involved

### Commit Message Format

We follow conventional commits:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions or updates
- `chore:` Maintenance tasks

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Browser and version**
- **Operating system**
- **Node.js version**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots or recordings if applicable**
- **Network conditions when the issue occurred**

### Feature Requests

For feature requests, please:

- **Describe the use case**
- **Explain the expected behavior**
- **Consider performance implications**
- **Think about backward compatibility**

## 🎯 Areas for Contribution

We welcome contributions in these areas:

### New Features
- Additional prefetching strategies
- Enhanced network condition detection
- Improved accessibility features
- Performance optimizations
- Better error handling

### Documentation
- API documentation improvements
- Usage examples
- Performance guides
- Best practices documentation

### Testing
- Unit tests for components
- Integration tests for prefetching
- Performance benchmarks
- Cross-browser compatibility tests

### Bug Fixes
- Memory leaks
- Edge case handling
- TypeScript type improvements
- Accessibility issues

## 🔧 Technical Details

### Project Structure

```
smart-link-prefetch-demo/
├── app/
│   ├── components/          # Reusable React components
│   ├── [demo-pages]/        # Individual demo pages
│   ├── data/               # Sample data for demos
│   └── globals.css         # Global styles
├── public/                 # Static assets
├── docs/                   # Additional documentation
└── README.md              # Main project documentation
```

### Key Technologies

- **Next.js 15.3.2**: App Router, prefetching APIs
- **React 19**: Hooks, memo, modern patterns
- **TypeScript**: Type safety and developer experience
- **Tailwind CSS**: Utility-first styling
- **Web APIs**: IntersectionObserver, Network Information API

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Web Performance Best Practices](https://web.dev/performance)
- [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and professional in all interactions.

## 💬 Getting Help

If you need help or have questions:

1. Check the [README.md](README.md) for basic information
2. Look through existing [issues](https://github.com/yourusername/smart-link-prefetch-demo/issues)
3. Create a new issue with detailed information
4. Join discussions in existing pull requests

Thank you for contributing to SmartLink Prefetch Demo! 🚀 