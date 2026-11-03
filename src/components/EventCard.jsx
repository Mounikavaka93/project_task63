import { Link } from "react-router-dom"
import { dayLabel, formatRange, monthLabel, relativeDay } from "../utils/dates"
import { btnInk } from "./ui"

export default function EventCard({ event, now }) {
  const label = relativeDay(event.start, now)
  const finished = label === "Completed"

  return (
    <article className={`rounded-3xl bg-white p-4 ring-1 ring-ink/10 sm:p-5 ${finished ? "opacity-70" : ""}`}>
      <div className="flex gap-4">
        <div className="w-[76px] shrink-0 rounded-2xl bg-ink py-3 text-center text-cream">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
            {monthLabel(event.start)}
          </p>
          <p className="font-display text-4xl font-bold leading-none">{dayLabel(event.start)}</p>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emberdeep">{event.sport}</p>
            <p className="text-xs font-semibold text-ink/60">{label}</p>
          </div>
          <h3 className="mt-1 text-3xl font-bold leading-none">{event.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/75">{event.summary}</p>
          <dl className="mt-3 grid gap-1 text-sm text-ink sm:grid-cols-2">
            <div>
              <dt className="sr-only">When</dt>
              <dd>
                {formatRange(event.start, event.end)} · {event.time}
              </dd>
            </div>
            <div>
              <dt className="sr-only">Where</dt>
              <dd>{event.venue}</dd>
            </div>
            <div>
              <dt className="sr-only">Fee</dt>
              <dd className="font-semibold">{event.fee}</dd>
            </div>
            <div>
              <dt className="sr-only">Entry</dt>
              <dd>{event.entry}</dd>
            </div>
          </dl>
          {finished ? (
            <p className="mt-4 text-sm font-semibold text-ink/60">This event has finished.</p>
          ) : (
            <Link
              className={`${btnInk} mt-4 px-4 py-2`}
              to={`/contact?subject=${encodeURIComponent(event.title)}#contact-form`}
            >
              Ask about entry
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
