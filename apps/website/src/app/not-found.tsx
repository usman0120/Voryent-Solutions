import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      {/* Light mode: icon for light backgrounds */}
      <div className="relative mb-8 block h-16 w-16 dark:hidden">
        <Image
          src="/Assets/Logos/Light BG/Icon-only_version_Logo_White.webp"
          alt="Voryent Solutions"
          fill
          sizes="64px"
          className="object-contain"
        />
      </div>
      {/* Dark mode: icon for dark backgrounds */}
      <div className="relative mb-8 hidden h-16 w-16 dark:block">
        <Image
          src="/Assets/Logos/Dark BG/Icon-only_version_Logo_Dark.webp"
          alt="Voryent Solutions"
          fill
          sizes="64px"
          className="object-contain"
        />
      </div>

      {/* Content */}
      <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-widest">Error 404</p>
      <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
        Page Not Found
      </h1>
      <p className="text-muted-foreground mt-4 max-w-md leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Check the URL or use
        one of the links below to get back on track.
      </p>

      {/* Actions */}
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2"
        >
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex items-center justify-center rounded-md border px-6 py-3 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2"
        >
          Contact Us
        </Link>
      </div>

      {/* Search link */}
      <p className="text-muted-foreground mt-8 text-sm">
        Or try{" "}
        <Link
          href="/search"
          className="text-primary focus-visible:ring-ring rounded-md font-medium hover:underline focus-visible:outline-none focus-visible:ring-2"
        >
          searching the site
        </Link>
      </p>
    </div>
  );
}
