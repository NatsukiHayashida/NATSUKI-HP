import { Callouts, Legend, Overlay, Readout, Schematic } from '@/app/components/schematic'

/**
 * H-10 ドメインシフト — 撮った日が違うだけで、良品が不良より「不良らしく」なる。
 *
 * 1本の異常スコア軸に3つの群を置く。1番目と3番目はどちらも良品なので同じ印にする。
 * 「同じ印が軸の両端に分かれること」がこの図の全部。
 *
 * 実測は results/robust_v1a/scores_all.csv より（無選別を学習に入れる前の観測）
 *   同一セッション 良品241枚  0.243〜0.364
 *   同一セッション 不良178枚  0.323〜0.865（中央値 0.491）
 *   別セッション   良品100枚  0.515〜0.736（中央値 0.623）
 *   閾値 0.323（見逃しゼロで決まる＝不良の最小値）
 *
 * 別セッション良品の左端は不良分布の35%の位置に来るが、これで正しい。
 * 分布が右に歪んでいるため、位置で35%＝件数では60%（178枚中107枚）になる。
 *
 * 個数は印で数えられる形にしない（根拠のない数を描くことになるため）。
 * 密度の濃淡で件数の偏りだけを示し、実数は Readout に出す。
 * 朱は「不良品」の一つの意味に固定する。閾値の線には使わない。
 */

const LABEL =
  '異常スコアの軸。同じ日に撮った良品は左端に固まり、別の日に撮った良品は不良品の分布の右寄りに入り込む'

function Marks({ p, good, dense, bad }: { p: string; good: number; dense: number; bad: number }) {
  return (
    <defs>
      <pattern id={`${p}-good`} width={good} height={good} patternUnits="userSpaceOnUse">
        <circle cx={good * 0.3} cy={good * 0.3} r={good * 0.18} fill="none" stroke="currentColor" strokeWidth={1.2} />
        <circle cx={good * 0.83} cy={good * 0.75} r={good * 0.12} fill="none" stroke="currentColor" strokeWidth={1} />
      </pattern>
      <pattern id={`${p}-dense`} width={dense} height={dense} patternUnits="userSpaceOnUse">
        <circle cx={dense * 0.36} cy={dense * 0.36} r={dense * 0.21} fill="none" stroke="currentColor" strokeWidth={1} />
      </pattern>
      <pattern id={`${p}-bad`} width={bad} height={bad} patternUnits="userSpaceOnUse">
        <path d={`M${bad * 0.34} 0l${bad * 0.33} ${bad * 0.33}-${bad * 0.33} ${bad * 0.33}-${bad * 0.33}-${bad * 0.33}z`} fill="none" stroke="hsl(var(--primary))" strokeWidth={1.2} />
        <path d={`M${bad * 0.9} ${bad * 0.6}l${bad * 0.17} ${bad * 0.17}-${bad * 0.17} ${bad * 0.17}-${bad * 0.17}-${bad * 0.17}z`} fill="none" stroke="hsl(var(--primary))" strokeWidth={1} />
      </pattern>
    </defs>
  )
}

const thin = { fill: 'none', stroke: 'currentColor', strokeWidth: 1 } as const
const axis = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' } as const
const dash = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeDasharray: '7 6' } as const

/** 群ひとつ。外形→濃い芯→輪郭 の順に重ねる */
function Cloud({ p, shape, core, accent }: { p: string; shape: string; core: string; accent?: boolean }) {
  return (
    <>
      <path d={shape} fill={`url(#${p}-${accent ? 'bad' : 'good'})`} />
      <path d={core} fill={`url(#${p}-${accent ? 'bad' : 'dense'})`} />
      <path d={shape} fill="none" stroke={accent ? 'hsl(var(--primary))' : 'currentColor'} strokeWidth={1.2} />
    </>
  )
}

function DiagramPc() {
  const p = 'ds-pc'
  return (
    <svg viewBox="0 70 1000 350" className="w-full" role="img" aria-label={LABEL}>
      <Marks p={p} good={13} dense={8} bad={12} />
      <path d="M80 410h840m-8-6 8 6-8 6" {...axis} />
      <path d="M217.76 78v332" {...dash} />
      <path d="M80 120h840M80 240h840M80 360h840" {...thin} />
      <Cloud
        p={p}
        shape="M127.88 120c18-26 42-27 67-21 25-9 51-5 68.24 21-18 26-43 28-68.24 20-25 8-50 5-67-20z"
        core="M170 120c10-18 27-20 45-13 17-5 31 0 38 13-9 16-23 19-39 14-18 6-34 2-44-14z"
      />
      <Cloud
        p={p}
        accent
        shape="M217.76 240c68-24 125-20 188.16-29 86 4 158 10 224 1 74 0 141 6 195.16 28-54 23-121 28-195.16 22-72 9-145 2-224-3-67 8-126 6-188.16-19z"
        core="M330 240c24-19 50-23 75.92-18 36-7 72-2 101 18-29 18-64 22-101 16-29 7-55 2-75.92-16z"
      />
      <Cloud
        p={p}
        shape="M431.96 360c31-23 73-22 120.96-27 51 1 91 3 126.84 27-36 23-76 26-126.84 22-48 5-90 2-120.96-22z"
        core="M505 360c14-18 31-21 47.92-15 24-6 48-1 62 15-15 17-37 20-62 14-19 7-36 3-47.92-14z"
      />
    </svg>
  )
}

