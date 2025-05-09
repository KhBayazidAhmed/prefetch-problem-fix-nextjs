import { articles } from '@/app/data/dummyData';
import SmartLink from '@/app/components/SmartLink';
import BackButton from '@/app/components/BackButton';

export async function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id,
  }))
}

type Params = Promise<{ id: string }>;

export default async function ArticlePage({ params }: { params: Params }) {
  const { id } = await params;
  const article = articles.find(a => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-8">Article not found</h1>
        <SmartLink href="/" className="text-blue-600 hover:text-blue-800">
          ← Back to home
        </SmartLink>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <BackButton />
      <article className="mt-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-gray-600 mb-8">{article.description}</p>
        <div className="prose">
          <p>{article.content}</p>
        </div>
      </article>
    </main>
  );
} 