import { useState } from "react"

export default function Photo({ src, alt, className = "", eager = false, ...props }) {
  const [failed, setFailed] = useState(false)
  const classes = `block ${className}`

  if (failed) {
    return (
      <div
        {...props}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        className={`${classes} bg-[radial-gradient(circle_at_30%_20%,#ff5c2a,transparent_42%),linear-gradient(160deg,#162536,#08111c)]`}
      />
    )
  }

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      className={classes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
