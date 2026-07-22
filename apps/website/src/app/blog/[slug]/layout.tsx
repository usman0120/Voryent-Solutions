import type { Metadata } from "next";
import { constructMetadata } from "../../../lib/utils";
import { getBlogPostBySlug } from "../../../lib/firebase/services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let post: any = null;
  try {
    post = await getBlogPostBySlug(slug);
  } catch (e) {}

  if (!post) {
    return constructMetadata({
      title: "Article | Blog",
      description: "Read engineering insights and articles from Voryent Solutions.",
    });
  }

  const title = post.title ? `${post.title} | Voryent Solutions` : "Article | Blog";
  const description = post.excerpt || "Read engineering insights and articles from Voryent Solutions.";
  const image = post.coverImage?.startsWith("http") || post.coverImage?.startsWith("data:") 
    ? post.coverImage 
    : `https://voryentsolutions.com${post.coverImage || "/Assets/Illustrations/Blog.png"}`;

  return constructMetadata({
    title,
    description,
    canonicalUrl: `https://voryentsolutions.com/blog/${slug}`,
    image,
  });
}

export default function BlogDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
