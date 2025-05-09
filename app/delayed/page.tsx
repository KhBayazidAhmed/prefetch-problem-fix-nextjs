
import SmartLink from '@/app/components/SmartLink';
import NetworkStatus from '@/app/components/NetworkStatus';
import { articles } from '@/app/data/dummyData';

export default function DelayedPrefetchDemo() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-4 text-black">Delayed Prefetch</h1>
      <p className="mb-4 text-gray-700 text-sm">
        Links wait 1 second after entering viewport before prefetching. Prefetching behavior adapts to network conditions.
      </p>
      
      <NetworkStatus className="mb-6" />

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">High Priority Links</h2>
          <div className="space-y-3">
            {articles.slice(0, 2).map((article, i) => (
              <div key={i} className="p-4 bg-white border-2 border-gray-100 rounded-lg shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200">
                <SmartLink 
                  href={`/article/${article.id}`}
                  viewportDelay={1000}
                  enableViewport={true}
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
          <div className="space-y-3">
            {articles.slice(2, 4).map((article, i) => (
              <div key={i} className="p-4 bg-white border-2 border-gray-100 rounded-lg shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200">
                <SmartLink 
                  href={`/article/${article.id}`}
                  viewportDelay={1000}
                  enableViewport={true}
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
          <div className="space-y-3">
            {articles.slice(4).map((article, i) => (
              <div key={i} className="p-4 bg-white border-2 border-gray-100 rounded-lg shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200">
                <SmartLink 
                  href={`/article/${article.id}`}
                  viewportDelay={1000}
                  enableViewport={true}
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