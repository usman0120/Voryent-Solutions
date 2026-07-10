import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface ContentItem {
  slug: string
  content: string
  [key: string]: any
}

export function getContentSlugs(directory: string) {
  const dirPath = path.join(process.cwd(), "content", directory)
  if (!fs.existsSync(dirPath)) {
    return []
  }
  return fs.readdirSync(dirPath)
}

export function getContentBySlug(directory: string, slug: string): ContentItem | null {
  try {
    const realSlug = slug.replace(/\.md$/, "")
    const fullPath = path.join(process.cwd(), "content", directory, `${realSlug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug: realSlug,
      content,
      ...data,
    }
  } catch (error) {
    console.error(`Error reading content: ${directory}/${slug}`, error)
    return null
  }
}

export function getAllContent(directory: string): ContentItem[] {
  const slugs = getContentSlugs(directory)
  const items = slugs
    .map((slug) => getContentBySlug(directory, slug))
    .filter((item): item is ContentItem => item !== null)
  
  return items
}
