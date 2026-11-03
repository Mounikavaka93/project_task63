import { Link } from "react-router-dom"
import { btnGhost, btnInk, shell } from "../components/ui"
import { usePageTitle } from "../hooks/usePageTitle"

export default function NotFound() {
  usePageTitle("Page not found")

  return (
    <section className={`${shell} py-24`}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-emberdeep">404</p>
      <h1 className="mt-3 max-w-xl text-6xl font-bold leading-[0.92]">That page is not on this site.</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/70">
        The address does not match a club page. Go back to the home page or open the fixture list.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className={btnInk}>
          Back home
        </Link>
        <Link to="/events" className={btnGhost}>
          View events
        </Link>
      </div>
    </section>
  )
}
