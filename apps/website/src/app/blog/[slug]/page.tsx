import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section, Button } from "@voryent/ui";
import { ChevronRight, Calendar, Clock, User, List, Tag as TagIcon, ArrowRight, Share2, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getBlogPostBySlug, getBlogPosts } from "../../../lib/firebase/services";
import { JsonLd } from "../../../components/json-ld";
import { BlogShareButtons } from "../../../components/blog/blog-share-buttons";
import { NewsletterForm } from "../../../components/blog/newsletter-form";

// Helper to extract headings from both HTML & Markdown content for Table of Contents
function extractHeadings(content: string) {
  const headings: { id: string; text: string; level: number }[] = [];
  
  if (!content) return headings;

  // Try HTML headings first <h2 ...>text</h2> or <h3>...</h3>
  const htmlRegex = /<h([2-3])(?:[^>]*)>(.*?)<\/h[2-3]>/gi;
  let match;
  while ((match = htmlRegex.exec(content)) !== null) {
    if (match && match[1] && match[2]) {
      const level = parseInt(match[1]);
      const text = match[2].replace(/<[^>]*>/g, '').trim();
      const id = text.toLowerCase().replace(/[^\w]+/g, "-");
      if (text) headings.push({ id, text, level });
    }
  }

  // Fallback to Markdown headings if no HTML headings found
  if (headings.length === 0) {
    const mdRegex = /^(#{2,3})\s+(.+)$/gm;
    while ((match = mdRegex.exec(content)) !== null) {
      if (match && match[1] && match[2]) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text.toLowerCase().replace(/[^\w]+/g, "-");
        headings.push({ id, text, level });
      }
    }
  }

  return headings;
}

