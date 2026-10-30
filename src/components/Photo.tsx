import { cn } from "@/lib/utils"

// The site is a single page at the root, so relative paths work on fdgrill.com
// and on the github.io project URL, and match between pre-render and browser
export const asset = (path: string) => path

type PhotoProps = {
  name: string
  widths: number[]
  sizes: string
  alt: string
  width: number
  height: number
  /** Largest JPEG fallback width (defaults to the largest WebP width) */
  fallback?: number
  priority?: boolean
  className?: string
}

/** Responsive WebP with a JPEG fallback, from public/img */
export function Photo({ name, widths, sizes, alt, width, height, fallback, priority, className }: PhotoProps) {
  const srcSet = widths.map((w) => `${asset(`img/${name}-${w}.webp`)} ${w}w`).join(", ")
  const jpeg = asset(`img/${name}-${fallback ?? widths[widths.length - 1]}.jpg`)
  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        src={jpeg}
        alt={alt}
        width={width}
        height={height}
        className={cn(className)}
        {...(priority ? { fetchPriority: "high" as const } : { loading: "lazy" as const, decoding: "async" as const })}
      />
    </picture>
  )
}
