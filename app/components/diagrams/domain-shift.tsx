import { Plate, Schematic } from '@/app/components/schematic'

/**
 * FIG.03 — 撮った日が変わっただけで、良品100枚が全数、閾値の右へ出てしまった。
 *
 * 原案はGPT（`claudedocs/received/h-10-contextual.svg`。2026-08-11 15:48 の差し替え版）。
 * 実装上直したのはクラス名とidの前置き（`sh-`）だけ。理由は `metric-blindspot.tsx` の
 * 先頭コメントと同じ。**スタイル定義は受領物のまま**にしてある（`.sh-num` / `.sh-big` は
 * いま未使用だが、received との差分を取りやすくするため残す）。
 *
 * 軸は 0.20〜0.95 を x=250〜1100 に写している。位置は実測値から計算されたもので、
 * デザインの都合ではない。数値を動かすなら `claudedocs/DIAGRAM_BRIEF_2026-08-11.md` と
 * `~/work/iidzka-inspection/` の記録に当たり直すこと。
 *   同じ日の良品241枚 0.243〜0.364 / 同じ日の不良品178枚 0.323〜0.865（中央値0.491）
 *   別の日の良品100枚 0.515〜0.736（中央値0.623） / 閾値0.323
 *
 * 初版にあった「不良178枚中107枚より右側」の引き出しと朱の囲みは、差し替え版で無くなった。
 * この事実は本文（「一番大きな壁」の節）に残っている。
 */
export function DomainShift() {
  return (
    <Schematic label="Fig.03">
      <Plate viewBox="0 0 1200 700" aria-labelledby="sh-t sh-d">
        <title id="sh-t">撮影日が変わると良品の異常スコアが不良品より高くなる</title>
        <desc id="sh-d">
          同じ日の良品、不良品、別の日の良品の実測スコア範囲を一本の軸で比較する。
        </desc>
        <style>{`
          .sh-tx{font-family:system-ui,"Yu Gothic",Meiryo,sans-serif;fill:currentColor}
          .sh-line{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round}
          .sh-thin{fill:none;stroke:currentColor;stroke-width:1}
          .sh-dash{fill:none;stroke:currentColor;stroke-width:2;stroke-dasharray:8 7}
          .sh-accent{fill:hsl(var(--primary))}
          .sh-accent-line{fill:none;stroke:hsl(var(--primary));stroke-width:14;stroke-linecap:round}
          .sh-range{fill:none;stroke:currentColor;stroke-width:14;stroke-linecap:round}
          .sh-head{font-size:29px;font-weight:700}
          .sh-body{font-size:20px}
          .sh-small{font-size:17px}
          .sh-num{font-size:24px;font-weight:700}
          .sh-big{font-size:42px;font-weight:750}
          .sh-muted{opacity:.52}
        `}</style>

        <text className="sh-tx sh-head" x="54" y="58">
          撮影日が変わっただけで、良品が不良品より「不良らしく」なった
        </text>
        <path className="sh-thin sh-muted" d="M54 80h1092" />

        {/* 軸：0.20〜0.95 を x=250〜1100 に写す */}
        <path className="sh-line" d="M250 555h850m-10-9 10 9-10 9" />
        <text className="sh-tx sh-small" x="250" y="588" textAnchor="middle">
          0.20
        </text>
        <text className="sh-tx sh-small" x="1100" y="588" textAnchor="middle">
          0.95
        </text>
        <text className="sh-tx sh-small" x="675" y="625" textAnchor="middle">
          異常スコア　← 正常らしい　　　　　　　　　　　　　異常らしい →
        </text>

        {/* 閾値 0.323 */}
        <path className="sh-dash" d="M389.4 112v443" />
        <text className="sh-tx sh-small" x="389.4" y="102" textAnchor="middle">
          閾値 0.323
        </text>

        <text className="sh-tx sh-body" x="54" y="184">
          同じ日の良品
        </text>
        <text className="sh-tx sh-small" x="54" y="210">
          241枚
        </text>
        <path className="sh-range" d="M298.7 195h137.1" />
        <circle cx="298.7" cy="195" r="8" fill="currentColor" />
        <circle cx="435.8" cy="195" r="8" fill="currentColor" />
        <text className="sh-tx sh-small" x="298.7" y="232" textAnchor="middle">
          0.243
        </text>
        <text className="sh-tx sh-small" x="435.8" y="232" textAnchor="middle">
          0.364
        </text>

        <text className="sh-tx sh-body" x="54" y="332">
          同じ日の不良品
        </text>
        <text className="sh-tx sh-small" x="54" y="358">
          178枚
        </text>
        <path className="sh-accent-line" d="M389.4 343h614.3" />
        <circle className="sh-accent" cx="389.4" cy="343" r="8" />
        <circle className="sh-accent" cx="1003.7" cy="343" r="8" />
        <path className="sh-line" d="M579.8 325v36" />
        <text className="sh-tx sh-small" x="579.8" y="307" textAnchor="middle">
          中央値
        </text>
        <text className="sh-tx sh-small" x="389.4" y="380" textAnchor="middle">
          0.323
        </text>
        <text className="sh-tx sh-small" x="1003.7" y="380" textAnchor="middle">
          0.865
        </text>

        <text className="sh-tx sh-body" x="54" y="480">
          別の日の良品
        </text>
        <text className="sh-tx sh-small" x="54" y="506">
          100枚
        </text>
        <path className="sh-range" d="M606.7 491h250.5" />
        <circle cx="606.7" cy="491" r="8" fill="currentColor" />
        <circle cx="857.2" cy="491" r="8" fill="currentColor" />
        <path className="sh-line" d="M728.6 473v36" />
        <text className="sh-tx sh-small" x="728.6" y="455" textAnchor="middle">
          中央値
        </text>
        <text className="sh-tx sh-small" x="606.7" y="528" textAnchor="middle">
          0.515
        </text>
        <text className="sh-tx sh-small" x="857.2" y="528" textAnchor="middle">
          0.736
        </text>

        <path className="sh-thin sh-muted" d="M54 648h1092" />
        <text className="sh-tx sh-body" x="600" y="682" textAnchor="middle">
          別の日の良品100枚はすべて閾値を越えた。撮像条件が変わると、固定閾値では分離できない。
        </text>
      </Plate>
    </Schematic>
  )
}
