const cx = (...a) => a.filter(Boolean).join(' ')

export const Screen = ({ children, className = '' }) => (
  <main className={cx('relative flex min-h-full flex-col gap-6 bg-page px-6 pb-[30px] pt-12', className)}>{children}</main>
)

export function Header({ title, sub, onBack, size = 'text-[26px]', gap = 'gap-[10px]', subClass = 'text-[14px] leading-[22px] text-body font-medium' }) {
  return (
    <header className="flex flex-col gap-[10px]">
      <div className={cx('flex min-h-[34px] items-center', gap)}>
        {onBack && (
          <button type="button" onClick={onBack} aria-label="Back" className="text-[24px] font-normal leading-8 text-brand">←</button>
        )}
        <h1 className={cx('flex-1 font-bold leading-[34px] text-ink', size)}>{title}</h1>
      </div>
      {sub && <p className={cx(onBack && 'pl-[28px]', subClass)}>{sub}</p>}
    </header>
  )
}

export const PrimaryBtn = ({ children, large, className = '', ...p }) => (
  <button type="button" {...p}
    className={cx('w-full rounded-[14px] bg-brand text-white font-semibold transition active:brightness-90 hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50',
      large ? 'h-[52px] text-[16px] leading-6' : 'h-[50px] text-[15px] leading-[22px]', className)}>{children}</button>
)

export const OutlineBtn = ({ children, className = '', ...p }) => (
  <button type="button" {...p}
    className={cx('h-[50px] w-full rounded-[14px] border border-brand text-[15px] font-bold leading-[22px] text-brand transition active:bg-tint hover:bg-tint/60', className)}>{children}</button>
)

export const DeclineBtn = ({ children, large, ...p }) => (
  <button type="button" {...p}
    className={cx('h-12 w-full rounded-[14px] border border-btn font-semibold text-decline transition active:bg-tint hover:bg-tint/60',
      large ? 'text-[16px] leading-6' : 'text-[14px] leading-[22px]')}>{children}</button>
)

export const TextLink = ({ children, className = 'text-[14px] leading-[22px]', ...p }) => (
  <button type="button" {...p} className={cx('font-semibold text-brand underline underline-offset-2', className)}>{children}</button>
)

export const MoodChip = ({ on, children, ...p }) => (
  <button type="button" aria-pressed={on} {...p}
    className={cx('h-11 rounded-[14px] px-[14px] text-[14px] leading-5 text-body transition',
      on ? 'border-[1.5px] border-brand bg-tint font-semibold' : 'border border-chip bg-white font-medium')}>{children}</button>
)

export const HelpChip = ({ on, children, ...p }) => (
  <button type="button" aria-pressed={on} {...p}
    className={cx('rounded-[18px] px-3 py-1.5 text-[13px] leading-5 transition',
      on ? 'border-[1.5px] border-brand bg-tint font-semibold text-brand' : 'border border-line bg-white font-normal text-ink')}>{children}</button>
)

export function Confirmation({ title, body, onUndo, undoLabel = 'Change my answer' }) {
  return (
    <Screen>
      <div className="flex flex-col gap-[10px] pt-1">
        <h1 className="text-[26px] font-bold leading-[34px] text-ink">{title}</h1>
      </div>
      <div role="status" className="rounded-[16px] bg-tint p-6">
        <p className="text-[16px] leading-[26px] text-ink">{body}</p>
      </div>
      <div className="flex-1" />
      <OutlineBtn onClick={onUndo}>{undoLabel}</OutlineBtn>
    </Screen>
  )
}

const svg = { width: '100%', height: '100%', fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export const LockIcon = () => (
  <svg viewBox="0 0 24 24" strokeWidth="2" {...svg}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
)
export const MicIcon = () => (
  <svg viewBox="0 0 24 24" strokeWidth="2" {...svg}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
)
export const GearIcon = () => (
  <svg viewBox="0 0 24 24" strokeWidth="1.8" {...svg}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></svg>
)
export const CheckIcon = () => (
  <svg viewBox="0 0 24 24" strokeWidth="3" className="size-[15px] text-white" {...svg} style={{ width: 15, height: 15 }}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
)
