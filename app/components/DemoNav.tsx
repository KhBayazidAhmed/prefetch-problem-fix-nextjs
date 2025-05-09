import SmartLink from '@/app/components/SmartLink';

export const strategies = [
  {
    title: "Home",
    href: "/",
    description: "Main article list",
    priority: "high" as const,
    showStatus: true
  },
  {
    title: "Immediate",
    href: "/immediate",
    description: "0ms viewport delay, high priority",
    priority: "high" as const,
    showStatus: true
  },
  {
    title: "Delayed",
    href: "/delayed",
    description: "1000ms viewport delay, medium priority",
    priority: "medium" as const,
    showStatus: true
  },
  {
    title: "Hover Only",
    href: "/hover",
    description: "Prefetch on hover, low priority",
    priority: "low" as const,
    enableViewport: false,
    enableHover: true,
    showStatus: true
  },
  {
    title: "Network Aware",
    href: "/network",
    description: "Network-aware prefetching demo",
    priority: "medium" as const,
    showStatus: true
  },
  {
    title: "Retry Demo",
    href: "/retry",
    description: "Retry logic demonstration",
    priority: "high" as const,
    maxRetries: 3,
    retryDelay: 2000,
    showStatus: true
  }
];

export default function DemoNav() {
  return (
    <nav className="mb-8 p-4 bg-gray-50 rounded-lg text-gray-800">
      <h2 className="text-lg font-semibold mb-4">Navigation</h2>
      <div className="flex flex-wrap gap-4">
        {strategies.map((demo) => (
          <SmartLink
            key={demo.href}
            href={demo.href}
            className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
            priority={demo.priority}
            enableViewport={demo.enableViewport}
            enableHover={demo.enableHover}
            maxRetries={demo.maxRetries}
            retryDelay={demo.retryDelay}
            showStatus={demo.showStatus}
          >
            <div className="font-medium">{demo.title}</div>
            <div className="text-sm text-gray-500">{demo.description}</div>
          </SmartLink>
        ))}
      </div>
    </nav>
  );
} 