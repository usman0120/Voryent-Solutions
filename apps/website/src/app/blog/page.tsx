import { getAllPosts } from "../../lib/blog"
import { getBlogPosts } from "../../lib/firebase/services"
import { BlogList } from "../../components/blog/blog-list"

export default async function BlogPage() {
  const dbPostsRaw = await getBlogPosts().catch(() => []);
  const dbPosts = dbPostsRaw.map((p: any) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || "",
    category: p.category || "General",
    readingTime: p.readingTime || "5 min read",
    publishDate: (p.publishedAt ? new Date(p.publishedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]) as string,
    author: p.author?.name || "Voryent Team",
    imageSrc: p.coverImage || "/Assets/Illustrations/Blog.png",
    content: p.content || ""
  }));

  const staticPosts = getAllPosts()
  
  // Combine, giving DB posts precedence or just merging (for now, concat)
  const posts = [...dbPosts, ...staticPosts].filter((v, i, a) => a.findIndex(t => (t.slug === v.slug)) === i); // deduplicate by slug

  return <BlogList posts={posts} />
}
