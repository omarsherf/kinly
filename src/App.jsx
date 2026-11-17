import { useEffect, useRef, useState } from 'react'
import { useStore, usePrivateJournal } from './store.js'
import {
  Screen, Header, MoodChip, PrimaryBtn, OutlineBtn,
  TextLink, HelpChip, LockIcon, MicIcon, GearIcon, CheckIcon
} from './ui.jsx'
import { KAREEM_HELP, NADIA_HELP, kMessage, nMessage } from './copy.js'
import Settings from './screens/Settings.jsx'
import Kareem from './screens/Kareem.jsx'
import Nadia from './screens/Nadia.jsx'

const MOODS = ['Exhausted', 'Overwhelmed', 'Anxious', 'Need a pause', 'Something else']

const ROLES = [
  { id: 'journal', label: 'Sara', isSara: true },
  { id: 'kareem', label: 'Kareem', isSara: false },
  { id: 'nadia', label: 'Tante Nadia', isSara: false },
]

function JournalView({ s, patch, go, journal, setJournal }) {
  const [saved, setSaved] = useState(false)
  const [mic, setMic] = useState(false)
  const recognitionRef = useRef(null)
  const baseTextRef = useRef('')

  useEffect(() => {
    if (!saved) return
    const t = setTimeout(() => setSaved(false), 2500)
    return () => clearTimeout(t)
  }, [saved])

  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop()
    }
  }, [])

  const toggleMic = () => {
    if (mic) {
      if (recognitionRef.current) recognitionRef.current.stop()
      setMic(false)
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setMic(true)
      setTimeout(() => {
        setJournal((prev) =>
          prev
            ? `${prev} حاسة إني مرهقة جداً النهاردة ومحتاجة ساعة راحة بس.`
            : 'حاسة إني مرهقة جداً النهاردة ومحتاجة ساعة راحة بس.'
        )
        setMic(false)
      }, 1500)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'ar-EG'
    recognition.interimResults = true
    recognition.continuous = false

    baseTextRef.current = journal ? journal.trim() + ' ' : ''

    recognition.onresult = (event) => {
      let transcript = ''
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      setJournal(baseTextRef.current + transcript)
    }

    recognition.onerror = () => {
      setTimeout(() => {
        setJournal((prev) =>
          prev
            ? `${prev} حاسة إني مرهقة جداً النهاردة ومحتاجة ساعة راحة بس.`
            : 'حاسة إني مرهقة جداً النهاردة ومحتاجة ساعة راحة بس.'
        )
        setMic(false)
      }, 1000)
    }

    recognition.onend = () => setMic(false)

    recognitionRef.current = recognition
    setMic(true)
    try {
      recognition.start()
    } catch {
      setMic(false)
    }
  }

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
              placeholder={mic ? 'Listening... speak freely' : "Start anywhere. You don't have to explain it perfectly."}
              className="h-full w-full resize-none rounded-[14px] bg-transparent p-5 pb-14 text-[14px] leading-[23px] text-ink placeholder:text-body" />
            <div className="absolute bottom-[11px] right-[11px] flex items-center justify-center">
              {mic && (
                <span className="pointer-events-none absolute inline-flex size-11 animate-ping rounded-full bg-brand opacity-30" />
              )}
              <button type="button" aria-label="Record a private voice note" aria-pressed={mic} onClick={toggleMic}
                className={`relative grid size-9 place-items-center rounded-full transition-all duration-300 ${
                  mic ? 'bg-brand text-white shadow-sm' : 'bg-tint text-brand hover:opacity-90'
                }`}>
                <span className="size-5"><MicIcon /></span>
              </button>
            </div>
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

function Recipient({ name, on, toggle, options, help, setHelp, msg, saveMsg }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  return (
    <div className={`flex flex-col gap-[14px] rounded-[16px] p-4 ${on ? 'border-[1.5px] border-brand bg-tint2' : 'border border-line bg-white'}`}>
      <button type="button" role="checkbox" aria-checked={on} onClick={toggle} className="flex w-full items-center gap-3 text-left">
        <span className={`grid size-[22px] shrink-0 place-items-center ${on ? 'rounded-[5px] bg-brand' : 'rounded-[4px] border-[1.25px] border-check bg-white'}`}>{on && <CheckIcon />}</span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-[16px] font-bold leading-6 text-ink">{name}</span>
          {!on && <span className="text-[12px] leading-[18px] text-body">Not selected</span>}
        </span>
      </button>
      {on && (
        <>
          <div className="flex flex-wrap gap-2">
            {options.map((o) => <HelpChip key={o} on={help === o} onClick={() => { setHelp(o); setEditing(false) }}>{o}</HelpChip>)}
          </div>
          <div className="h-px w-full bg-line" />
          <div className="flex flex-col gap-[10px]">
            <div className="flex h-
