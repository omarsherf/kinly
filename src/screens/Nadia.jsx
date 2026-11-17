import { Screen, Header, PrimaryBtn, DeclineBtn, Confirmation } from '../ui.jsx'
import { NADIA_HELP, nMessage } from '../copy.js'

export default function Nadia({ s, patch }) {
  const info = NADIA_HELP[s.nHelp]
  const undo = () => patch({ nadiaReply: null })

  if (s.nadiaReply === 'yes') {
    return <Confirmation title="Thank you, Tante Nadia" undoLabel="Change my answer" onUndo={undo}
      body={`Sara will know that ${s.nHelp === 'Cook lunch' ? 'lunch is being cooked' : 'lunch is on its way'}.`} />
  }
  if (s.nadiaReply === 'no') {
    return <Confirmation title="Sara has been told" undoLabel="Change my answer" onUndo={undo}
      body="She will see that you can't today. No pressure." />
  }

  return (
    <Screen className="gap-10">
      <Header title="A request from Sara" sub="Received today at 11:00 AM" size="text-[25px]" gap="gap-0" subClass="text-[13px] leading-5 text-faint font-normal" />
      <section className="flex flex-col gap-7">
        <div className="rounded-[18px] bg-tint p-6">
          <p className="text-[16px] leading-[26px] text-ink2">{nMessage(s)}</p>
        </div>
        <div className="flex flex-col gap-3">
          <PrimaryBtn large onClick={() => patch({ nadiaReply: 'yes' })}>{info.cta}</PrimaryBtn>
          <DeclineBtn large onClick={() => patch({ nadiaReply: 'no' })}>I can't today</DeclineBtn>
        </div>
      </section>
    </Screen>
  )
}
