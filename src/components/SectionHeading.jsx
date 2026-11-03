export default function SectionHeading({ eyebrow, title, children, light = false, action = null }) {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.2em] ${light ? "text-gold" : "text-emberdeep"}`}
          >
            {eyebrow}
          </p>
          <h2
            className={`mt-2 text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl ${light ? "text-cream" : "text-ink"}`}
          >
            {title}
          </h2>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {children ? (
        <p className={`mt-4 max-w-2xl text-base leading-relaxed ${light ? "text-mist" : "text-ink/70"}`}>
          {children}
        </p>
      ) : null}
    </div>
  )
}
