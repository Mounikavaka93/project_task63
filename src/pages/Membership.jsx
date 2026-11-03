import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { FormErrorSummary, SelectField, SuccessBanner, TextField } from "../components/Fields"
import PageHeader from "../components/PageHeader"
import PlanCard from "../components/PlanCard"
import SectionHeading from "../components/SectionHeading"
import { btnInk, shell } from "../components/ui"
import { club, guidelines, sharedBenefits } from "../data/club"
import { isPlanId, plans } from "../data/plans"
import { isSportSlug, sports } from "../data/sports"
import { usePageTitle } from "../hooks/usePageTitle"
import { useValidatedForm } from "../hooks/useValidatedForm"
import { emptyMembership, validateMembership } from "../utils/validate"

function makeReference() {
  const number = Math.floor(10000 + Math.random() * 90000)
  return `${club.code}-${number}`
}

function localDateInputValue(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

const maxDob = localDateInputValue(new Date())

export default function Membership() {
  usePageTitle("Membership")
  const [params] = useSearchParams()
  const planParam = params.get("plan")
  const sportParam = params.get("sport")
  const form = useValidatedForm(
    emptyMembership({
      plan: isPlanId(planParam) ? planParam : "",
      sport: isSportSlug(sportParam) ? sportParam : "",
    }),
    validateMembership,
  )
  const { setValues, notice } = form
  const selected = plans.find((plan) => plan.id === form.values.plan)

  useEffect(() => {
    if (!planParam && !sportParam) return
    setValues((current) => ({
      ...current,
      ...(isPlanId(planParam) ? { plan: planParam } : {}),
      ...(isSportSlug(sportParam) ? { sport: sportParam } : {}),
    }))
  }, [planParam, sportParam, setValues])

  useEffect(() => {
    if (!notice) return
    document.getElementById("membership-success")?.focus()
  }, [notice])

  function choosePlan(planId) {
    form.update("plan", planId)
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      <PageHeader eyebrow="Membership" title="Plans with a price, and a form the desk actually reads.">
        Nothing is charged on this page. Send a request, come to a free induction, and pay at the lounge when you are ready to start.
      </PageHeader>

      <section id="plans" className={`${shell} scroll-mt-28 py-16 sm:py-20`}>
        <SectionHeading eyebrow="Pricing" title="Choose the plan that matches who is playing">
          Prices are per month. The family plan covers up to four named people in one household.
        </SectionHeading>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              selected={form.values.plan === plan.id}
              onSelect={choosePlan}
            />
          ))}
        </div>
        <div className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-ink/10 sm:p-8">
          <h2 className="text-3xl font-bold leading-none">Included with every plan</h2>
          <ul className="mt-4 grid gap-2 text-sm text-ink/80 sm:grid-cols-2">
            {sharedBenefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="register" className="scroll-mt-28 bg-white">
        <div className={`${shell} grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] sm:py-20`}>
          <div>
            <SectionHeading
              eyebrow="Registration"
              title={selected ? `Request ${selected.name}` : "Request a membership"}
            >
              Use the member’s name and date of birth. A parent can submit the form for a junior.
            </SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              The desk replies by email within two working days with induction times. Questions before that can go through the{" "}
              <Link className="font-semibold text-emberdeep" to="/contact">
                contact form
              </Link>
              .
            </p>
            <details className="mt-6 rounded-2xl bg-cream p-4 text-sm leading-relaxed text-ink/80">
              <summary className="font-semibold text-ink">Club guidelines</summary>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                {guidelines.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </details>
          </div>

          <div>
            {form.notice ? (
              <div className="mb-6">
                <SuccessBanner
                  id="membership-success"
                  title="Request received"
                  onDismiss={() => form.setNotice(null)}
                >
                  <p>
                    Your reference is <strong>{form.notice.reference}</strong>. The membership desk will email{" "}
                    {form.notice.email} about {form.notice.plan}. Keep the reference for induction day.
                  </p>
                </SuccessBanner>
              </div>
            ) : null}

            <form
              className="space-y-5"
              noValidate
              onSubmit={(event) =>
                form.handleSubmit(event, (values) => {
                  const planName = plans.find((plan) => plan.id === values.plan)?.name ?? "membership"
                  form.setNotice({
                    reference: makeReference(),
                    email: values.email.trim(),
                    plan: planName,
                  })
                  form.reset(emptyMembership())
                })
              }
            >
              <p className="text-sm text-ink/60">Required fields are marked *.</p>
              <FormErrorSummary errors={form.errors} />
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  id="fullName"
                  name="fullName"
                  label="Member name"
                  required
                  autoComplete="name"
                  maxLength={60}
                  value={form.values.fullName}
                  error={form.errors.fullName}
                  hint="The person who will attend sessions."
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
                <TextField
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  label="Phone"
                  required
                  autoComplete="tel"
                  maxLength={20}
                  placeholder="(555) 014-2290"
                  value={form.values.phone}
                  error={form.errors.phone}
                  onChange={(event) => form.update("phone", event.target.value)}
                />
                <TextField
                  id="dob"
                  name="dob"
                  type="date"
                  label="Date of birth"
                  required
                  autoComplete="bday"
                  max={maxDob}
                  value={form.values.dob}
                  error={form.errors.dob}
                  onChange={(event) => form.update("dob", event.target.value)}
                />
                <SelectField
                  id="plan"
                  name="plan"
                  label="Membership plan"
                  required
                  placeholder="Select a plan"
                  value={form.values.plan}
                  error={form.errors.plan}
                  options={plans.map((plan) => ({
                    value: plan.id,
                    label: `${plan.name} — $${plan.price}/month`,
                  }))}
                  onChange={(event) => form.update("plan", event.target.value)}
                />
                <SelectField
                  id="sport"
                  name="sport"
                  label="Primary sport"
                  required
                  placeholder="Select a sport"
                  value={form.values.sport}
                  error={form.errors.sport}
                  options={sports.map((sport) => ({ value: sport.slug, label: sport.name }))}
                  onChange={(event) => form.update("sport", event.target.value)}
                />
              </div>
              <TextField
                id="emergency"
                name="emergency"
                label="Emergency contact"
                required
                autoComplete="off"
                maxLength={60}
                value={form.values.emergency}
                error={form.errors.emergency}
                hint="Someone the coach can call if you are injured in a session."
                onChange={(event) => form.update("emergency", event.target.value)}
              />
              <div>
                <label className="flex items-start gap-3 text-sm leading-relaxed text-ink/80" htmlFor="terms">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={form.values.terms}
                    aria-invalid={Boolean(form.errors.terms)}
                    aria-describedby={form.errors.terms ? "terms-error" : undefined}
                    onChange={(event) => form.update("terms", event.target.checked)}
                    className="mt-1 h-4 w-4 accent-emberdeep"
                  />
                  <span>I agree to the club guidelines and understand this request is confirmed by the desk.</span>
                </label>
                {form.errors.terms ? (
                  <p id="terms-error" className="mt-1.5 text-sm font-medium text-red-700">
                    {form.errors.terms}
                  </p>
                ) : null}
              </div>
              <button type="submit" className={btnInk}>
                Request membership
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
