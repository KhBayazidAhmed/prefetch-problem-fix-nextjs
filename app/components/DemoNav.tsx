import SmartLink from '@/app/components/SmartLink';

export const strategies = [
  {
    title: "Home",
    href: "/",
    description: "Return to the main demo overview",
    priority: "high" as const,
    showStatus: true
  },
  {
    title: "Immediate Prefetch",
    href: "/immediate",
    description: "Links prefetch instantly when they enter the viewport",
    priority: "high" as const,
    showStatus: true
  },
  {
    title: "Delayed Prefetch",
    href: "/delayed",
    description: "Links prefetch after a configurable delay",
    priority: "medium" as const,
    showStatus: true
  },
  {
    title: "Hover Prefetch",
    href: "/hover",
    description: "Links prefetch only when hovered or focused",
    priority: "low" as const,
    enableViewport: false,
    enableHover: true,
    showStatus: true
  },
  {
    title: "Network Aware",
    href: "/network",
    description: "Smart prefetching based on connection quality",
    priority: "medium" as const,
    showStatus: true
  },
  {
    title: "Retry Logic",
    href: "/retry",
    description: "Demonstrates automatic retry with exponential backoff",
    priority: "high" as const,
    maxRetries: 3,
    retryDelay: 2000,
    showStatus: true
  }
];

export default function DemoNav() {
  return (
    <nav className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 text-gray-800">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Navigation & Demo Examples</h2>
      <p className="text-sm text-gray-600 mb-6">
        Explore different prefetching strategies. Watch the status indicators to see how each behaves.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {strategies.map((demo) => (
          <SmartLink
            key={demo.href}
            href={demo.href}
            className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
            priority={demo.priority}
            enableViewport={demo.enableViewport}
            enableHover={demo.enableHover}
            maxRetries={demo.maxRetries}
            retryDelay={demo.retryDelay}
            showStatus={demo.showStatus}
          >
            <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{demo.title}</div>
            <div className="text-sm text-gray-500 mt-1">{demo.description}</div>
          </SmartLink>
        ))}
      </div>
    </nav>
  );
} 