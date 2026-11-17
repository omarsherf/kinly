import { useEffect, useState } from 'react'
import { Screen, MoodChip, PrimaryBtn, OutlineBtn, LockIcon, MicIcon, GearIcon } from '../ui.jsx'

const MOODS = ['Exhausted', 'Overwhelmed', 'Anxious', 'Need a pause', 'Something else']

export default function Journal({ s, patch, go, journal, setJournal }) {
  const [saved, setSaved] = useState(false)
  const [mic, setMic] = useState(false)
  useEffect(() => {
    if (!saved) return
    const t = setTimeout(() => setSaved(false), 2500)
    return () => clearTimeout(t)
  }, [saved])

  return (
    <Screen>
      <header className="flex flex-col gap-[6px]">
        <h1 className="w-[308px] max-w-full text-[26px] font-bold leading-[34px] text-ink">How are you feeling today?</h1>
        <p className="flex items-center gap-[6px] text-[13px] font-medium leading-5 text-mute">
          Private to you unless you share
          <span className="h-[14px] w-[14px]"><LockIcon /></span>
        </p>
      </header>

      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <h2 className="text-[16px] font-semibold leading-6 text-ink">Right now I feel</h2>
          <div role="group" aria-label="Right now I feel" className="flex flex-wrap gap-x-2 gap-y-[10px]">
            {MOODS.map((m) => (
              <MoodChip key={m} on={s.mood === m} onClick={() => patch({ mood: s.mood === m ? null : m })}>{m}</MoodChip>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="journal" className="text-[16px] font-semibold leading-6 text-ink">What's on your mind?</label>
          <div className="relative h-[210px] rounded-[14px] border border-line bg-white">
            <textarea id="journal" value={journal} onChange={(e) => setJournal(e.target.value)}
              placeholder="Start anywhere. You don't have to explain it perfectly."
              className="h-full w-full resize-none rounded-[14px] bg-transparent p-5 pb-14 text-[14px] leading-[23px] text-ink placeholder:text-body" />
            <button type="button" aria-label="Record a private voice note" aria-pressed={mic} onClick={() => setMic(!mic)}
              className={`absolute bottom-[11px] right-[11px] grid size-9 place-items-center rounded-full bg-tint text-brand ${mic ? 'ring-[1.5px] ring-brand' : ''}`}>
              <span className="size-5"><MicIcon /></span>
            </button>
          </div>
        </div>
      </section>

      <div className="min-h-[24px] flex-1" />
      <div className="flex flex-col gap-3">
        {saved && <p role="status" className="text-center text-[13px] font-medium text-body">Saved on this device</p>}
        <PrimaryBtn onClick={() => setSaved(true)}>Save to journal</PrimaryBtn>
        <OutlineBtn onClick={() => go('share')}>Ask someone for help</OutlineBtn>
      </div>

      <button type="button" aria-label="Open sharing settings and support" onClick={() => go('settings')}
        className="absolute right-[13px] top-[43px] grid size-11 place-items-center text-brand">
        <span className="size-[22px]"><GearIcon /></span>
      </button>
    </Screen>
  )
}
