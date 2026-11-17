import { useEffect, useState } from 'react'

const KEY = 'sara-care-prototype:v1'
const JOURNAL_KEY = 'sara-care-prototype:private-journal'

export const DEFAULTS = {
  screen: 'journal',
  mood: 'Exhausted',
  step: 'pick', // pick | review | sent
  kOn: true,
  nOn: false,
  kHelp: 'Baby care',
  nHelp: 'Cook lunch',
  edits: {}, // custom message text, keyed "k:Baby care" etc.
  paused: false,
  checkinOn: false,
  checkinTo: 'Kareem',
  checkinMsg: 'I have not checked in today. Can you check on me?',
  checkinTime: '8:00 PM',
  kareemTime: '8:00 PM',
  kareemReply: null, // null | yes | no
  nadiaReply: null,
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage unavailable */ }
}

export function useStore() {
  const [s, setS] = useState(() => ({ ...DEFAULTS, ...read(KEY, {}) }))
  useEffect(() => write(KEY, s), [s])
  const patch = (p) => setS((x) => ({ ...x, ...(typeof p === 'function' ? p(x) : p) }))
  return [s, patch, () => setS(DEFAULTS)]
}

// The journal lives under its own key. It is never part of the shared state
// and never read by the request, settings or recipient screens.
export function usePrivateJournal() {
  const [text, setText] = useState(() => read(JOURNAL_KEY, ''))
  useEffect(() => write(JOURNAL_KEY, text), [text])
  return [text, setText]
}
