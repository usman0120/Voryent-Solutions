import * as React from "react"
import { Navbar } from "../../src/components/custom/navbar"
import { Footer } from "../../src/components/custom/footer"
import { Sidebar } from "../../src/components/custom/sidebar"
import { Button } from "../../src/components/ui/button"
import { Home, Users, Settings, HelpCircle, Mail, MapPin } from "lucide-react"

export default function NavigationExample() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Navbar Example */}
      <Navbar 
        links={[
          { label: "Products", href: "#" },
          { label: "Solutions", href: "#" },
          { label: "Pricing", href: "#" },
          { label: "Resources", href: "#" },
        ]}
        actions={
          <>
            <Button variant="ghost">Sign In</Button>
            <Button>Get Started</Button>
          </>
        }
      />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Example */}
        <Sidebar 
          className="relative block" 
          header={<div className="font-bold text-lg">Dashboard</div>}
          items={[
            { label: "Home", icon: <Home />, isActive: true, href: "#" },
            { 
              label: "Team", 
              icon: <Users />, 
              children: [
                { label: "Members", href: "#" },
                { label: "Roles", href: "#" }
              ]
            },
            { label: "Settings", icon: <Settings />, href: "#" }
          ]}
          footer={
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="mr-2 h-4 w-4" /> Support
            </Button>
          }
        />

        {/* Main Content Area */}
        <main className="flex-1 p-8 bg-muted/10 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Navigation Elements</h1>
            <p className="text-muted-foreground">
              This layout demonstrates how the Navbar, Sidebar, and Footer integrate into a full application shell.
            </p>
            <div className="h-96 border-2 border-dashed rounded-lg border-muted-foreground/20 flex items-center justify-center text-muted-foreground">
              Main Content Area
            </div>
          </div>
        </main>
      </div>

      {/* Footer Example */}
      <Footer 
        description="Empowering the next generation of digital products with unparalleled design and engineering."
        sections={[
          {
            title: "Product",
            links: [
              { label: "Features", href: "#" },
              { label: "Integrations", href: "#" },
              { label: "Pricing", href: "#" }
            ]
          },
          {
            title: "Company",
            links: [
              { label: "About Us", href: "#" },
              { label: "Careers", href: "#" },
              { label: "Contact", href: "#" }
            ]
          }
        ]}
        socialLinks={
          <div className="flex space-x-2 text-muted-foreground">
            <Mail className="h-5 w-5" />
            <MapPin className="h-5 w-5" />
          </div>
        }
      />
    </div>
  )
}
