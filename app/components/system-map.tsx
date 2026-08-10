/**
 * スマートフォンを中心に置いた同心円の相関図。
 * 中心から外へ向かって、閉域ネットワーク → ホストPC（中継）→ WSL2（サーバー）→ 走査の対象、
 * という順で層が重なる。仮想環境の層だけはハッチングを掛けて実機と区別している。
 *
 * 文字は図に入れず、番号バルーンと凡例（Legend）に逃がしてある。
 * SVG内の文字はモバイルで潰れるため、名称と説明はHTML側で持つ。
 */

const BG = 'hsl(var(--background))'

const R_CLOSED = 140 // 閉域ネットワーク
const R_HOST = 205 // ホストPC
const R_VM = 272 // WSL2

/** 番号バルーン。塗りつぶして罫線を切るので、線の上に置いてよい */
function Balloon({ n, x, y, to }: { n: string; x: number; y: number; to: [number, number] }) {
  return (
    <g className="text-primary">
      <line
        x1={x}
        y1={y}
        x2={to[0]}
        y2={to[1]}
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.65"
      />
      <circle cx={x} cy={y} r="23" fill={BG} stroke="currentColor" strokeWidth="1.3" />
      <text
        x={x}
        y={y + 8}
        textAnchor="middle"
        fontSize="24"
        className="font-mono"
        fill="currentColor"
      >
        {n}
      </text>
    </g>
  )
}

/** 書類フォルダ1枚。(bx, by) は左下 */
function folderPath(bx: number, by: number) {
  return `M${bx},${by} L${bx},${by - 30} L${bx + 18},${by - 30} L${bx + 23},${by - 24} L${bx + 52},${by - 24} L${bx + 52},${by} Z`
}

/** 円環（ドーナツ）の塗り。外径と内径から evenodd で抜く */
function annulus(outer: number, inner: number) {
  return (
    `M400,400 m-${outer},0 a${outer},${outer} 0 1,0 ${outer * 2},0 a${outer},${outer} 0 1,0 -${outer * 2},0 ` +
    `M400,400 m-${inner},0 a${inner},${inner} 0 1,0 ${inner * 2},0 a${inner},${inner} 0 1,0 -${inner * 2},0`
  )
}

