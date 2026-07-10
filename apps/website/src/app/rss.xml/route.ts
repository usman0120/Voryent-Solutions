import { getAllContent } from "@/lib/content"

export async function GET() {
  const url = process.env["NEXT_PUBLIC_APP_URL"] || "https://voryentsolutions.com"
  
  const blogs = getAllContent("blog")
  const resources = getAllContent("resources")

  const blogItems = blogs.map((item) => {
    const itemUrl = `${url}/blog/${item.slug}`
    const title = item["title"] || item.slug
    const description = item["summary"] || item["excerpt"] || ""
    const date = item["publishedAt"] || item["date"] || new Date().toISOString()
    
    return `
    <item>
      <title><![CDATA[${title}]]></title>
      <link>${itemUrl}</link>
      <guid>${itemUrl}</guid>
      <pubDate>${new Date(date).toUTCString()}</pubDate>
      <description><![CDATA[${description}]]></description>
    </item>`
  })

  const resourceItems = resources.map((item) => {
    // Assuming resources are listed on the main resources page for now
    const itemUrl = `${url}/resources`
    const title = item["title"] || item.slug
    const description = item["summary"] || item["description"] || ""
    const date = item["publishedAt"] || item["date"] || new Date().toISOString()
    
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
}
