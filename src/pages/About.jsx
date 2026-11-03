import { Link } from "react-router-dom"
import PageHeader from "../components/PageHeader"
import Photo from "../components/Photo"
import SectionHeading from "../components/SectionHeading"
import { btnInk, shell } from "../components/ui"
import {
  achievements,
  club,
  facilities,
  mission,
  stats,
  timeline,
  values,
  vision,
} from "../data/club"
import { unsplash } from "../data/photos"
import { usePageTitle } from "../hooks/usePageTitle"

export default function About() {
  usePageTitle("About")

  return (
    <>
      <PageHeader eyebrow="About us" title="A riverside club that grew into a campus.">
        {club.short} started with borrowed goalposts and a cricket kit bag. It is now a home for five sports, a junior academy, and weekend fixtures.
      </PageHeader>

      <section className={`${shell} grid items-center gap-10 py-16 lg:grid-cols-2 sm:py-20`}>
        <div>
          <SectionHeading eyebrow="Club history" title={`Founded in ${club.founded}`}>
            A group of Harborview players wanted somewhere to train and somewhere to play on the same weekend. They rented the pitch at {club.street} and kept the name simple.
          </SectionHeading>
          <p className="mt-4 text-base leading-relaxed text-ink/75">
            The hall, the tennis courts, and the strength room were added when the membership could fill them. The desk is still in the lounge, and the ground is still the place the club gathers on Sundays.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl">
          <Photo
            src={unsplash("photo-1508098682722-e99c43a406b2")}
            alt="Spectators at a football ground on match day"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </section>

      <section className="bg-white">
        <div className={`${shell} py-16 sm:py-20`}>
          <SectionHeading eyebrow="Since the first season" title="A short history" />
          <ol className="mt-10 space-y-0 border-l border-ink/15">
            {timeline.map((item) => (
              <li key={item.year} className="grid gap-2 py-5 pl-6 sm:grid-cols-[6rem_1fr] sm:gap-6">
                <p className="text-2xl font-bold leading-none text-emberdeep">{item.year}</p>
                <p className="text-base leading-relaxed text-ink/80">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${shell} grid gap-5 py-16 md:grid-cols-2 sm:py-20`}>
        <article className="rounded-3xl bg-ink p-8 text-cream">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Mission</p>
          <h2 className="mt-3 text-4xl font-bold leading-[0.95]">Why the club exists</h2>
          <p className="mt-4 text-base leading-relaxed text-mist">{mission}</p>
        </article>
        <article className="rounded-3xl bg-white p-8 ring-1 ring-ink/10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emberdeep">Vision</p>
          <h2 className="mt-3 text-4xl font-bold leading-[0.95]">Where it is going</h2>
          <p className="mt-4 text-base leading-relaxed text-ink/75">{vision}</p>
        </article>
      </section>

      <section className="bg-sand/60">
        <div className={`${shell} py-16 sm:py-20`}>
          <SectionHeading eyebrow="How we behave" title="Four things members can expect" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <article key={value.title} className="rounded-3xl bg-white p-6 ring-1 ring-ink/10">
                <h3 className="text-3xl font-bold leading-none">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${shell} py-16 sm:py-20`}>
        <SectionHeading eyebrow="Achievements" title="Titles, call-ups, and the work in schools" />
        <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl bg-white px-4 py-5 ring-1 ring-ink/10">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/50">{item.label}</dt>
              <dd className="mt-2 font-display text-4xl font-bold leading-none">{item.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {achievements.map((item) => (
            <article key={item.title} className="rounded-3xl bg-white p-6 ring-1 ring-ink/10">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emberdeep">{item.label}</p>
              <h3 className="mt-2 text-3xl font-bold leading-none">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className={`${shell} py-16 sm:py-20`}>
          <SectionHeading eyebrow="Club information" title="The campus, the hours, and who can join">
            Ages 6 and up. Beginners, players coming back to a sport, and people who already compete. You do not need to be selected.
          </SectionHeading>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility) => (
              <article key={facility.title} className="rounded-3xl bg-cream p-6 ring-1 ring-ink/10">
                <h3 className="text-2xl font-bold leading-none">{facility.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{facility.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-4 rounded-3xl bg-ink p-6 text-cream sm:grid-cols-3 sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Address</p>
              <p className="mt-2 text-sm leading-relaxed">
                {club.street}
                <br />
                {club.locality}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Desk hours</p>
              {club.hours.map((slot) => (
                <p key={slot.label} className="mt-2 text-sm leading-relaxed">
                  {slot.label}: {slot.value}
                </p>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">What to bring</p>
              <p className="mt-2 text-sm leading-relaxed">
                Indoor shoes or boots for your sport, and water. The club loans a starter kit for the first month.
              </p>
            </div>
          </div>
          <Link to="/membership" className={`${btnInk} mt-8`}>
            See membership plans
          </Link>
        </div>
      </section>
    </>
  )
}
