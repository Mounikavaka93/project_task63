import { shell } from "./ui"

export default function PageHeader({ eyebrow, title, children }) {
  return (
    <header className="bg-ink text-cream">
      <div className={`${shell} py-14 sm:py-16`}>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-5xl font-bold leading-[0.92] tracking-tight sm:text-6xl">
          {title}
        </h1>
        {children ? (
          <div className="mt-4 max-w-2xl text-base leading-relaxed text-mist">{children}</div>
        ) : null}
      </div>
    </header>
  )
}
