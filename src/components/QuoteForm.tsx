import { useEffect, useRef, useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect } from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { EMAIL, FOODS, PHONE, PHONE_DISPLAY } from "@/data/site"

// FormSubmit forwards each request to the inbox below. The first request ever
// sent triggers a one-time activation email that must be confirmed.
const ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`

const ERRORS = {
  name: "Add your name so we know who to reply to.",
  phone: "Add a phone number we can reach you on.",
  email: "Check the email address, or leave it blank.",
  date: "Pick the date of your event.",
  guests: "Add roughly how many people you're feeding.",
} as const
type Checked = keyof typeof ERRORS
const CHECKED: Checked[] = ["name", "phone", "date", "guests", "email"]

function formatDate(value: string) {
  const d = new Date(`${value}T12:00:00`)
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
}

const optional = <span className="ml-1.5 text-[0.85rem] text-[#8d8473]">Optional</span>

export function QuoteForm({ foods, onFoodsChange }: { foods: string[]; onFoodsChange: (foods: string[]) => void }) {
  const formRef = useRef<HTMLFormElement>(null)
  const sentRef = useRef<HTMLDivElement>(null)
  const failRef = useRef<HTMLDivElement>(null)
  const [invalid, setInvalid] = useState<Partial<Record<Checked, boolean>>>({})
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle")
  const [requestText, setRequestText] = useState("")
  const [copied, setCopied] = useState(false)
  const [minDate, setMinDate] = useState<string>()

  useEffect(() => {
    const today = new Date()
    setMinDate(new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10))
  }, [])
  useEffect(() => {
    if (status === "sent") sentRef.current?.focus()
    if (status === "failed") failRef.current?.focus()
  }, [status])

  const field = (name: Checked) => formRef.current?.elements.namedItem(name) as HTMLInputElement | null

  const check = (name: Checked) => {
    const input = field(name)
    if (!input) return true
    const empty = input.value.trim() === ""
    const ok = input.required ? !empty && input.checkValidity() : empty || input.checkValidity()
    setInvalid((prev) => ({ ...prev, [name]: !ok }))
    return ok
  }

  // Re-check on blur once a field has been flagged, and clear as soon as it's fixed
  const recheck = (name: Checked) => ({
    onBlur: () => invalid[name] !== undefined && check(name),
    onInput: () => invalid[name] && check(name),
    "aria-invalid": invalid[name] || undefined,
    "aria-describedby": invalid[name] ? `q-${name}-err` : undefined,
  })

  const errorFor = (name: Checked) =>
    invalid[name] && (
      <p className="mt-1.5 text-[0.9rem] text-[#f5a58a]" id={`q-${name}-err`}>
        {ERRORS[name]}
      </p>
    )

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const f = form.elements as unknown as Record<string, HTMLInputElement>
    if (f._honey.value) return

    const firstBad = CHECKED.find((name) => !check(name))
    if (firstBad) {
      CHECKED.forEach(check)
      field(firstBad)?.focus()
      return
    }

    const data: Record<string, string> = {
      Name: f.name.value.trim(),
      Phone: f.phone.value.trim(),
      Email: f.email.value.trim(),
      "Event date": formatDate(f.date.value),
      Guests: f.guests.value,
      "Type of event": f.type.value,
      Where: f.where.value.trim(),
      Food: foods.join(", "),
      Notes: f.notes.value.trim(),
    }
    Object.keys(data).forEach((k) => !data[k] && delete data[k])
    const text = ["Catering request for FD Grill", ...Object.entries(data).map(([k, v]) => `${k}: ${v}`)].join("\n")

    setStatus("sending")
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: `Catering request: ${data.Name}, ${data["Event date"]}, ${data.Guests} guests`,
          _template: "table",
          _captcha: "false",
          ...(data.Email ? { _replyto: data.Email } : {}),
        }),
      })
      const body = await res.json()
      if (!res.ok || String(body.success) !== "true") throw new Error(body.message || "Not sent")
      form.reset()
      onFoodsChange([])
      setInvalid({})
      setStatus("sent")
    } catch {
      setRequestText(text)
      setStatus("failed")
    }
  }

  async function copyRequest() {
    try {
      await navigator.clipboard.writeText(requestText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      document.getElementById("quote-text")?.focus()
      ;(document.getElementById("quote-text") as HTMLTextAreaElement | null)?.select()
    }
  }

  const subject = encodeURIComponent(`Catering request: ${requestText.match(/Event date: (.*)/)?.[1] ?? ""}`)
  const body = encodeURIComponent(requestText)

  return (
    <form
      ref={formRef}
      id="quote-form"
      noValidate
      onSubmit={onSubmit}
      className="-mx-[calc(clamp(28px,5vw,64px)-8px)] rounded-lg bg-charcoal-2 p-[clamp(22px,3.5vw,36px)] md:mx-0"
    >
      <h3 className="mb-6 text-[clamp(1.9rem,3.2vw,2.6rem)] font-extrabold font-narrow">Request a quote</h3>

      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
        <div className="mb-[18px] min-w-0">
          <Label htmlFor="q-name">Your name</Label>
          <Input id="q-name" name="name" type="text" autoComplete="name" enterKeyHint="next" required {...recheck("name")} />
          {errorFor("name")}
        </div>
        <div className="mb-[18px] min-w-0">
          <Label htmlFor="q-phone">Phone</Label>
          <Input id="q-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" enterKeyHint="next" required {...recheck("phone")} />
          {errorFor("phone")}
        </div>
      </div>

      <div className="mb-[18px]">
        <Label htmlFor="q-email">Email {optional}</Label>
        <Input id="q-email" name="email" type="email" autoComplete="email" inputMode="email" enterKeyHint="next" {...recheck("email")} />
        {errorFor("email")}
      </div>

      <div className="grid grid-cols-2 gap-x-4">
        <div className="mb-[18px] min-w-0">
          <Label htmlFor="q-date">Event date</Label>
          <Input id="q-date" name="date" type="date" min={minDate} required {...recheck("date")} />
          {errorFor("date")}
        </div>
        <div className="mb-[18px] min-w-0">
          <Label htmlFor="q-guests">Guests</Label>
          <Input id="q-guests" name="guests" type="number" min={1} inputMode="numeric" required {...recheck("guests")} />
          {errorFor("guests")}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
        <div className="mb-[18px] min-w-0">
          <Label htmlFor="q-type">Type of event</Label>
          <NativeSelect id="q-type" name="type" defaultValue="">
            <option value="">Choose one</option>
            <option>Birthday or family party</option>
            <option>Family reunion or cookout</option>
            <option>Wedding or celebration</option>
            <option>Office lunch or meeting</option>
            <option>Church or community event</option>
            <option>Something else</option>
          </NativeSelect>
        </div>
        <div className="mb-[18px] min-w-0">
          <Label htmlFor="q-where">Where is it?</Label>
          <Input id="q-where" name="where" type="text" placeholder="Neighborhood or town" />
        </div>
      </div>

      <div className="mb-[18px]">
        <p id="q-food-label" className="mb-1.5 text-[0.95rem] font-medium text-bone-soft">
          What would you like to serve?
        </p>
        <ToggleGroup type="multiple" variant="ember" value={foods} onValueChange={onFoodsChange} aria-labelledby="q-food-label" className="gap-2">
          {FOODS.map((food) => (
            <ToggleGroupItem key={food} value={food}>
              {food}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="mb-[18px]">
        <Label htmlFor="q-notes">Anything else? {optional}</Label>
        <Textarea id="q-notes" name="notes" rows={3} placeholder="Allergies, timing, serving style" />
      </div>

      {/* Spam trap: people never see or fill this */}
      <p className="absolute -left-[9999px] size-px overflow-hidden" aria-hidden="true">
        <label>
          Leave this empty <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <Button type="submit" size="block" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send request"}
      </Button>
      <p className="mt-2.5 text-[0.9rem] text-bone-soft">Your request goes straight to our inbox. We'll reply by phone or email.</p>

      {status === "sent" && (
        <div ref={sentRef} tabIndex={-1} role="status" className="mt-[22px] rounded-md border-l-[3px] border-ember bg-ember/8 p-5 focus:outline-none">
          <h4 className="mb-1.5 text-2xl font-semi-narrow">Request sent</h4>
          <p className="text-bone-soft">
            Thank you for thinking of us. We've got your details and will be in touch soon to plan your menu. If it's
            urgent, call or text{" "}
            <a href={`tel:${PHONE}`} className="font-bold text-bone">{PHONE_DISPLAY}</a>.
          </p>
        </div>
      )}

      {status === "failed" && (
        <div ref={failRef} tabIndex={-1} role="alert" className="mt-[22px] rounded-md border-l-[3px] border-[#f5a58a] bg-[#f5a58a]/8 p-5 focus:outline-none">
          <h4 className="mb-1.5 text-2xl font-semi-narrow">We couldn't send that just now</h4>
          <p className="text-bone-soft">
            Your details are below. Email them to{" "}
            <a href={`mailto:${EMAIL}?subject=${subject}&body=${body}`} className="font-bold text-bone">{EMAIL}</a> or text them to{" "}
            <a href={`sms:${PHONE}?&body=${body}`} className="font-bold text-bone">{PHONE_DISPLAY}</a>.
          </p>
          <Textarea id="quote-text" rows={7} readOnly aria-label="Your catering request" value={requestText} className="mt-3.5 mb-3 text-[0.95rem]" />
          <Button type="button" variant="outline" onClick={copyRequest} className="cursor-pointer bg-transparent text-bone">
            {copied ? "Copied" : "Copy request"}
          </Button>
        </div>
      )}
    </form>
  )
}
