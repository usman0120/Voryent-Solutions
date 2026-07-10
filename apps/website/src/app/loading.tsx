import { LoadingSpinner } from "@voryent/ui"

export default function Loading() {
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <LoadingSpinner size="lg" text="Loading..." />
    </div>
  )
}
