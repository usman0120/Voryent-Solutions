"use client"

import { useEffect } from "react"
import { Button } from "@voryent/ui"
import { Container } from "@voryent/ui"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter">Something went wrong!</h1>
        <p className="text-muted-foreground max-w-[600px] mx-auto">
          An unexpected error occurred while loading this page. Our engineers have been notified.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={() => reset()} variant="default">
          Try again
        </Button>
      </div>
    </Container>
  )
}
