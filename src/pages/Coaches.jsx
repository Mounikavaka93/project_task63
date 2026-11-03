import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import FilterBar from "../components/FilterBar"
import PageHeader from "../components/PageHeader"
import Photo from "../components/Photo"
import { btnGhost, btnPrimary, shell } from "../components/ui"
import { club } from "../data/club"
import { coaches } from "../data/coaches"
import { usePageTitle } from "../hooks/usePageTitle"

export default function Coaches() {
  usePageTitle("Coaches and trainers")
  const [sport, setSport] = useState("All")
  const [active, setActive] = useState(null)
  const options = useMemo(() => ["All", ...new Set(coaches.map((coach) => coach.sport))], [])
  const visible = useMemo(
    () => coaches.filter((coach) => sport === "All" || coach.sport === sport),
    [sport],
  )
  const profile = visible.find((coach) => coach.id === active?.id) ?? null

  function selectCoach(coach) {
    const next = active?.id === coach.id ? null : coach
    setActive(next)
    if (next) {
      window.setTimeout(() => {
        document.getElementById("coach-profile")?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 40)
    }
  }

  return (
    <>
      <PageHeader eyebrow="Coaches and trainers" title="Named coaches, not a rotating roster.">
        {club.short} has 38 coaches on staff. These six lead the sports and the strength room. Each profile lists experience and what they actually coach.
      </PageHeader>

      <section className={`${shell} py-12 sm:py-16`}>
        <h2 className="sr-only">Coach profiles</h2>
        <FilterBar label="Filter coaches by sport" value={sport} options={options} onChange={setSport} />

        {profile ? (
          <article id="coach-profile" className="scroll-mt-28 mt-8 grid gap-6 rounded-3xl bg-ink p-5 text-cream sm:p-8 lg:grid-cols-[240px_1fr]">
            <Photo
              src={profile.image}
              alt={profile.imageAlt}
              className="aspect-square w-full rounded-2xl object-cover"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">{profile.role}</p>
              <h2 className="mt-2 text-5xl font-bold leading-none">{profile.name}</h2>
              <p className="mt-3 text-sm text-mist">
                {profile.seasons} seasons at {club.short} · {profile.specialization}
              </p>
              <p className="mt-2 text-sm font-semibold text-cream">{profile.credentials}</p>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-mist">
                {profile.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {profile.focus.map((item) => (
                  <li key={item} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={`/contact?subject=${encodeURIComponent(`Session with ${profile.name}`)}#contact-form`}
                  className={btnPrimary}
                >
                  Ask about sessions
                </Link>
                {profile.sportSlug ? (
                  <Link to={`/sports#${profile.sportSlug}`} className={btnGhost}>
                    View {profile.sport}
                  </Link>
                ) : (
                  <Link to="/sports" className={btnGhost}>
                    View sports
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="cursor-pointer rounded-md px-4 py-3 text-sm font-semibold text-cream"
                >
                  Close profile
                </button>
              </div>
            </div>
          </article>
        ) : null}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((coach) => {
            const selected = active?.id === coach.id
            return (
              <article key={coach.id} id={coach.id} className="scroll-mt-28">
                <button
                  type="button"
                  aria-pressed={selected}
                  aria-expanded={selected}
                  onClick={() => selectCoach(coach)}
                  className={`w-full cursor-pointer overflow-hidden rounded-3xl bg-white text-left ring-1 transition ${
                    selected ? "ring-2 ring-ember" : "ring-ink/10 hover:ring-ink/30"
                  }`}
                >
                  <Photo src={coach.image} alt={coach.imageAlt} className="aspect-[4/5] w-full object-cover" />
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-emberdeep">{coach.sport}</p>
                    <h3 className="mt-2 text-3xl font-bold leading-none">{coach.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-ink/80">{coach.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">{coach.summary}</p>
                    <p className="mt-3 text-sm font-semibold text-ink">
                      {coach.seasons} seasons · {selected ? "Profile open" : "View profile"}
                    </p>
                  </div>
                </button>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}
