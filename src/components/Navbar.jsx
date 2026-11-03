import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { club, navLinks } from "../data/club"
import { btnPrimary, shell } from "./ui"

function linkClass(isActive) {
  return `whitespace-nowrap rounded-md px-2 py-1 text-sm font-semibold transition ${
    isActive ? "text-gold" : "text-cream/80 hover:text-white"
  }`
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 bg-ink text-cream ${
        scrolled ? "shadow-lg shadow-black/25" : ""
      }`}
    >
      <div className={`${shell} flex h-[4.5rem] items-center justify-between gap-4`}>
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-ember font-display text-xl font-bold text-ink">
            {club.mark}
          </span>
          <span className="min-w-0 leading-none">
            <span className="block font-display text-2xl font-bold tracking-wide text-white">{club.short.toUpperCase()}</span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-mist">
              {club.kind}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) => linkClass(isActive)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/membership" onClick={() => setOpen(false)} className={`${btnPrimary} shrink-0 px-3 py-2 lg:px-4`}>
            Join Now
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-cream lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-white/10 lg:hidden">
          <nav className={`${shell} flex flex-col py-3`} aria-label="Mobile">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `border-b border-white/10 py-3 text-lg font-semibold ${isActive ? "text-gold" : "text-cream"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
