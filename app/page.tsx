import Link from 'next/link';
import { strategies } from './components/DemoNav';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          SmartLink Demo
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Experience intelligent link prefetching with network-aware, priority-based strategies that adapt to user behavior and connection quality.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">Network Aware</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Auto Retry</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">Priority Based</span>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">TypeScript</span>
        </div>
      </div>

      <div className="grid gap-6">
        {strategies.slice(1).map((strategy) => (
          <Link
            key={strategy.href}
            href={strategy.href}
            className="p-6 border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-300 transition-all duration-300 group bg-white"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-3 text-gray-900 group-hover:text-blue-700 transition-colors">
                  {strategy.title}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{strategy.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                    Priority: {strategy.priority}
                  </span>
                  {strategy.maxRetries && (
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded">
                      Retry: {strategy.maxRetries}x
                    </span>
                  )}
                  {strategy.enableViewport === false && (
                    <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded">
                      Hover Only
                    </span>
                  )}
                </div>
              </div>
              <div className="ml-4 text-blue-500 group-hover:text-blue-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-3 text-gray-900">How It Works</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">🌐 Network Awareness</h4>
            <p>Automatically detects your connection speed and data saver preferences to optimize prefetching behavior.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">⚡ Priority System</h4>
            <p>High priority links prefetch even on slow connections, while low priority ones wait for faster speeds.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">🔄 Smart Retry</h4>
            <p>Failed prefetch requests are automatically retried with exponential backoff for better reliability.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">👁️ Visual Feedback</h4>
            <p>Status indicators show prefetch states: gray (idle), blue (loading), green (success), red (error).</p>
          </div>
        </div>
      </div>
    </div>
  );
} 