function DiagramSm() {
  const p = 'ds-sm'
  return (
    <svg viewBox="0 88 320 630" className="w-full" role="img" aria-label={LABEL}>
      <Marks p={p} good={11} dense={7} bad={10} />
      <path d="M28 100v600m-6-8 6 8 6-8" {...axis} />
      <path d="M28 198.4h264" {...dash} />
      <path d="M80 100v600M160 100v600M240 100v600" {...thin} />
      <Cloud
        p={p}
        shape="M80 134.2c-21 13-20 31-16 48-6 19-4 35 16 48.6 20-13 22-30 17-48.6 5-18 3-35-17-48z"
        core="M80 158c-14 8-15 18-10 28-4 11-1 21 10 28 13-8 14-17 10-28 4-11 2-21-10-28z"
      />
      <Cloud
        p={p}
        accent
        shape="M160 198.4c-22 42-19 88-27 134.4 3 62 8 114 0 160 0 53 5 99 27 139.4 22-40 25-86 20-139.4 8-47 2-99-3-160-7-47-2-91-17-134.4z"
        core="M160 278c-17 18-19 36-14 54.8-6 26-2 52 14 72 16-20 19-45 14-72 6-21 2-39-14-54.8z"
      />
      <Cloud
        p={p}
        shape="M240 351.4c-20 22-19 52-23 86.4 1 36 3 64 23 90.6 20-26 22-55 19-90.6 4-34 2-64-19-86.4z"
        core="M240 403c-14 10-15 23-11 34.8-5 17-1 34 11 44 13-10 15-26 11-44 5-13 2-25-11-34.8z"
      />
    </svg>
  )
}

export function DomainShift() {
  return (
    <Schematic
      label="Fig. 03"
      title="撮った日が違うだけで、良品が不良品の6割より「不良らしく」出る"
    >
      <div className="hidden sm:block">
        <Overlay ratio="1000 / 350">
          <DiagramPc />
          <Callouts
            items={[
              { no: '01', label: '同じ日の良品', x: 4, y: 12, align: 'left', w: 10 },
              { no: '02', label: '同じ日の不良品', x: 4, y: 46, align: 'left', w: 10 },
              { no: '03', label: '別の日の良品', x: 4, y: 80, align: 'left', w: 10 },
              { label: '閾値', x: 22.5, y: 5, align: 'left' },
            ]}
          />
        </Overlay>
      </div>

      <div className="sm:hidden">
        <Overlay ratio="320 / 630">
          <DiagramSm />
          <Callouts
            items={[
              { no: '01', label: '同じ日の良品', x: 12, y: 3, align: 'left', w: 26 },
              { no: '02', label: '同じ日の不良品', x: 37, y: 3, align: 'left', w: 26 },
              { no: '03', label: '別の日の良品', x: 62, y: 3, align: 'left', w: 26 },
              { label: '閾値', x: 3, y: 18, align: 'left' },
            ]}
          />
        </Overlay>
      </div>

      <Readout
        items={[
          { value: '100枚', label: '別の日に撮った良品。全数が不良と判定された' },
          { value: '107枚', label: '同じ日の不良品178枚のうち、その良品より低いスコアだった数' },
          { value: '0.999', label: '同じ日のデータだけで測ったときのAUC' },
        ]}
      />

      <Legend
        items={[
          {
            no: '01',
            title: '同じ日の良品と、別の日の良品は同じもの',
            body: '01 と 03 は同じ印で描いてある。どちらも良品で、違うのは撮影した日だけ。それが軸の両端に分かれている。',
          },
          {
            no: '03',
            title: '平均輝度は140から167へ動いていた',
            body: '輝度を正規化して再学習しても、100枚中100枚が誤検出のまま。ヒートマップは特定の箇所ではなく画面全体にぼんやり反応していた。',
          },
        ]}
      />
    </Schematic>
  )
}
