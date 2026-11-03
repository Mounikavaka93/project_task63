export const shell = "mx-auto w-full max-w-6xl px-5 sm:px-8"

export const btnPrimary =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-ember px-5 py-3 text-sm font-bold text-ink transition hover:bg-white"

export const btnInk =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-cream transition hover:bg-ember hover:text-ink"

export const btnGhost =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-ink/15 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink"

export const btnGhostLight =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-cream transition hover:border-ember hover:bg-ember hover:text-ink"

export function fieldClass(hasError) {
  return [
    "w-full rounded-lg border bg-white px-3.5 py-3 text-sm text-ink transition placeholder:text-ink/40",
    hasError ? "border-red-600" : "border-ink/15",
  ].join(" ")
}
