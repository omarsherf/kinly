import { Screen, Header, PrimaryBtn, OutlineBtn, TextLink, HelpChip, CheckIcon } from './src/ui.jsx'
import { KAREEM_HELP, NADIA_HELP, kMessage, nMessage } from './src/copy.js'
import { KAREEM_HELP, NADIA_HELP, kMessage, nMessage } from '../copy.js'

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
            <div className="flex h-6 items-center justify-between">
              <span className="text-[10px] font-bold leading-[18px] tracking-[0.5px] text-body">MESSAGE TO {name.toUpperCase()}</span>
              {!editing && (
                <TextLink className="px-[6px] text-[13px] font-bold leading-5" onClick={() => { setDraft(msg); setEditing(true) }}>Edit message</TextLink>
              )}
            </div>
            {editing ? (
              <div className="flex flex-col gap-2">
                <textarea aria-label={`Message to ${name}`} value={draft} onChange={(e) => setDraft(e.target.value)} rows={4}
                  className="w-full resize-none rounded-[12px] border border-chip bg-white p-3 text-[14px] leading-[22px] text-ink" />
                <div className="flex gap-2">
                  <button type="button" disabled={!draft.trim()} onClick={() => { saveMsg(draft.trim()); setEditing(false) }}
                    className="h-9 rounded-[10px] bg-brand px-4 text-[13px] font-semibold text-white disabled:opacity-50">Save message</button>
                  <button type="button" onClick={() => setEditing(false)}
                    className="h-9 rounded-[10px] border border-btn px-4 text-[13px] font-semibold text-decline">Cancel</button>
                </div>
              </div>
            ) : (
              <p className="text-[14px] leading-[22px] text-ink">{msg}</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function replyLine(s) {
  const k = s.kOn && (s.kareemReply === 'yes' ? KAREEM_HELP[s.kHelp].done(s.kareemTime) : s.kareemReply === 'no' ? "Kareem can't tonight" : 'Kareem has not replied yet')
  const n = s.nOn && (s.nadiaReply === 'yes' ? NADIA_HELP[s.nHelp].done : s.nadiaReply === 'no' ? "Tante Nadia can't today" : 'Tante Nadia has not replied yet')
  return [k, n].filter(Boolean)
}

export default function Permissions({ s, patch, go }) {
  const n = (s.kOn ? 1 : 0) + (s.nOn ? 1 : 0)
  const word = n === 1 ? 'request' : 'requests'
  const setEdit = (key) => (text) => patch((x) => ({ edits: { ...x.edits, [key]: text } }))

  if (s.step === 'sent') {
    return (
      <Screen>
        <Header title="Request sent" onBack={() => go('journal')} sub="Your private journal stays yours" />
        <div role="status" className="flex flex-col gap-3 rounded-[16px] bg-tint p-6">
          {replyLine(s).map((l) => <p key={l} className="text-[16px] leading-[26px] text-ink">{l}</p>)}
        </div>
        <div className="flex-1" />
        <div className="flex flex-col gap-3">
          {s.kOn && <OutlineBtn onClick={() => go('kareem')}>View as Kareem</OutlineBtn>}
          {s.nOn && <OutlineBtn onClick={() => go('nadia')}>View as Tante Nadia</OutlineBtn>}
          <PrimaryBtn onClick={() => patch({ step: 'pick', kareemReply: null, nadiaReply: null })}>Write another request</PrimaryBtn>
        </div>
      </Screen>
    )
  }

  if (s.step === 'review') {
    return (
      <Screen className="gap-8">
        <Header title="Review your request" onBack={() => patch({ step: 'pick' })} size="text-[25px]" sub="This is exactly what they will see" />
        <div className="flex flex-col gap-3">
          {s.kOn && (
            <div className="flex flex-col gap-2 rounded-[16px] border border-line bg-white p-4">
              <p className="text-[16px] font-bold leading-6 text-ink">Kareem</p>
              <p className="text-[14px] leading-[22px] text-ink">{kMessage(s)}</p>
            </div>
          )}
          {s.nOn && (
            <div className="flex flex-col gap-2 rounded-[16px] border border-line bg-white p-4">
              <p className="text-[16px] font-bold leading-6 text-ink">Tante Nadia</p>
              <p className="text-[14px] leading-[22px] text-ink">{nMessage(s)}</p>
            </div>
          )}
        </div>
        <div className="flex-1" />
        <PrimaryBtn onClick={() => patch({ step: 'sent', kareemReply: null, nadiaReply: null })}>Send {n} {word}</PrimaryBtn>
      </Screen>
    )
  }

  return (
    <Screen className="gap-8">
      <Header title="Who can help today?" onBack={() => go('journal')} size="text-[25px]" gap="gap-3"
        sub="Pick who to ask and edit what they see" subClass="text-[13px] leading-5 font-medium text-body" />
      <section className="flex flex-col gap-4">
        <h2 className="text-[15px] font-semibold leading-6 text-ink">Choose who receives your request</h2>
        <div className="flex flex-col gap-3">
          <Recipient name="Kareem" on={s.kOn} toggle={() => patch({ kOn: !s.kOn })} options={Object.keys(KAREEM_HELP)}
            help={s.kHelp} setHelp={(h) => patch({ kHelp: h })} msg={kMessage(s)} saveMsg={setEdit('k:' + s.kHelp)} />
          <Recipient name="Tante Nadia" on={s.nOn} toggle={() => patch({ nOn: !s.nOn })} options={Object.keys(NADIA_HELP)}
            help={s.nHelp} setHelp={(h) => patch({ nHelp: h })} msg={nMessage(s)} saveMsg={setEdit('n:' + s.nHelp)} />
        </div>
      </section>
      <div className="min-h-[24px] flex-1" />
      <div className="flex flex-col items-center gap-3">
        {s.paused && <TextLink onClick={() => go('settings')} className="text-[13px] leading-5">Resume requests in settings</TextLink>}
        <PrimaryBtn disabled={n === 0 || s.paused} onClick={() => patch({ step: 'review' })}>
          {s.paused ? 'Requests are paused' : n === 0 ? 'Choose who to ask' : `Review ${n} ${word}`}
        </PrimaryBtn>
      </div>
    </Screen>
  )
}
