import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { FormErrorSummary, SuccessBanner, TextAreaField, TextField } from "../components/Fields"
import PageHeader from "../components/PageHeader"
import { btnInk, shell } from "../components/ui"
import { club } from "../data/club"
import { usePageTitle } from "../hooks/usePageTitle"
import { useValidatedForm } from "../hooks/useValidatedForm"
import { emptyContact, validateContact } from "../utils/validate"

export default function Contact() {
  usePageTitle("Contact")
  const [params] = useSearchParams()
  const subjectParam = params.get("subject")?.slice(0, 80) ?? ""
  const form = useValidatedForm(emptyContact({ subject: subjectParam }), validateContact)
  const { setValues, notice } = form

  useEffect(() => {
    if (!subjectParam) return
    setValues((current) => ({ ...current, subject: subjectParam }))
  }, [subjectParam, setValues])

  useEffect(() => {
    if (!notice) return
    document.getElementById("contact-success")?.focus()
  }, [notice])

  return (
    <>
      <PageHeader eyebrow="Contact us" title="Write to the desk. A person replies.">
        Membership, court bookings, school visits, and event entry all come through the same lounge desk.
      </PageHeader>

      <section id="contact-form" className={`${shell} scroll-mt-28 grid gap-8 py-16 lg:grid-cols-[1.15fr_0.85fr] sm:py-20`}>
        <div>
          {form.notice ? (
            <div className="mb-6">
              <SuccessBanner id="contact-success" title="Message sent" onDismiss={() => form.setNotice(null)}>
                <p>
                  We received your note about “{form.notice.subject}”. The desk replies on club days, usually within
                  two working days, at {form.notice.email}.
                </p>
              </SuccessBanner>
            </div>
          ) : null}

          <form
            className="space-y-5 rounded-3xl bg-white p-5 ring-1 ring-ink/10 sm:p-8"
            noValidate
            onSubmit={(event) =>
              form.handleSubmit(event, (values) => {
                form.setNotice({
                  subject: values.subject.trim(),
                  email: values.email.trim(),
                })
                form.reset(emptyContact())
              })
            }
          >
            <h2 className="text-4xl font-bold leading-none">Contact form</h2>
            <p className="text-sm text-ink/60">Required fields are marked *. Phone is optional.</p>
            <FormErrorSummary errors={form.errors} />
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                id="fullName"
                name="fullName"
                label="Your name"
                required
                autoComplete="name"
                maxLength={60}
                value={form.values.fullName}
                error={form.errors.fullName}
                onChange={(event) => form.update("fullName", event.target.value)}
              />
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                required
                autoComplete="email"
                maxLength={80}
                value={form.values.email}
                error={form.errors.email}
                onChange={(event) => form.update("email", event.target.value)}
              />
            </div>
            <TextField
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              label="Phone"
              autoComplete="tel"
              maxLength={20}
              value={form.values.phone}
              error={form.errors.phone}
              hint="Optional. Include it if you would rather be called."
              onChange={(event) => form.update("phone", event.target.value)}
            />
            <TextField
              id="subject"
              name="subject"
              label="Subject"
              required
              maxLength={80}
              value={form.values.subject}
              error={form.errors.subject}
              placeholder="Membership, a court booking, or an event"
              onChange={(event) => form.update("subject", event.target.value)}
            />
            <TextAreaField
              id="message"
              name="message"
              label="Message"
              required
              maxLength={1000}
              value={form.values.message}
              error={form.errors.message}
              hint="At least 20 characters. Mention the sport, the age group, or the event."
              onChange={(event) => form.update("message", event.target.value)}
            />
            <button type="submit" className={btnInk}>
              Send message
            </button>
          </form>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl bg-ink p-6 text-cream">
            <h2 className="text-3xl font-bold leading-none">Club desk</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Email</dt>
                <dd className="mt-1">
                  <a className="font-semibold text-white hover:text-ember" href={`mailto:${club.email}`}>
                    {club.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Phone</dt>
                <dd className="mt-1">
                  <a className="font-semibold text-white hover:text-ember" href={club.phoneHref}>
                    {club.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Location</dt>
                <dd className="mt-1 leading-relaxed">
                  {club.street}
                  <br />
                  {club.locality}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Hours</dt>
                <dd className="mt-1 space-y-1 leading-relaxed">
                  {club.hours.map((slot) => (
                    <p key={slot.label}>
                      {slot.label}: {slot.value}
                    </p>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
          <p className="text-sm leading-relaxed text-ink/70">
            The membership desk is inside the member lounge, facing the main hall. Match-day questions are answered there from 8:00am.
          </p>
        </aside>
      </section>

      <section className={`${shell} pb-16 sm:pb-20`}>
        <div className="overflow-hidden rounded-3xl ring-1 ring-ink/10">
          <iframe
            title={`Map of ${club.name} at ${club.street}, ${club.city}`}
            src={club.mapEmbed}
            className="h-80 w-full border-0 sm:h-96"
            loading="lazy"
          />
        </div>
        <p className="mt-3 text-sm text-ink/70">
          Training campus on Riverside Drive.{" "}
          <a className="font-semibold text-emberdeep" href={club.mapLink} target="_blank" rel="noreferrer">
            Open the map
          </a>
        </p>
      </section>
    </>
  )
}