export function SystemMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 800"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <marker id="sm-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0.5 L8,4 L0,7.5 Z" fill="currentColor" />
        </marker>
        <pattern
          id="sm-hatch"
          width="9"
          height="9"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="9" stroke="currentColor" strokeWidth="0.7" opacity="0.22" />
        </pattern>
      </defs>

      {/* 仮想環境の層だけハッチングを掛ける（製図の断面と同じ扱い） */}
      <path d={annulus(R_VM, R_HOST)} fill="url(#sm-hatch)" fillRule="evenodd" />

      {/* ── 層の境界（外側から） ── */}
      <g stroke="currentColor">
        <circle cx="400" cy="400" r={R_VM} strokeWidth="1.4" opacity="0.4" />
        <circle cx="400" cy="400" r={R_HOST} strokeWidth="1.5" opacity="0.55" />
      </g>
      {/* 閉域ネットワークだけ破線＋朱にして、越える境界であることを示す */}
      <circle
        cx="400"
        cy="400"
        r={R_CLOSED}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="10 8"
        className="text-primary"
        opacity="0.9"
      />

      {/* ── 走査の対象へ伸びる線 ── */}
      <g stroke="currentColor" strokeWidth="1.2" opacity="0.45">
        <line x1="182" y1="563" x2="146" y2="591" />
        <line x1="400" y1="672" x2="400" y2="718" />
        <line x1="618" y1="563" x2="654" y2="591" />
      </g>

      {/* ── 到達経路（中心から外へ） ── */}
      <g stroke="currentColor" strokeWidth="2" className="text-primary">
        <line x1="400" y1="320" x2="400" y2="288" markerEnd="url(#sm-arrow)" />
        <line x1="400" y1="248" x2="400" y2="216" markerEnd="url(#sm-arrow)" />
        <line x1="400" y1="176" x2="400" y2="147" markerEnd="url(#sm-arrow)" />
      </g>

      {/* ── 04 サーバー2本（WSL2の中） ── */}
      <g stroke="currentColor" strokeWidth="1.7">
        {[348, 406].map((x) => (
          <g key={x}>
            <rect x={x} y="113" width="46" height="30" rx="2" fill={BG} />
            <line x1={x + 8} y1="123" x2={x + 30} y2="123" strokeWidth="1.3" opacity="0.5" />
            <line x1={x + 8} y1="133" x2={x + 30} y2="133" strokeWidth="1.3" opacity="0.5" />
            <circle
              cx={x + 37}
              cy="128"
              r="2.6"
              fill="currentColor"
              stroke="none"
              className="text-primary"
            />
          </g>
        ))}
      </g>

      {/* ── 03 中継プロセス（境界に据えた関所） ── */}
      <g className="text-primary" stroke="currentColor" strokeWidth="1.8">
        <rect x="372" y="178" width="56" height="34" rx="3" fill={BG} />
        <line x1="387" y1="186" x2="387" y2="204" />
        <line x1="413" y1="186" x2="413" y2="204" />
        <line x1="392" y1="195" x2="404" y2="195" strokeWidth="1.3" markerEnd="url(#sm-arrow)" />
      </g>

      {/* ── 02 閉域ネットワークの錠 ── */}
      <g className="text-primary">
        <rect x="378" y="250" width="44" height="34" fill={BG} />
        <g stroke="currentColor" strokeWidth="1.8">
          <rect x="389" y="260" width="22" height="16" rx="2" fill={BG} />
          <path d="M394,260 L394,254 A6,6 0 0 1 406,254 L406,260" />
        </g>
      </g>

      {/* ── 01 スマートフォン ── */}
      <g stroke="currentColor" strokeWidth="2">
        <rect x="358" y="322" width="84" height="156" rx="12" fill={BG} />
        <line x1="390" y1="328" x2="410" y2="328" strokeWidth="2.6" opacity="0.55" />
        <line x1="384" y1="471" x2="416" y2="471" strokeWidth="2.6" opacity="0.4" />
      </g>
      {/* 画面の中身（ダッシュボード） */}
      <g>
        <rect
          x="371"
          y="341"
          width="44"
          height="7"
          rx="1"
          fill="currentColor"
          className="text-primary"
        />
        <polyline
          points="371,378 382,368 390,374 400,361 411,367 421,356 429,362"
          stroke="currentColor"
          strokeWidth="1.6"
          className="text-primary"
        />
        <g stroke="currentColor" strokeWidth="3.6" strokeLinecap="round">
          <line x1="372" y1="396" x2="404" y2="396" className="text-primary" opacity="0.55" />
          <line x1="372" y1="407" x2="428" y2="407" opacity="0.16" />
          <line x1="372" y1="418" x2="420" y2="418" opacity="0.16" />
          <line x1="372" y1="429" x2="428" y2="429" opacity="0.16" />
          <line x1="372" y1="440" x2="412" y2="440" opacity="0.16" />
          <line x1="372" y1="451" x2="424" y2="451" opacity="0.16" />
        </g>
      </g>

      {/* ── 05 プロジェクトの記録 ── */}
      <g stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
        <path d={folderPath(96, 578)} fill={BG} />
        <path d={folderPath(92, 596)} fill={BG} />
        <path d={folderPath(88, 614)} fill={BG} />
      </g>

      {/* ── 06 会社のメール ── */}
      <g stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
        <rect x="362" y="726" width="76" height="48" rx="2" fill={BG} />
        <path d="M362,726 L400,755 L438,726" />
      </g>

      {/* ── 07 予定 ── */}
      <g stroke="currentColor" strokeWidth="1.7">
        <rect x="650" y="584" width="62" height="54" rx="2" fill={BG} />
        <line x1="650" y1="600" x2="712" y2="600" strokeWidth="1.4" opacity="0.55" />
        <line x1="664" y1="578" x2="664" y2="588" strokeWidth="2.3" />
        <line x1="698" y1="578" x2="698" y2="588" strokeWidth="2.3" />
        <g fill="currentColor" stroke="none" opacity="0.45">
          {[665, 681, 697].map((cx) => (
            <circle key={cx} cx={cx} cy="613" r="2.3" />
          ))}
          {[665, 681].map((cx) => (
            <circle key={`b-${cx}`} cx={cx} cy="627" r="2.3" />
          ))}
        </g>
      </g>

      {/* ── 番号バルーン ── */}
      <Balloon n="01" x={494} y={352} to={[445, 354]} />
      <Balloon n="02" x={240} y={308} to={[279, 330]} />
      <Balloon n="03" x={288} y={195} to={[369, 195]} />
      <Balloon n="04" x={252} y={106} to={[344, 124]} />
      <Balloon n="05" x={72} y={648} to={[95, 622]} />
      <Balloon n="06" x={322} y={750} to={[360, 750]} />
      <Balloon n="07" x={734} y={654} to={[706, 632]} />
    </svg>
  )
}
