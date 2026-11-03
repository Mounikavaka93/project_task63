import { Link } from "react-router-dom"
import { club, navLinks } from "../data/club"
import { sports } from "../data/sports"
import { shell } from "./ui"

const copyrightYear = new Date().getFullYear()

export default function Footer() {

  return (
    <footer className="bg-ink text-cream">
      <div className={`${shell} grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4`}>
        <div>
          <p className="font-display text-3xl font-bold tracking-wide">{club.short.toUpperCase()}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist">
            A multi-sport club on the Harborview riverside. Coached sessions, weekend fixtures, and a desk that answers.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Visit</p>
          <address className="mt-3 space-y-2 text-sm not-italic leading-relaxed text-mist">
            <p>
              {club.street}
              <br />
              {club.locality}
            </p>
            <p>
              <a className="font-semibold text-cream hover:text-ember" href={club.phoneHref}>
                {club.phone}
              </a>
            </p>
            <p>
              <a className="font-semibold text-cream hover:text-ember" href={`mailto:${club.email}`}>
                {club.email}
              </a>
            </p>
            {club.hours.map((slot) => (
              <p key={slot.label}>
                {slot.label}
                <br />
                {slot.value}
              </p>
            ))}
          </address>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link className="text-mist hover:text-white" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Sports</p>
          <ul className="mt-3 space-y-2 text-sm">
            {sports.map((sport) => (
              <li key={sport.slug}>
                <Link className="text-mist hover:text-white" to={`/sports#${sport.slug}`}>
                  {sport.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className={`${shell} flex flex-col gap-2 py-4 text-sm text-mist sm:flex-row sm:items-center sm:justify-between`}>
          <p>
            © {copyrightYear} {club.name}
          </p>
          <p>
            {club.city} · Est. {club.founded}
          </p>
        </div>
      </div>
    </footer>
  )
}
