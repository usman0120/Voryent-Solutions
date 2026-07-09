import * as React from "react"
import { Button, type ButtonProps } from "@/components/ui/button"

const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={className}
      {...props}
    />
  )
)
IconButton.displayName = "IconButton"

export { IconButton }