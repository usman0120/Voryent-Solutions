import * as React from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface NavLink {
  label: string
  href: string
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  links?: NavLink[]
  actions?: React.ReactNode
  mobileMenuContent?: React.ReactNode
}

export function Navbar({ 
  logo, 
  links = [], 
  actions, 
  mobileMenuContent,
  className, 
  ...props 
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <a href="/" className="flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
            {logo ? logo : <span className="font-bold text-xl tracking-tight text-primary">Voryent</span>}
          </a>
          {links.length > 0 && (
            <nav className="hidden md:flex gap-6">
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2 py-1 -mx-2"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            {actions}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-background border-t animate-in fade-in slide-in-from-top-2 duration-200 p-6 overflow-y-auto">
          {mobileMenuContent ? (
            mobileMenuContent
          ) : (
            <div className="flex flex-col gap-6">
              <nav className="flex flex-col gap-4">
                {links.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="text-lg font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md p-2 -mx-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col gap-2 pt-6 border-t">
                {actions}
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  )
}