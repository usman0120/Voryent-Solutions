import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      {/* Light mode: icon for light backgrounds */}
      <div className="w-16 h-16 relative mb-8 block dark:hidden">
        <Image
          src="/Assets/Logos/Light BG/Icon-only_version_Logo_White.png"
          alt="Voryent Solutions"
          fill
          sizes="64px"
          className="object-contain"
        />
      </div>
      {/* Dark mode: icon for dark backgrounds */}
      <div className="w-16 h-16 relative mb-8 hidden dark:block">
        <Image
          src="/Assets/Logos/Dark BG/Icon-only_version_Logo_Dark.png"
          alt="Voryent Solutions"
          fill
          sizes="64px"
          className="object-contain"
        />
      </div>

      {/* Content */}
      <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
        Error 404
      </p>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
        Page Not Found
      </h1>
      <p className="mt-4 text-muted-foreground max-w-md leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Check the URL or use one of the links below to get back on track.
      </p>

      {/* Actions */}
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Contact Us
        </Link>
      </div>

      {/* Search link */}
      <p className="mt-8 text-sm text-muted-foreground">
        Or try{" "}
        <Link
          href="/search"
          className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
        >
          searching the site
        </Link>
      </p>
    </div>
  )
}
