import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface CookieBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  onAccept?: () => void
  onDecline?: () => void
  message?: string
}

export function CookieBanner({ 
  onAccept, 
  onDecline, 
  message = "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
  className, 
  ...props 
}: CookieBannerProps) {
  const [isVisible, setIsVisible] = React.useState(true)

  const handleAccept = () => {
    setIsVisible(false)
    onAccept?.()
  }

  const handleDecline = () => {
    setIsVisible(false)
    onDecline?.()
  }

  if (!isVisible) return null

  return (
    <div 
      role="alert" 
      aria-live="polite"
      className={cn(
        "fixed bottom-4 right-4 left-4 md:left-auto md:w-[24rem] p-4 rounded-lg border bg-card text-card-foreground shadow-lg z-50 animate-in slide-in-from-bottom-2", 
        className
      )} 
      {...props}
    >
      <h3 className="font-semibold mb-2 text-sm">Cookie Preferences</h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {message}
      </p>
      <div className="flex gap-2 justify-end">
        <Button variant="outline" size="sm" onClick={handleDecline}>Decline</Button>
        <Button size="sm" onClick={handleAccept}>Accept</Button>
      </div>
    </div>
  )
}