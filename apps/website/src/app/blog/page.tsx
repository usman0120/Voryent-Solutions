import { getBlogPosts } from "../../lib/firebase/services";
import { BlogList } from "../../components/blog/blog-list";

function calculateReadingTime(content: string): string {
  if (!content) return "2 min read";
  const cleanText = content.replace(/<[^>]*>/g, " ").replace(/[^\w\s]/gi, "");
  const words = cleanText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export default async function BlogPage() {
  const dbPostsRaw = await getBlogPosts().catch(() => []);
  
  const posts = dbPostsRaw.map((p: any) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || "",
    category: p.category || "General",
    tags: p.tags || [],
    featured: Boolean(p.featured),
    readingTime: calculateReadingTime(p.content || ""),
    publishDate: String(
      p.publishedAt?.seconds 
        ? new Date(p.publishedAt.seconds * 1000).toISOString().split('T')[0] 
        : (p.createdAt?.seconds ? new Date(p.createdAt.seconds * 1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0])
    ),
    author: typeof p.author === 'string' ? p.author : p.author?.name || "Voryent Team",
    imageSrc: p.coverImage || "/Assets/Illustrations/Blog.png",
    content: p.content || ""
  }));

  return <BlogList posts={posts} />;
}
