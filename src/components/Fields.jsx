import { fieldClass } from "./ui"

function describedBy(id, hint, error) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined
}

function FieldLabel({ id, label, required }) {
  return (
    <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
      {label}
      {required ? <span className="text-emberdeep"> *</span> : null}
    </label>
  )
}

function FieldMessage({ id, hint, error }) {
  return (
    <>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink/60">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </>
  )
}

export function TextField({ id, label, error, hint, required, ...props }) {
  return (
    <div>
      <FieldLabel id={id} label={label} required={required} />
      <input
        {...props}
        id={id}
        aria-required={required || undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, hint, error)}
        className={fieldClass(error)}
      />
      <FieldMessage id={id} hint={hint} error={error} />
    </div>
  )
}

export function SelectField({ id, label, error, hint, required, options, placeholder, ...props }) {
  return (
    <div>
      <FieldLabel id={id} label={label} required={required} />
      <select
        {...props}
        id={id}
        aria-required={required || undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, hint, error)}
        className={fieldClass(error)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldMessage id={id} hint={hint} error={error} />
    </div>
  )
}

export function TextAreaField({ id, label, error, hint, required, ...props }) {
  return (
    <div>
      <FieldLabel id={id} label={label} required={required} />
      <textarea
        {...props}
        id={id}
        aria-required={required || undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, hint, error)}
        className={`${fieldClass(error)} min-h-36 resize-y`}
      />
      <FieldMessage id={id} hint={hint} error={error} />
    </div>
  )
}

export function FormErrorSummary({ errors }) {
  const entries = Object.entries(errors)
  if (entries.length === 0) return null

  return (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
      <p className="font-semibold">Please fix the following before sending.</p>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {entries.map(([field, message]) => (
          <li key={field}>{message}</li>
        ))}
      </ul>
    </div>
  )
}

export function SuccessBanner({ id, title, children, onDismiss }) {
  return (
    <div className="rounded-2xl border border-field/30 bg-white p-5 ring-1 ring-field/20">
      <div className="flex items-start justify-between gap-4">
        <p id={id} tabIndex={-1} className="font-display text-3xl font-bold leading-none text-ink outline-none">
          {title}
        </p>
        <button
          type="button"
          onClick={onDismiss}
          className="cursor-pointer text-sm font-semibold text-emberdeep"
        >
          Dismiss
        </button>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-ink/75">{children}</div>
    </div>
  )
}
