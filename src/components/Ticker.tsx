import { useState } from "react"
import { Pause, Play } from "lucide-react"

import { MAPS_URL, PHONE } from "@/data/site"

const itemClass = "ticker-item relative flex flex-[1_0_auto] items-center justify-center px-[34px]"
const linkClass = "text-inherit no-underline underline-offset-[3px] hover:underline focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"

function Messages({ copy }: { copy?: boolean }) {
  // The loop needs two copies; the second is decorative and skipped by keyboards and screen readers
  const skip = copy ? { tabIndex: -1 } : {}
  return (
    <ul
      className="ticker-group m-0 flex min-w-[calc(100vw+20rem)] flex-none list-none items-center p-0 text-[0.98rem] font-semibold whitespace-nowrap"
      aria-hidden={copy || undefined}
    >
      <li className={itemClass}>
        <a
          href="#quote"
          className="rounded-full bg-charcoal px-4 pt-[5px] pb-1.5 font-display text-[1.2rem] leading-none font-extrabold tracking-[-0.005em] text-bone no-underline font-narrow hover:underline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-bone"
          {...skip}
        >
          Now catering events, big and small
        </a>
      </li>
      <li className={itemClass}>
        <a href={MAPS_URL} className={linkClass} {...skip}>6732 Elmwood Ave, Philadelphia, PA</a>
      </li>
      <li className={itemClass}>Our home is being renovated into a full sit&#8209;down restaurant</li>
      <li className={itemClass}>
        <a href={`tel:${PHONE}`} className={linkClass} {...skip}>Book us: (610) 256&#8209;9268</a>
      </li>
    </ul>
  )
}

/** The catering announcement: loops along the top, pinned above the header */
export function Ticker() {
  const [paused, setPaused] = useState(false)
  return (
    <aside
      className="ticker sticky top-0 z-[21] flex h-[var(--ticker-h)] items-center bg-ember text-charcoal"
      aria-label="Catering and our location"
      data-paused={paused}
    >
      <div className="ticker-window min-w-0 flex-1 overflow-hidden">
        <div className="ticker-track flex w-max animate-ticker">
          <Messages />
          <Messages copy />
        </div>
      </div>
      <button
        type="button"
        className="ticker-toggle mr-2.5 ml-1.5 grid size-8 flex-none cursor-pointer place-items-center rounded-full border-0 bg-charcoal text-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
        aria-pressed={paused}
        aria-label="Pause announcement"
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? <Play aria-hidden="true" className="size-3.5 fill-current" /> : <Pause aria-hidden="true" className="size-3.5 fill-current" />}
      </button>
    </aside>
  )
}
