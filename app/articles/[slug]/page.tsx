import { fetchFromStrapi } from "@/lib/strapi";
import { Article } from "@/lib/types";
import ReactMarkdown from "react-markdown";

interface ArticlePageParams {
  params: {
    slug: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageParams) {
  const { slug } = params;

  // Fetch the specific article by its slug
  const articles = await fetchFromStrapi<Article>("articles", {
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });

  // Since the filter returns an array, we take the first element
  const article = articles.data[0];

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="mb-8 text-gray-600">By {article.author}</p>
      
      <div className="prose lg:prose-xl">
        {/* We need to handle the content format, which is an array of blocks */}
        {article.content.map((block, index) => (
          block.children.map((child, childIndex) => (
            <ReactMarkdown key={`${index}-${childIndex}`}>{child.text}</ReactMarkdown>
          ))
        ))}
      </div>
    </main>
  );
}