import { useStore, usePrivateJournal } from './src/store.js'
import Journal from '../Journal.jsx'
import Permissions from '../Permissions.jsx'
import Settings from './src/screens/Settings.jsx'
import Kareem from './src/screens/Kareem.jsx'
import Nadia from './src/screens/Nadia.jsx'

const ROLES = [
  { id: 'journal', label: 'Sara', isSara: true },
  { id: 'kareem', label: 'Kareem', isSara: false },
  { id: 'nadia', label: 'Tante Nadia', isSara: false },
]

export default function App() {
  const [s, patch, resetShared] = useStore()
  const [journal, setJournal] = usePrivateJournal()
  const go = (screen) => patch({ screen })
  const reset = () => { resetShared(); setJournal('') }

  const isSaraActive = ['journal', 'share', 'settings'].includes(s.screen)

  const props = { s, patch, go }
  const view = {
    journal: <Journal {...props} journal={journal} setJournal={setJournal} />,
    share: <Permissions {...props} />,
    settings: <Settings {...props} />,
    kareem: <Kareem {...props} />,
    nadia: <Nadia {...props} />,
  }[s.screen] ?? <Journal {...props} journal={journal} setJournal={setJournal} />

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#f4f1f5] px-0 sm:px-4 sm:py-6">
      <div className="sticky top-2 z-20 mb-3 flex w-full max-w-[390px] items-center justify-between gap-2 px-3 sm:px-0">
        <div role="tablist" aria-label="Switch perspective" className="flex items-center rounded-full border border-line/80 bg-white/90 p-1 shadow-sm backdrop-blur-md">
          {ROLES.map((r) => {
            const active = r.isSara ? isSaraActive : s.screen === r.id
            return (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => go(r.id)}
                className={`rounded-full px-3 py-1 text-[12px] font-semibold transition-all ${
                  active ? 'bg-brand text-white shadow-xs' : 'text-body hover:text-ink'
                }`}
              >
                {r.label}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={reset}
          title="Reset prototype state"
          className="rounded-full border border-line/80 bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-mute shadow-sm backdrop-blur-md transition hover:text-brand"
        >
          Reset
        </button>
      </div>

      <main
        key={s.screen}
        className="relative flex min-h-[calc(100vh-56px)] w-full max-w-[390px] flex-col overflow-hidden bg-page sm:min-h-[844px] sm:rounded-[40px] sm:border-[6px] sm:border-white sm:shadow-[0_20px_50px_-15px_rgba(30,20,35,0.12)]"
      >
        <div className="pointer-events-none hidden h-5 w-full items-center justify-center bg-page pt-2 sm:flex">
          <div className="h-[5px] w-24 rounded-full bg-ink/10" />
        </div>
        <div className="flex flex-1 flex-col">
          {view}
        </div>
      </main>
    </div>
  )
}
