import { getBlogPosts, getResources } from "@/lib/firebase/services"

export async function GET() {
  const url = process.env["NEXT_PUBLIC_APP_URL"] || "https://voryentsolutions.com"
  
  try {
    const [blogs, resources] = await Promise.all([
      getBlogPosts(),
      getResources()
    ])

    const blogItems = blogs.map((item: any) => {
      const itemUrl = `${url}/blog/${item.slug || item.id}`
      const title = item.title || item.slug || "Blog Post"
      const description = item.excerpt || item.seo?.description || ""
      const date = item.publishedAt || item.createdAt || item.updatedAt || new Date().toISOString()
      
      return `
      <item>
        <title><![CDATA[${title}]]></title>
        <link>${itemUrl}</link>
        <guid>${itemUrl}</guid>
        <pubDate>${new Date(date).toUTCString()}</pubDate>
        <description><![CDATA[${description}]]></description>
      </item>`
    })

    const resourceItems = resources.map((item: any) => {
      const itemUrl = `${url}/resources/${item.slug || item.id}`
      const title = item.title || item.slug || "Resource"
      const description = item.description || item.seo?.description || ""
      const date = item.publishedAt || item.createdAt || item.updatedAt || new Date().toISOString()
      
      return `
      <item>
        <title><![CDATA[${title}]]></title>
        <link>${itemUrl}</link>
        <guid>${itemUrl}</guid>
        <pubDate>${new Date(date).toUTCString()}</pubDate>
        <description><![CDATA[${description}]]></description>
      </item>`
    })

    const items = [...blogItems, ...resourceItems].join("")

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Voryent Solutions RSS Feed</title>
    <link>${url}</link>
    <description>Latest articles, resources, and news from Voryent Solutions.</description>
    <language>en</language>
    ${items}
  </channel>
</rss>`

    return new Response(rss, {
      headers: {
        "Content-Type": "text/xml",
      },
    })
  } catch (error) {
    console.error("Failed to generate RSS feed:", error)
    return new Response("Failed to generate RSS feed", { status: 500 })
  }
}
