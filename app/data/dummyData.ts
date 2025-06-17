export interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
}

// Sample articles for demonstration purposes
export const articles: Article[] = Array.from({ length: 50 }, (_, index) => {
    const id = String(index + 1);
    return {
        id,
        title: `Sample Article ${id}`,
        description: `This is a sample article for demonstrating SmartLink prefetching behavior. Article ${id} showcases different prefetching strategies.`,
        content: `This is the content for article ${id}. In a real application, this would contain meaningful content, but for the demo, we're focusing on the prefetching behavior rather than the content itself.`
    };
});

// Featured articles for the homepage
export const featuredArticles = articles.slice(0, 10);

// Articles categorized by priority for different demos
export const highPriorityArticles = articles.slice(0, 10);
export const mediumPriorityArticles = articles.slice(10, 30);
export const lowPriorityArticles = articles.slice(30, 50);
