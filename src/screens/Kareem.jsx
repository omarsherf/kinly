import { useState } from 'react'
import { Screen, Header, PrimaryBtn, DeclineBtn, TextLink, HelpChip, Confirmation } from '../ui.jsx'
import { KAREEM_HELP, BASE_TIME, TIMES, kMessage } from '../copy.js'

export default function Kareem({ s, patch }) {
  const [changing, setChanging] = useState(false)
  const time = s.kareemTime
  const info = KAREEM_HELP[s.kHelp]
  const text = kMessage(s).split(BASE_TIME).join(time)
  const undo = () => patch({ kareemReply: null })

  if (s.kareemReply === 'yes') {
    return <Confirmation title="You said yes" undoLabel="Change my answer" onUndo={undo}
      body={`Sara will see that you're ${s.kHelp === 'Baby care' ? 'taking the baby' : 'keeping her company'} at ${time}. Thank you for stepping in.`} />
  }
  if (s.kareemReply === 'no') {
    return <Confirmation title="Sara has been told" undoLabel="Change my answer" onUndo={undo}
      body="She will see that you can't tonight. No pressure." />
  }

  return (
    <Screen className="gap-8">
      <Header title="A request from Sara" sub="Received today at 5:30 PM" gap="gap-0" subClass="text-[13px] leading-5 text-faint font-normal" />
      <section className="flex flex-col gap-4">
        <div className="rounded-[16px] bg-tint p-6">
          <p className="text-[16px] leading-[26px] text-ink">{text}</p>
        </div>
        <div className="flex flex-col gap-3">
          <TextLink onClick={() => setChanging(!changing)} className="self-start text-[14px] leading-[22px]">{changing ? 'Done' : 'Change time'}</TextLink>
          {changing && (
            <div role="group" aria-label="Start time" className="flex flex-wrap gap-2">
              {TIMES.map((t) => <HelpChip key={t} on={time === t} onClick={() => patch({ kareemTime: t })}>{t}</HelpChip>)}
            </div>
          )}
        </div>
      </section>
      <div className="flex-1" />
      <div className="flex flex-col gap-3">
        <PrimaryBtn onClick={() => patch({ kareemReply: 'yes' })}>{info.cta(time)}</PrimaryBtn>
        <DeclineBtn onClick={() => patch({ kareemReply: 'no' })}>I can't tonight</DeclineBtn>
      </div>
    </Screen>
  )
}
