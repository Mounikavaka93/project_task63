export function daysUntil(iso, now = new Date()) {
  const target = new Date(`${iso}T00:00:00`)
  const today = new Date(now)
  today.setHours(0, 0, 0, 0)
  target.setHours(0, 0, 0, 0)
  return Math.round((target.getTime() - today.getTime()) / 86400000)
}

export function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function formatRange(start, end) {
  if (start === end) return formatDate(start)
  const startText = new Date(`${start}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
  return `${startText} – ${formatDate(end)}`
}

export function monthLabel(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short" })
}

export function dayLabel(iso) {
  return String(new Date(`${iso}T00:00:00`).getDate())
}

export function relativeDay(iso, now = new Date()) {
  const days = daysUntil(iso, now)
  if (days < 0) return "Completed"
  if (days === 0) return "Today"
  if (days === 1) return "Tomorrow"
  return `In ${days} days`
}

export function upcomingEvents(list, now = new Date()) {
  return list
    .filter((event) => daysUntil(event.start, now) >= 0)
    .sort((a, b) => a.start.localeCompare(b.start))
}
