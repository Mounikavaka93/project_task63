import { useState } from "react"
import { Link } from "react-router-dom"
import FilterBar from "../components/FilterBar"
import PageHeader from "../components/PageHeader"
import Photo from "../components/Photo"
import { btnInk, shell } from "../components/ui"
import { sports } from "../data/sports"
import { usePageTitle } from "../hooks/usePageTitle"

export default function Sports() {
  usePageTitle("Sports and activities")
  const [filter, setFilter] = useState("All")
  const options = ["All", ...sports.map((sport) => sport.name)]

  return (
    <>
      <PageHeader eyebrow="Sports and activities" title="Five sports, each with a coach and a weekly rhythm.">
        Every program lists who it is for, where it happens, and the sessions on the board this season. Choose one to start. You can add another later on most plans.
      </PageHeader>

      <section className={`${shell} py-12 sm:py-16`}>
        <FilterBar label="Filter sports" value={filter} options={options} onChange={setFilter} />
        <div className="mt-8 space-y-8">
          {sports.map((sport, index) => (
            <article
              key={sport.slug}
              id={sport.slug}
              hidden={filter !== "All" && filter !== sport.name}
              className="scroll-mt-28 overflow-hidden rounded-3xl bg-white ring-1 ring-ink/10"
            >
              <div className="grid lg:grid-cols-2">
                <div className={`relative min-h-80 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Photo
                    src={sport.image}
                    alt={sport.imageAlt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 sm:p-8 lg:p-10">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-emberdeep">{sport.level}</p>
                  <h2 className="mt-2 text-5xl font-bold leading-none">{sport.name}</h2>
                  <p className="mt-4 text-base leading-relaxed text-ink/80">{sport.summary}</p>
                  <p className="mt-3 text-base leading-relaxed text-ink/75">{sport.details}</p>
                  <dl className="mt-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-ink/50">Ages</dt>
                      <dd className="mt-1 font-semibold">{sport.ages}</dd>
                    </div>
                    <div>
                      <dt className="text-ink/50">Venue</dt>
                      <dd className="mt-1 font-semibold">{sport.venue}</dd>
                    </div>
                    <div>
                      <dt className="text-ink/50">Lead coach</dt>
                      <dd className="mt-1 font-semibold">
                        <Link className="text-emberdeep" to={`/coaches#${sport.coachId}`}>
                          {sport.coach}
                        </Link>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-ink/50">Weekly rhythm</dt>
                      <dd className="mt-1 font-semibold">{sport.rhythm}</dd>
                    </div>
                  </dl>
                  <ul className="mt-6 space-y-2 text-sm text-ink/80">
                    {sport.sessions.map((session) => (
                      <li key={session} className="rounded-xl bg-cream px-4 py-3">
                        {session}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/membership?sport=${sport.slug}#plans`}
                    className={`${btnInk} mt-6`}
                  >
                    Join this sport
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
