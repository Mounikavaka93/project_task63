export default function FilterBar({ label, value, options, onChange }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = value === option
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option)}
            className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${
              selected
                ? "bg-ink text-cream"
                : "bg-white text-ink ring-1 ring-ink/10 hover:ring-ink/30"
            }`}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
