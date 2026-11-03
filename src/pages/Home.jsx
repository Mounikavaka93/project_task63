import { Link } from "react-router-dom"
import EventCard from "../components/EventCard"
import HeroGallery from "../components/HeroGallery"
import Photo from "../components/Photo"
import SectionHeading from "../components/SectionHeading"
import { btnGhostLight, btnInk, btnPrimary, shell } from "../components/ui"
import { club, mission, stats } from "../data/club"
import { coaches } from "../data/coaches"
import { events } from "../data/events"
import { unsplash } from "../data/photos"
import { featuredSports, sports } from "../data/sports"
import { usePageTitle } from "../hooks/usePageTitle"
import { upcomingEvents } from "../utils/dates"

const steps = [
  {
    title: "Pick a plan",
    text: "Junior, adult, family, or elite. Prices are monthly and confirmed at the desk.",
  },
  {
    title: "Name your sport",
    text: "Start with one. Club Active and above can add a second sport in the same season.",
  },
  {
    title: "Come to induction",
    text: "The first session is free. You meet the coach, see the campus, and then decide.",
  },
]

export default function Home() {
  usePageTitle("Home")
  const nextEvents = upcomingEvents(events).slice(0, 3)
  const nextEvent = nextEvents[0]
  const leadCoaches = coaches.slice(0, 3)

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-cream">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <img
            src={unsplash("photo-1508098682722-e99c43a406b2", 2000)}
            alt=""
            className="hero-bg-drift h-full w-full object-cover opacity-80"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/50" />
        </div>
        <div className={`${shell} relative grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16`}>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Est. {club.founded} · {club.city}
            </p>
            <h1 className="mt-4 max-w-xl text-[2.65rem] font-bold leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
              Five sports. One club. A coach who knows your name.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
              {club.name} is {club.city}’s home for cricket, football, basketball, badminton, and tennis.
              Coached sessions in the week. Fixtures on the weekend. Membership that can cover more than one sport.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/membership" className={btnPrimary}>
                Join Now
              </Link>
              <a href="#activities" className={btnGhostLight}>
                See activities
              </a>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5">
              {stats.map((item) => (
                <div key={item.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mist">{item.label}</dt>
                  <dd className="mt-1 font-display text-3xl font-bold leading-none text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="min-w-0">
            <HeroGallery />
          </div>
        </div>
      </section>

      {nextEvent ? (
        <Link to="/events" className="block bg-ember text-ink">
          <span className={`${shell} flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between`}>
            <span className="text-sm font-bold sm:text-base">
              Next up: {nextEvent.title} · {nextEvent.venue}
            </span>
            <span className="text-sm font-bold">See the fixture list</span>
          </span>
        </Link>
      ) : null}

      <section id="activities" className={`${shell} scroll-mt-28 py-16 sm:py-20`}>
        <SectionHeading
          eyebrow="Featured sports activities"
          title="What you can play this week"
          action={
            <Link to="/sports" className="text-sm font-bold text-emberdeep">
              All sports and activities
            </Link>
          }
        >
          Three of the club programs fill the calendar first. Badminton and tennis run alongside them in the hall and on the floodlit courts.
        </SectionHeading>
        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredSports.map((sport, index) => (
            <Link
              key={sport.slug}
              to={`/sports#${sport.slug}`}
              className={`group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ink/10 ${
                index === 2 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Photo
                  src={sport.image}
                  alt={sport.imageAlt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emberdeep">{sport.level}</p>
                <h3 className="mt-2 text-4xl font-bold leading-none">{sport.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">{sport.summary}</p>
                <span className="mt-4 inline-block text-sm font-bold text-ink">View activity</span>
              </div>
            </Link>
          ))}
        </div>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {sports
            .filter((sport) => !sport.featured)
            .map((sport) => (
              <li key={sport.slug}>
                <Link
                  to={`/sports#${sport.slug}`}
                  className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 ring-1 ring-ink/10"
                >
                  <span className="min-w-0">
                    <span className="block text-2xl font-bold leading-none">{sport.name}</span>
                    <span className="mt-1 block text-sm text-ink/65">{sport.summary}</span>
                  </span>
                  <span className="ml-4 shrink-0 text-sm font-bold text-emberdeep">View</span>
                </Link>
              </li>
            ))}
        </ul>
      </section>

      <section className="bg-white">
        <div className={`${shell} grid items-center gap-10 py-16 lg:grid-cols-2 sm:py-20`}>
          <div className="overflow-hidden rounded-3xl">
            <Photo
              src={unsplash("photo-1461896836934-ffe607ba6851")}
              alt="Athletes training together on a track"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div>
            <SectionHeading eyebrow="The club" title={`Playing in ${club.city} since ${club.founded}`}>
              {mission}
            </SectionHeading>
            <p className="mt-4 text-base leading-relaxed text-ink/75">
              People join for a first hit, a school holiday camp, or a weekend league. The standard is the same:
              you are coached, you get a game, and someone at the desk knows which session you booked.
            </p>
            <Link to="/about" className={`${btnInk} mt-6`}>
              About the club
            </Link>
          </div>
        </div>
      </section>

      <section className={`${shell} py-16 sm:py-20`}>
        <SectionHeading eyebrow="How joining works" title="Three steps, then a first session" />
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-3xl bg-white p-6 ring-1 ring-ink/10">
              <p className="font-display text-4xl font-bold leading-none text-ember">0{index + 1}</p>
              <h3 className="mt-4 text-3xl font-bold leading-none">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-sand/60">
        <div className={`${shell} py-16 sm:py-20`}>
          <SectionHeading
            eyebrow="Events and tournaments"
            title="Coming up on campus"
            action={
              <Link to="/events" className="text-sm font-bold text-emberdeep">
                Full event list
              </Link>
            }
          >
            Members hear first. Guest places are listed on each fixture.
          </SectionHeading>
          <div className="mt-8 grid gap-4">
            {nextEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className={`${shell} py-16 sm:py-20`}>
        <SectionHeading
          eyebrow="Coaches and trainers"
          title="Lead coaches"
          action={
            <Link to="/coaches" className="text-sm font-bold text-emberdeep">
              All coach profiles
            </Link>
          }
        >
          Thirty-eight coaches work across the campus. These three lead cricket, football, and basketball.
        </SectionHeading>
        <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {leadCoaches.map((coach) => (
            <Link key={coach.id} to={`/coaches#${coach.id}`} className="flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ink/10">
              <Photo src={coach.image} alt={coach.imageAlt} className="aspect-square w-full object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emberdeep">{coach.sport}</p>
                <h3 className="mt-2 text-3xl font-bold leading-none">{coach.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {coach.seasons} seasons · {coach.specialization}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className={`${shell} flex flex-col gap-6 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20`}>
          <div>
            <h2 className="text-5xl font-bold leading-[0.95]">Ready for the next session?</h2>
            <p className="mt-3 max-w-xl text-mist">
              Choose a plan and a sport. The membership desk confirms an induction before any payment is taken.
            </p>
          </div>
          <Link to="/membership" className={`${btnPrimary} shrink-0`}>
            Join Now
          </Link>
        </div>
      </section>
    </>
  )
}
