import { useState } from 'react'
import { Screen, Header, TextLink, HelpChip } from '../ui.jsx'
import { TIMES } from '../copy.js'

const CONTACTS = ['Kareem', 'Tante Nadia']
const card = 'flex flex-col gap-3 rounded-[16px] border border-line bg-white p-[18px]'

export default function Settings({ s, patch, go }) {
  const [editMsg, setEditMsg] = useState(false)
  const [draft, setDraft] = useState('')
  const [editTime, setEditTime] = useState(false)
  const nextContact = CONTACTS[(CONTACTS.indexOf(s.checkinTo) + 1) % CONTACTS.length]

  return (
    <Screen>
      <Header title="Your sharing settings" onBack={() => go('journal')} gap="gap-[10px]" sub="You decide what gets shared and when" />

      <section className={card}>
        <h2 className="text-[16px] font-semibold leading-6 text-ink">{s.paused ? 'Help requests are paused' : 'Help requests are enabled'}</h2>
        <p className="text-[11px] font-medium leading-[22px] text-body">
          {s.paused ? 'No new requests can be sent until you resume' : 'You choose when to send a request and who receives it'}
        </p>
        <TextLink onClick={() => patch({ paused: !s.paused })}>{s.paused ? 'Resume new requests' : 'Pause new requests'}</TextLink>
      </section>

      <section className={card}>
        <div className="flex h-[26px] items-center gap-3">
          <h2 className="flex-1 text-[16px] font-semibold leading-6 text-ink">Optional safety check-in</h2>
          <button type="button" role="switch" aria-checked={s.checkinOn} aria-label="Optional safety check-in"
            onClick={() => patch({ checkinOn: !s.checkinOn })}
            className={`relative h-[26px] w-11 shrink-0 rounded-full transition-colors ${s.checkinOn ? 'bg-brand' : 'bg-btn'}`}>
            <span className={`absolute top-[3px] size-5 rounded-full bg-white shadow-sm transition-all ${s.checkinOn ? 'left-[21px]' : 'left-[3px]'}`} />
          </button>
        </div>
        <p className="text-[14px] leading-[22px] text-body">Daily prompt at {s.checkinTime}. Choosing Need space today cancels the alert and nothing is sent.</p>

        <div className="flex flex-col gap-2 rounded-[12px] bg-tint p-3">
          <div className="flex h-[22px] items-center justify-between font-semibold leading-5 text-brand">
            <div className="flex items-center gap-2 text-[12px]">
              <span>Sent to {s.checkinTo}</span>
              <button type="button" className="underline" onClick={() => patch({ checkinTo: nextContact })}>Change</button>
            </div>
            {!editMsg && <button type="button" className="text-[13px] underline" onClick={() => { setDraft(s.checkinMsg); setEditMsg(true) }}>Edit</button>}
          </div>
          {editMsg ? (
            <div className="flex flex-col gap-2">
              <textarea aria-label="Check-in message" rows={3} value={draft} onChange={(e) => setDraft(e.target.value)}
                className="w-full resize-none rounded-[10px] border border-chip bg-white p-3 text-[13px] leading-[20px] text-ink" />
              <div className="flex gap-2">
                <button type="button" disabled={!draft.trim()} onClick={() => { patch({ checkinMsg: draft.trim() }); setEditMsg(false) }}
                  className="h-9 rounded-[10px] bg-brand px-4 text-[13px] font-semibold text-white disabled:opacity-50">Save</button>
                <button type="button" onClick={() => setEditMsg(false)}
                  className="h-9 rounded-[10px] border border-btn bg-white px-4 text-[13px] font-semibold text-decline">Cancel</button>
              </div>
            </div>
          ) : (
            <p className="text-[11px] font-medium leading-[22px] text-body">{s.checkinMsg}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 text-[12px] leading-5">
          <div className="flex items-center gap-[10px] pl-[7px]">
            <span className="text-body">Daily at {s.checkinTime}</span>
            <TextLink className="text-[12px] leading-5" onClick={() => setEditTime(!editTime)}>{editTime ? 'Done' : 'Edit schedule'}</TextLink>
          </div>
          {editTime && (
            <div className="flex flex-wrap gap-2 pl-[7px]">
              {TIMES.map((t) => <HelpChip key={t} on={s.checkinTime === t} onClick={() => patch({ checkinTime: t })}>{t}</HelpChip>)}
            </div>
          )}
        </div>
      </section>

      <section className="flex items-center gap-[14px] rounded-[16px] border border-line bg-white p-[18px]">
        <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
          <h2 className="text-[14px] font-semibold leading-6 text-ink">Need someone to talk to?</h2>
          <p className="text-[11px] font-medium leading-[22px] text-body">Speak with a support professional.</p>
        </div>
        <a href="tel:16328" className="grid h-11 w-[112px] shrink-0 place-items-center rounded-[12px] border border-brand text-[12px] font-extrabold leading-5 text-brand">Call 16328</a>
      </section>
    </Screen>
  )
}
