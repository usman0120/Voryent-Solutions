import * as React from "react"
import { BlogCard } from "../../src/components/custom/blog-card"
import { ProjectCard } from "../../src/components/custom/project-card"
import { TeamCard } from "../../src/components/custom/team-card"
import { Button } from "../../src/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CardsExample() {
  return (
    <div className="w-full py-12 space-y-24">
      {/* Blog Cards */}
      <section className="container px-4 md:px-6 mx-auto">
        <h2 className="text-2xl font-bold mb-6">Blog Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <BlogCard 
              key={i}
              title={`Building Enterprise Applications with Next.js (Part ${String(i)})`}
              excerpt="Learn how to architect, develop, and deploy a large-scale React application using the App Router."
              date="July 12, 2026"
              category="Engineering"
              author={{ name: "Jane Doe" }}
              href="#"
            />
          ))}
        </div>
      </section>

      {/* Project Cards */}
      <section className="container px-4 md:px-6 mx-auto">
        <h2 className="text-2xl font-bold mb-6">Project Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectCard 
            title="Voryent E-Commerce Platform"
            description="A high-performance headless e-commerce solution built for scale."
            tags={["Next.js", "GraphQL", "Stripe"]}
            action={
              <Button variant="link" className="px-0 group">
                Read Case Study <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            }
          />
          <ProjectCard 
            title="Analytics Dashboard"
            description="Real-time data visualization and reporting platform."
            tags={["React", "D3.js", "WebSockets"]}
          />
        </div>
      </section>

      {/* Team Cards */}
      <section className="container px-4 md:px-6 mx-auto">
        <h2 className="text-2xl font-bold mb-6">Team Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <TeamCard 
            name="Alice Smith"
            role="Lead Designer"
            bio="Alice brings 10+ years of experience in creating beautiful digital products."
            socials={{ twitter: "#", linkedin: "#" }}
          />
          <TeamCard 
            name="Bob Johnson"
            role="Senior Engineer"
            bio="Expert in scalable frontend architecture."
            socials={{ github: "#" }}
          />
        </div>
      </section>
    </div>
  )
}
