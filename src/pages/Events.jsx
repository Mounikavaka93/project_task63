import { useEffect, useMemo, useState } from "react"
import FilterBar from "../components/FilterBar"
import EventCard from "../components/EventCard"
import PageHeader from "../components/PageHeader"
import { shell } from "../components/ui"
import { events } from "../data/events"
import { usePageTitle } from "../hooks/usePageTitle"
import { daysUntil } from "../utils/dates"

export default function Events() {
  usePageTitle("Events and tournaments")
  const [sport, setSport] = useState("All")
  const [clock, setClock] = useState(() => Date.now())
  const options = useMemo(() => ["All", ...new Set(events.map((event) => event.sport))], [])

  useEffect(() => {
    const id = window.setInterval(() => setClock(Date.now()), 60000)
    return () => window.clearInterval(id)
  }, [])

  const visible = useMemo(() => {
    const now = new Date(clock)
    return events
      .map((event) => ({ ...event, days: daysUntil(event.start, now) }))
      .filter((event) => event.days >= 0)
      .filter((event) => sport === "All" || event.sport === sport)
      .sort((a, b) => a.start.localeCompare(b.start))
  }, [sport, clock])

  return (
    <>
      <PageHeader eyebrow="Events and tournaments" title="Fixtures you can enter, with the date and the fee.">
        Members are placed first. Guest rules are on each event. Use “Ask about entry” and the desk will reply with a start time.
      </PageHeader>

      <section className={`${shell} py-12 sm:py-16`}>
        <h2 className="sr-only">Upcoming fixtures</h2>
        <FilterBar label="Filter events by sport" value={sport} options={options} onChange={setSport} />
        <div className="mt-8 grid gap-4">
          {visible.length === 0 ? (
            <p className="rounded-3xl bg-white px-6 py-10 text-ink/70 ring-1 ring-ink/10">
              No upcoming events match that filter. Choose All, or contact the desk and ask to be told when the next one is posted.
            </p>
          ) : (
            visible.map((event) => <EventCard key={event.id} event={event} now={clock} />)
          )}
        </div>
      </section>
    </>
  )
}
