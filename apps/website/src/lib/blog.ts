import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  readingTime: string
  publishDate: string
  author: string
  imageSrc: string
  content: string
}

const blogDirectory = path.join(process.cwd(), "content", "blog")

export function getPostSlugs() {
  if (!fs.existsSync(blogDirectory)) {
    return []
  }
  return fs.readdirSync(blogDirectory)
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const realSlug = slug.replace(/\.md$/, "")
    const fullPath = path.join(blogDirectory, `${realSlug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug: realSlug,
      title: data["title"] as string,
      excerpt: data["excerpt"] as string,
      category: data["category"] as string,
      readingTime: data["readingTime"] as string,
      publishDate: data["publishDate"] as string,
      author: data["author"] as string,
      imageSrc: data["imageSrc"] as string,
      content,
    }
  } catch (error) {
    console.error(`Error reading post: ${slug}`, error)
    return null
  }
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((post1, post2) => (post1.publishDate > post2.publishDate ? -1 : 1))
  
  return posts
}
