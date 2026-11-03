export default function PlanCard({ plan, selected, onSelect }) {
  return (
    <article
      className={`flex h-full flex-col rounded-3xl p-6 ring-1 ${
        selected ? "bg-ink text-cream ring-ember" : "bg-white text-ink ring-ink/10"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-3xl font-bold leading-none">{plan.name}</h3>
        {plan.popular ? (
          <span className="rounded-full bg-ember px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">
            Most chosen
          </span>
        ) : null}
      </div>
      <p className={`mt-3 text-sm ${selected ? "text-mist" : "text-ink/60"}`}>{plan.audience}</p>
      <p className="mt-4">
        <span className="font-display text-5xl font-bold leading-none">${plan.price}</span>
        <span className={`text-sm ${selected ? "text-mist" : "text-ink/60"}`}> / month</span>
      </p>
      <p className={`mt-4 text-sm leading-relaxed ${selected ? "text-cream/85" : "text-ink/75"}`}>
        {plan.summary}
      </p>
      <ul className="mt-5 flex-1 space-y-2 text-sm leading-relaxed">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span aria-hidden="true" className="mt-0.5 text-ember">
              ▸
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        aria-pressed={selected}
        onClick={() => onSelect(plan.id)}
        className={`mt-6 cursor-pointer rounded-md px-4 py-3 text-sm font-bold ${
          selected ? "bg-ember text-ink" : "bg-ink text-cream hover:bg-ember hover:text-ink"
        }`}
      >
        {selected ? "Selected" : "Choose this plan"}
      </button>
    </article>
  )
}