function calculateReadingTime(content: string): string {
  if (!content) return "2 min read";
  const cleanText = content.replace(/<[^>]*>/g, " ").replace(/[^\w\s]/gi, "");
  const words = cleanText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  let dbPostRaw: any = null;
  try {
    dbPostRaw = await getBlogPostBySlug(slug);
  } catch (err) {}

  if (!dbPostRaw) {
    notFound();
  }

  const post = {
    slug: dbPostRaw.slug,
    title: dbPostRaw.title,
    excerpt: dbPostRaw.excerpt || "",
    category: dbPostRaw.category || "General",
    tags: dbPostRaw.tags || [],
    readingTime: calculateReadingTime(dbPostRaw.content || ""),
    publishDate: dbPostRaw.publishedAt?.seconds 
      ? new Date(dbPostRaw.publishedAt.seconds * 1000).toISOString().split('T')[0] 
      : (dbPostRaw.createdAt?.seconds ? new Date(dbPostRaw.createdAt.seconds * 1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
    author: typeof dbPostRaw.author === 'string' ? dbPostRaw.author : dbPostRaw.author?.name || "Voryent Team",
    imageSrc: dbPostRaw.coverImage || "/Assets/Illustrations/Blog.png",
    content: dbPostRaw.content || ""
  };

  const dbAllRaw = await getBlogPosts().catch(() => []);
  const allPosts = dbAllRaw.map((p: any) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || "",
    category: p.category || "General",
    tags: p.tags || [],
    readingTime: calculateReadingTime(p.content || ""),
    publishDate: p.publishedAt?.seconds 
      ? new Date(p.publishedAt.seconds * 1000).toISOString().split('T')[0] 
      : (p.createdAt?.seconds ? new Date(p.createdAt.seconds * 1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
    author: typeof p.author === 'string' ? p.author : p.author?.name || "Voryent Team",
    imageSrc: p.coverImage || "/Assets/Illustrations/Blog.png",
    content: p.content || ""
  }));

  // Smart Related Posts Algorithm: Score by matching tags and category
  const postTags = post.tags || [];
  const scoredPosts = allPosts
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      if (p.category && p.category.toLowerCase() === post.category.toLowerCase()) score += 2;
      if (p.tags && Array.isArray(p.tags)) {
        const overlap = p.tags.filter((t: string) => postTags.includes(t));
        score += overlap.length * 3;
      }
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score);

  const relatedPosts = scoredPosts.slice(0, 3).map((item) => item.post);

  const headings = extractHeadings(post.content);
  const isHtmlContent = /<[a-z][\s\S]*>/i.test(post.content);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [
      post.imageSrc.startsWith("http") || post.imageSrc.startsWith("data:") ? post.imageSrc : "https://voryentsolutions.com" + post.imageSrc
    ],
    "datePublished": new Date().toISOString(),
    "author": [{
      "@type": "Person",
      "name": post.author || "Voryent Solutions",
    }]
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      
      {/* ─── HERO ─── */}
      <Section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border/60 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 lg:pr-8">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8">
                <Link href="/blog" className="hover:text-primary transition-colors">Insights</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-primary">{post.category}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-8">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-8 pb-8 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.publishDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime}</span>
                </div>
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>By {post.author}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-foreground text-background"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full border border-border/60 bg-muted overflow-hidden">
                <img
                  src={post.imageSrc}
                  alt={post.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

          </div>
        </Container>
      </Section>

      {/* ─── ARTICLE CONTENT ─── */}
      <Section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 max-w-7xl mx-auto">
            {/* Left Col - Table of Contents */}
            {headings.length > 0 && (
              <div className="hidden lg:block lg:col-span-3">
                <div className="sticky top-24 border border-border/60 p-6 bg-muted/5">
                  <h4 className="text-xs font-bold text-foreground mb-6 uppercase tracking-widest flex items-center gap-2">
                    <List className="h-4 w-4" />
                    Contents
                  </h4>
                  <ul className="space-y-4">
                    {headings.map((heading, i) => (
                      <li key={i} className={`${heading.level === 3 ? "pl-4" : ""}`}>
                        <a
                          href={`#${heading.id}`}
                          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors line-clamp-2"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Main Content Area */}
            <div className={headings.length > 0 ? "lg:col-span-9" : "lg:col-span-12 max-w-4xl mx-auto"}>
              {isHtmlContent ? (
                <div 
                  className="
                    prose prose-lg dark:prose-invert max-w-none text-foreground leading-relaxed
                    [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mt-10 [&>h1]:mb-6 [&>h1]:tracking-tight
                    [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:text-foreground [&>h2]:tracking-tight
                    [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:text-foreground [&>h3]:tracking-tight
                    [&>p]:mb-6 [&>p]:text-muted-foreground [&>p]:leading-relaxed
                    [&>ul]:mb-6 [&>ul]:list-none [&>ul]:pl-0 [&>ul>li]:mb-3 [&>ul>li]:text-muted-foreground [&>ul>li]:relative [&>ul>li]:pl-6 [&>ul>li]:before:content-[''] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:top-[10px] [&>ul>li]:before:w-2 [&>ul>li]:before:h-[2px] [&>ul>li]:before:bg-primary
                    [&>ol]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol>li]:mb-2 [&>ol>li]:text-muted-foreground
                    [&>strong]:text-foreground [&>strong]:font-bold
                    [&>blockquote]:border-l-4 [&>blockquote]:border-foreground [&>blockquote]:pl-8 [&>blockquote]:italic [&>blockquote]:text-foreground/80 [&>blockquote]:my-10 [&>blockquote]:text-2xl [&>blockquote]:font-medium
                    [&>img]:rounded-none [&>img]:my-12 [&>img]:border [&>img]:border-border/60 [&>img]:grayscale [&>img]:hover:grayscale-0 [&>img]:transition-all [&>img]:duration-700
                  "
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <div className="
                  prose prose-lg dark:prose-invert max-w-none text-foreground leading-relaxed
                  [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mt-10 [&>h1]:mb-6 [&>h1]:tracking-tight
                  [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:tracking-tight
                  [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-foreground [&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:tracking-tight
                  [&>p]:mb-6 [&>p]:text-muted-foreground [&>p]:leading-relaxed
                  [&>ul]:mb-6 [&>ul]:list-none [&>ul]:pl-0 [&>ul>li]:mb-3 [&>ul>li]:text-muted-foreground [&>ul>li]:relative [&>ul>li]:pl-6 [&>ul>li]:before:content-[''] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:top-[10px] [&>ul>li]:before:w-2 [&>ul>li]:before:h-[2px] [&>ul>li]:before:bg-primary
                  [&>ol]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol>li]:mb-2 [&>ol>li]:text-muted-foreground
                  [&>strong]:text-foreground [&>strong]:font-bold
                  [&>blockquote]:border-l-4 [&>blockquote]:border-foreground [&>blockquote]:pl-8 [&>blockquote]:italic [&>blockquote]:text-foreground/80 [&>blockquote]:my-10 [&>blockquote]:text-2xl [&>blockquote]:font-medium
                  [&>img]:rounded-none [&>img]:my-12 [&>img]:border [&>img]:border-border/60 [&>img]:grayscale [&>img]:hover:grayscale-0 [&>img]:transition-all [&>img]:duration-700
                ">
                  <ReactMarkdown
                    components={{
                      h2: ({ node, ...props }) => {
                        const text = props.children?.toString() || "";
                        const id = text.toLowerCase().replace(/[^\w]+/g, "-");
                        return <h2 id={id} {...props} />;
                      },
                      h3: ({ node, ...props }) => {
                        const text = props.children?.toString() || "";
                        const id = text.toLowerCase().replace(/[^\w]+/g, "-");
                        return <h3 id={id} {...props} />;
                      }
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
              )}

              {/* Share & Engagement Section */}
              <div className="mt-16 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground">Share Article</span>
                  <BlogShareButtons title={post.title} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── RELATED ARTICLES ─── */}
      {relatedPosts.length > 0 && (
        <Section className="py-24 border-t border-border/60 bg-muted/10">
          <Container>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div>
                <span className="text-muted-foreground mb-4 block text-[10px] font-bold uppercase tracking-[0.2em]">
                  Keep Reading
                </span>
                <h2 className="text-4xl font-bold tracking-tight text-foreground">Related Articles</h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex h-12 items-center justify-center border-b-2 border-foreground px-4 text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                View all insights <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/60 border border-border/60">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group flex flex-col h-full bg-background hover:bg-foreground hover:text-background transition-colors p-8">
                  <div className="relative aspect-video w-full bg-muted border border-border/60 overflow-hidden mb-8">
                    <img
                      src={relatedPost.imageSrc}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground group-hover:text-background/60 transition-colors mb-4">
                      <span className="text-primary group-hover:text-background">{relatedPost.category}</span>
                      <span>•</span>
                      <span>{relatedPost.publishDate}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 leading-tight">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── NEWSLETTER SUBSCRIPTION CTA ─── */}
      <Section className="bg-foreground text-background py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-background/60 mb-6 block text-[10px] font-bold uppercase tracking-[0.2em]">
                Stay Updated
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
                Engineering deep dives,<br />delivered.
              </h2>
              <p className="text-lg text-background/80 max-w-lg leading-relaxed">
                Subscribe to our newsletter for insights on software architecture, artificial intelligence, and building scalable digital products. No spam, ever.
              </p>
            </div>
            
            <NewsletterForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
