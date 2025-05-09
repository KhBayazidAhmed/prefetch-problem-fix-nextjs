import Link from 'next/link';
import { strategies } from './components/DemoNav';


export default function DemoPage() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8">SmartLink Demo</h1>
      
      <div className="grid gap-6">
        {strategies.map((strategy) => (
          <Link 
            key={strategy.href}
            href={strategy.href}
            className="p-6 border rounded-lg hover:bg-gray-50 hover:text-gray-800 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">{strategy.title}</h2>
            <p className="text-gray-600 mb-2">{strategy.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
} 