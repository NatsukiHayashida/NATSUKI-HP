/**
 * メール表示を直す前と後を絵で並べる。
 * 改善前は「開くたびに最新200通の全文を取りにいく」、改善後は「先読み済みの一覧と、1通だけの取得」。
 * 文字は入れず、名称と数値はHTML側（MailCompare の見出し行）で持つ。
 */

const BG = 'hsl(var(--background))'

function Defs() {
  return (
    <defs>
      <marker id="mc-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
        <path d="M0,0.8 L9,4.5 L0,8.2 Z" fill="currentColor" />
      </marker>
    </defs>
  )
}

function envelope(x: number, y: number, w = 58, h = 40) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="2" fill={BG} />
      <path d={`M${x},${y} L${x + w / 2},${y + h * 0.62} L${x + w},${y}`} />
    </g>
  )
}

/** スマートフォンの外形。中身は children で差し替える */
function phone({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
  return (
    <g>
      <g stroke="currentColor" strokeWidth="2">
        <rect x={x} y={y} width="84" height="132" rx="11" fill={BG} />
        <line x1={x + 32} y1={y + 7} x2={x + 52} y2={y + 7} strokeWidth="2.4" opacity="0.5" />
      </g>
      {children}
    </g>
  )
}

/** 改善前：開くたびに大量の封筒が降ってくる → 待たされる */
function Before({ className }: { className?: string }) {
  const pile = Array.from({ length: 11 }, (_, i) => ({ x: 26 + i * 15, y: 92 - i * 6 }))
  return (
    <svg viewBox="0 0 620 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
      <Defs />
      <g stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        {pile.map((p) => (
          <g key={p.x}>{envelope(p.x, p.y)}</g>
        ))}
      </g>

      <g className="text-primary" stroke="currentColor" strokeWidth="2">
        <line x1="290" y1="80" x2="352" y2="80" markerEnd="url(#mc-arrow)" />
      </g>

      {phone({
        x: 400,
        y: 14,
        children: (
          // 砂時計。待たされている状態
          <g className="text-primary" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <line x1="426" y1="56" x2="458" y2="56" />
            <line x1="426" y1="112" x2="458" y2="112" />
            <path d="M428,56 L456,56 L442,84 L456,112 L428,112 L442,84 Z" fill={BG} />
          </g>
        ),
      })}
    </svg>
  )
}

/** 改善後：先読み済みの一覧と、必要な1通だけ */
function After({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 620 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
      <Defs />

      {/* 先読み済みの一覧（手元に置いてある） */}
      <g stroke="currentColor" strokeWidth="1.6">
        <rect x="26" y="30" width="132" height="100" rx="4" fill={BG} />
        <g strokeWidth="4" strokeLinecap="round">
          <line x1="42" y1="52" x2="106" y2="52" className="text-primary" opacity="0.6" />
          <line x1="42" y1="70" x2="142" y2="70" opacity="0.18" />
          <line x1="42" y1="88" x2="128" y2="88" opacity="0.18" />
          <line x1="42" y1="106" x2="142" y2="106" opacity="0.18" />
        </g>
      </g>

      {/* 個別表示のときだけ取りにいく1通 */}
      <g className="text-primary" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        {envelope(196, 60, 62, 42)}
      </g>

      <g className="text-primary" stroke="currentColor" strokeWidth="2">
        <line x1="290" y1="80" x2="352" y2="80" markerEnd="url(#mc-arrow)" />
      </g>

      {phone({
        x: 400,
        y: 14,
        children: (
          // 待たされずに一覧が出ている状態
          <g stroke="currentColor" strokeWidth="4" strokeLinecap="round">
            <line x1="414" y1="46" x2="452" y2="46" className="text-primary" opacity="0.6" />
            <line x1="414" y1="62" x2="470" y2="62" opacity="0.18" />
            <line x1="414" y1="78" x2="462" y2="78" opacity="0.18" />
            <line x1="414" y1="94" x2="470" y2="94" opacity="0.18" />
            <line x1="414" y1="110" x2="456" y2="110" opacity="0.18" />
          </g>
        ),
      })}
    </svg>
  )
}

function Row({
  label,
  detail,
  result,
  children,
}: {
  label: string
  detail: string
  result: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 border-b pb-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
          {label}
        </span>
        <span className="font-mono text-sm tabular-nums text-primary md:text-base">{result}</span>
      </div>
      <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground md:text-[13px]">{detail}</p>
      {children}
    </div>
  )
}

export function MailCompare() {
  return (
    <div className="space-y-8 md:space-y-10">
      <Row
        label="改善前"
        detail="メールを1通開くたびに、最新200通の全文をダウンロードしていた。一覧をつくるのに全文は要らない。"
        result="25s"
      >
        <Before className="mt-3 w-full text-foreground" />
      </Row>
      <Row
        label="改善後"
        detail="一覧は起動時に先読みし、古い内容を先に返してから裏で更新する。個別表示は指定した1通だけを取りにいき、10分だけ持っておく。"
        result="0.46s / 0.36s"
      >
        <After className="mt-3 w-full text-foreground" />
      </Row>
    </div>
  )
}
