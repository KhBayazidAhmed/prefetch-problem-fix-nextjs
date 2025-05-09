
import SmartLink from '@/app/components/SmartLink';
import NetworkStatus from '@/app/components/NetworkStatus';
import { articles } from '@/app/data/dummyData';

export default function NetworkAwareDemo() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-4 text-black">Network-Aware Prefetching</h1>
      <p className="mb-4 text-gray-700 text-sm">
        Links adjust their prefetching behavior based on network conditions and priority
      </p>

      <NetworkStatus className="mb-6" />

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">High Priority Links</h2>
          <p className="text-sm text-gray-600 mb-4">
            These links will prefetch even on slower connections (2G+)
          </p>
          <div className="space-y-3">
            {articles.slice(0, 2).map((article) => (
              <div key={article.id} className="p-4 bg-white border-2 border-blue-100 rounded-lg shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200">
                <SmartLink 
                  href={`/article/${article.id}`}
                  priority="high"
                  showStatus={true}
                  className="text-black hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  {article.title} →
                </SmartLink>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Medium Priority Links</h2>
          <p className="text-sm text-gray-600 mb-4">
            These links will prefetch on 3G and better connections
          </p>
          <div className="space-y-3">
            {articles.slice(2, 4).map((article) => (
              <div key={article.id} className="p-4 bg-white border-2 border-green-100 rounded-lg shadow-sm hover:shadow-md hover:border-green-500 transition-all duration-200">
                <SmartLink 
                  href={`/article/${article.id}`}
                  priority="medium"
                  showStatus={true}
                  className="text-black hover:text-green-700 font-medium transition-colors duration-200"
                >
                  {article.title} →
                </SmartLink>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Low Priority Links</h2>
          <p className="text-sm text-gray-600 mb-4">
            These links will only prefetch on 4G connections
          </p>
          <div className="space-y-3">
            {articles.slice(4, 6).map((article) => (
              <div key={article.id} className="p-4 bg-white border-2 border-gray-100 rounded-lg shadow-sm hover:shadow-md hover:border-gray-500 transition-all duration-200">
                <SmartLink 
                  href={`/article/${article.id}`}
                  priority="low"
                  showStatus={true}
                  className="text-black hover:text-gray-700 font-medium transition-colors duration-200"
                >
                  {article.title} →
                </SmartLink>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 