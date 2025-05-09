
import SmartLink from '@/app/components/SmartLink';
import NetworkStatus from '@/app/components/NetworkStatus';
import { articles } from '@/app/data/dummyData';

export default function HoverPrefetchDemo() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-4 text-black">Hover Only Prefetch</h1>
      <p className="mb-4 text-gray-700 text-sm">
        Links will only prefetch when you hover over them, with network-aware behavior
      </p>

      <NetworkStatus className="mb-6" />

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">High Priority Links</h2>
          <p className="text-sm text-gray-600 mb-4">
            These links will prefetch on hover even on slower connections
          </p>
          <div className="space-y-3">
            {articles.slice(0, 2).map((article, i) => (
              <div key={i} className="p-4 bg-white border-2 border-gray-100 rounded-lg shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200">
                <SmartLink 
                  href={`/article/${article.id}`}
                  enableHover={true}
                  enableViewport={false}
                  priority="high"
                  showStatus={true}
                  className="text-black hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Article {article.id} →
                </SmartLink>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Medium Priority Links</h2>
          <p className="text-sm text-gray-600 mb-4">
            These links will prefetch on hover for 3G and better connections
          </p>
          <div className="space-y-3">
            {articles.slice(2, 4).map((article, i) => (
              <div key={i} className="p-4 bg-white border-2 border-gray-100 rounded-lg shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200">
                <SmartLink 
                  href={`/article/${article.id}`}
                  enableHover={true}
                  enableViewport={false}
                  priority="medium"
                  showStatus={true}
                  className="text-black hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Article {article.id} →
                </SmartLink>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Low Priority Links</h2>
          <p className="text-sm text-gray-600 mb-4">
            These links will only prefetch on hover for 4G connections
          </p>
          <div className="space-y-3">
            {articles.slice(4).map((article, i) => (
              <div key={i} className="p-4 bg-white border-2 border-gray-100 rounded-lg shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200">
                <SmartLink 
                  href={`/article/${article.id}`}
                  enableHover={true}
                  enableViewport={false}
                  priority="low"
                  showStatus={true}
                  className="text-black hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Article {article.id} →
                </SmartLink>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 