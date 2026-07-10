import * as React from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as DialogPrimitive from "@radix-ui/react-dialog"

export interface NavLink {
  label: string
  href: string
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  links?: NavLink[]
  actions?: React.ReactNode
  mobileMenuContent?: React.ReactNode
  isScrolled?: boolean
}

export function Navbar({ 
  logo, 
  links = [], 
  actions, 
  mobileMenuContent,
  isScrolled = true,
  className, 
  ...props 
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out border-b",
        isScrolled 
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border shadow-sm" 
          : "bg-transparent border-transparent shadow-none",
        className
      )}
      {...props}
    >
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-md shadow-md"
      >
        Skip to main content
      </a>

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
          
          <DialogPrimitive.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DialogPrimitive.Trigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Toggle Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm bg-background p-6 shadow-lg duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                  <DialogPrimitive.Title className="sr-only">Mobile Navigation</DialogPrimitive.Title>
                  <DialogPrimitive.Description className="sr-only">Navigate the website on mobile devices</DialogPrimitive.Description>
                  <a href="/" className="flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
                    {logo ? logo : <span className="font-bold text-xl tracking-tight text-primary">Voryent</span>}
                  </a>
                  <DialogPrimitive.Close asChild>
                    <Button variant="ghost" size="icon" aria-label="Close Menu">
                      <X className="h-5 w-5" />
                    </Button>
                  </DialogPrimitive.Close>
                </div>
                
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
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </div>
    </header>
  )
}