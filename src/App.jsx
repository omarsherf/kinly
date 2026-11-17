import { useStore, usePrivateJournal } from './store.js'
import Journal from './screens/Journal.jsx'
import Permissions from './screens/Permissions.jsx'
import Settings from './screens/Settings.jsx'
import Kareem from './screens/Kareem.jsx'
import Nadia from './screens/Nadia.jsx'

const GROUPS = [
  { label: 'Sara', items: [['journal', 'Journal'], ['share', 'Who can help'], ['settings', 'Settings']] },
  { label: 'Recipients', items: [['kareem', 'Kareem'], ['nadia', 'Tante Nadia']] },
]

export default function App() {
  const [s, patch, resetShared] = useStore()
  const [journal, setJournal] = usePrivateJournal()
  const go = (screen) => patch({ screen })
  const reset = () => { resetShared(); setJournal('') }

  const props = { s, patch, go }
  const view = {
    journal: <Journal {...props} journal={journal} setJournal={setJournal} />,
    share: <Permissions {...props} />,
    settings: <Settings {...props} />,
    kareem: <Kareem {...props} />,
    nadia: <Nadia {...props} />,
  }[s.screen] ?? <Journal {...props} journal={journal} setJournal={setJournal} />

  return (
    <div className="flex min-h-screen flex-col bg-[#efecf0]">
      <nav aria-label="Prototype screens" className="sticky top-0 z-10 flex shrink-0 items-center gap-4 overflow-x-auto border-b border-line bg-white px-3 py-2">
        {GROUPS.map((g) => (
          <div key={g.label} role="group" aria-label={g.label} className="flex shrink-0 items-center gap-1">
            <span className="px-1 text-[11px] font-semibold text-faint">{g.label}</span>
            {g.items.map(([id, label]) => (
              <button key={id} type="button" aria-current={s.screen === id ? 'page' : undefined} onClick={() => go(id)}
                className={`h-8 shrink-0 rounded-full px-3 text-[12px] font-semibold transition ${s.screen === id ? 'bg-brand text-white' : 'text-body hover:bg-tint'}`}>{label}</button>
            ))}
          </div>
        ))}
        <button type="button" onClick={reset} className="ml-auto h-8 shrink-0 rounded-full px-3 text-[12px] font-semibold text-brand underline">Reset demo</button>
      </nav>
      <div className="flex flex-1 items-start justify-center md:py-8">
        <div key={s.screen} className="min-h-[calc(100vh-49px)] w-full max-w-[390px] overflow-hidden bg-page md:min-h-[844px] md:rounded-[32px] md:border md:border-line md:shadow-sm">
          {view}
        </div>
      </div>
    </div>
  )
}
