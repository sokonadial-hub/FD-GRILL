import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EMAIL } from "@/data/site"

// Same FormSubmit inbox as the quote form
const ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`

/** "Save me a seat": join the list for first word on the 2027 dining room */
export function OpeningList() {
  const [status, setStatus] = useState<"idle" | "sending" | "joined" | "failed">("idle")
  const [invalid, setInvalid] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const email = form.elements.namedItem("email") as HTMLInputElement
    const honey = form.elements.namedItem("_honey") as HTMLInputElement
    if (honey.value) return
    if (!email.value.trim() || !email.checkValidity()) {
      setInvalid(true)
      email.focus()
      return
    }
    setInvalid(false)
    setStatus("sending")
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Email: email.value.trim(),
          List: "2027 dining room opening",
          _subject: `Opening list sign-up: ${email.value.trim()}`,
          _template: "table",
          _captcha: "false",
          _replyto: email.value.trim(),
        }),
      })
      const body = await res.json()
      if (!res.ok || String(body.success) !== "true") throw new Error("Not sent")
      form.reset()
      setStatus("joined")
    } catch {
      setStatus("failed")
    }
  }

  if (status === "joined") {
    return (
      <p role="status" className="mt-9 max-w-[40ch] border-l-[3px] border-ember pl-4 text-[1.05rem] text-bone">
        You're on the list. We'll email you first when the dining room opens.
      </p>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} className="mt-9 max-w-[30rem]" aria-labelledby="seat-title">
      <h3 id="seat-title" className="text-[1.7rem] font-extrabold font-narrow">Save me a seat</h3>
      <p className="mt-1.5 mb-4 text-bone-soft">Be first to hear when the dining room opens. One email, no spam.</p>
      <Label htmlFor="seat-email">Your email</Label>
      <div className="flex flex-wrap gap-2.5">
        <Input
          id="seat-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? "seat-email-err" : undefined}
          className="min-w-0 flex-[1_1_14rem]"
        />
        <Button type="submit" disabled={status === "sending"} className="flex-none">
          {status === "sending" ? "Saving…" : "Save my seat"}
        </Button>
      </div>
      {invalid && (
        <p id="seat-email-err" className="mt-1.5 text-[0.9rem] text-[#f5a58a]">
          Add an email address so we can reach you.
        </p>
      )}
      {status === "failed" && (
        <p role="alert" className="mt-2.5 text-[0.95rem] text-bone-soft">
          We couldn't add you just now. Email{" "}
          <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Save me a seat")}`} className="font-bold text-bone">
            {EMAIL}
          </a>{" "}
          and we'll put you on the list.
        </p>
      )}
      {/* Spam trap: people never see or fill this */}
      <p className="absolute -left-[9999px] size-px overflow-hidden" aria-hidden="true">
        <label>
          Leave this empty <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
    </form>
  )
}
