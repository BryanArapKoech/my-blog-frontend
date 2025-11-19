import Link from "next/link";
import { fetchFromStrapi } from "@/lib/strapi";
import { Article } from "@/lib/types";

export default async function Home() {
  const articles = await fetchFromStrapi<Article>("articles");

  console.log("Response from Strapi:", JSON.stringify(articles, null, 2));
  
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">My Blog</h1>

      <ul className="space-y-4">
        {articles.data.map((article) => (
          <li key={article.id} className="p-4 border rounded shadow">
            <Link href={`/articles/${article.slug}`}>
              <h2 className="text-2xl font-semibold hover:underline">{article.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}