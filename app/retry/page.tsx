"use client";
import SmartLink from '@/app/components/SmartLink';
import { articles } from '@/app/data/dummyData';
import { useCallback } from 'react';

export default function RetryDemo() {
  // Move the callback to a useCallback hook
  const handleRetry = useCallback((attempt: number, title: string) => {
    console.log(`Retry attempt ${attempt} for ${title}`);
  }, []);

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-4 text-black">Retry Logic Demonstration</h1>
      <p className="mb-8 text-gray-700 text-sm">
        Links with automatic retry logic and exponential backoff
      </p>

      <div className="space-y-6">
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">High Priority with Retries</h2>
          <p className="text-sm text-gray-600 mb-4">
            These links will retry up to 3 times with exponential backoff
          </p>
          <div className="space-y-3">
            {articles.slice(0, 2).map((article) => (
              <div key={article.id} className="p-4 bg-white border-2 border-yellow-100 rounded-lg shadow-sm hover:shadow-md hover:border-yellow-500 transition-all duration-200">
                <SmartLink 
                  href={`/article/${article.id}`}
                  priority="high"
                  maxRetries={3}
                  retryDelay={2000}
                  showStatus={true}
                  onPrefetchRetry={(attempt) => handleRetry(attempt, article.title)}
                  className="text-black hover:text-yellow-700 font-medium transition-colors duration-200"
                >
                  {article.title} →
                </SmartLink>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-orange-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Medium Priority with Retries</h2>
          <p className="text-sm text-gray-600 mb-4">
            These links will retry up to 2 times with shorter delays
          </p>
          <div className="space-y-3">
            {articles.slice(2, 4).map((article) => (
              <div key={article.id} className="p-4 bg-white border-2 border-orange-100 rounded-lg shadow-sm hover:shadow-md hover:border-orange-500 transition-all duration-200">
                <SmartLink 
                  href={`/article/${article.id}`}
                  priority="medium"
                  maxRetries={2}
                  retryDelay={1000}
                  showStatus={true}
                  onPrefetchRetry={(attempt) => handleRetry(attempt, article.title)}
                  className="text-black hover:text-orange-700 font-medium transition-colors duration-200"
                >
                  {article.title} →
                </SmartLink>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-red-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Low Priority with Single Retry</h2>
          <p className="text-sm text-gray-600 mb-4">
            These links will retry only once with minimal delay
          </p>
          <div className="space-y-3">
            {articles.slice(4, 6).map((article) => (
              <div key={article.id} className="p-4 bg-white border-2 border-red-100 rounded-lg shadow-sm hover:shadow-md hover:border-red-500 transition-all duration-200">
                <SmartLink 
                  href={`/article/${article.id}`}
                  priority="low"
                  maxRetries={1}
                  retryDelay={500}
                  showStatus={true}
                  onPrefetchRetry={(attempt) => handleRetry(attempt, article.title)}
                  className="text-black hover:text-red-700 font-medium transition-colors duration-200"
                >
                  {article.title} →
                </SmartLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 