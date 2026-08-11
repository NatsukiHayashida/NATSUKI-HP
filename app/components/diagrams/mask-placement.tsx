import { Plate, Schematic } from '@/app/components/schematic'

/**
 * FIG.02 — 同じマスクでも、入力画像にかけると悪化し（72.4%）、推論後の異常マップにかけると改善する（20.8%）。
 *
 * 原案はGPT（`claudedocs/received/h-07-contextual.svg`）。実装上直したのはクラス名とidの
 * 前置き（`mk-`）だけ。詳細は `metric-blindspot.tsx` の先頭コメントと同じ理由。
 *
 * クラス指定は `<use>` で複製した中身にも効くので、部品側は素のクラス名のままでよい。
 * 数値は `claudedocs/DIAGRAM_BRIEF_2026-08-11.md`（過検出 72.4% / 20.8%、反応は画像の四隅）。
 */
export function MaskPlacement() {
  return (
    <Schematic label="Fig.02">
      <Plate viewBox="0 0 1200 820" aria-labelledby="mk-t mk-d">
        <title id="mk-t">同じマスクでも適用位置で結果が逆になる</title>
        <desc id="mk-d">
          入力画像へのマスクは端の欠陥を消し過検出を72.4%へ悪化させた。異常マップへのマスクは背景反応だけを除去し20.8%へ改善した。
        </desc>
        <style>{`
          .mk-tx{font-family:system-ui,"Yu Gothic",Meiryo,sans-serif;fill:currentColor}
          .mk-line{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
          .mk-thin{fill:none;stroke:currentColor;stroke-width:1}
          .mk-accent{fill:hsl(var(--primary))}
          .mk-accent-line{fill:none;stroke:hsl(var(--primary));stroke-width:3}
          .mk-bg{fill:hsl(var(--background))}
          .mk-head{font-size:29px;font-weight:700}
          .mk-body{font-size:20px}
          .mk-small{font-size:17px}
          .mk-big{font-size:48px;font-weight:750}
          .mk-muted{opacity:.5}
        `}</style>
        <defs>
          <pattern
            id="mk-hatch"
            width="9"
            height="9"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <path className="mk-thin" d="M0 0v9" />
          </pattern>
          <g id="mk-part">
            <circle className="mk-line" cx="100" cy="82" r="70" />
            <circle className="mk-line" cx="100" cy="82" r="28" />
            <circle className="mk-thin" cx="100" cy="35" r="6" />
            <circle className="mk-thin" cx="147" cy="82" r="6" />
            <circle className="mk-thin" cx="100" cy="129" r="6" />
            <circle className="mk-thin" cx="53" cy="82" r="6" />
          </g>
          <g id="mk-defect">
            <path
              className="mk-accent"
              d="M132 139c7-10 18-11 25-4-6 4-6 11-2 17-10-3-17 1-21 8-4-7-5-14-2-21z"
            />
          </g>
          <g id="mk-arrow">
            <path className="mk-line" d="M0 0h52m-10-9 10 9-10 9" />
          </g>
        </defs>

        <text className="mk-tx mk-head" x="54" y="58">
          同じマスク処理でも、「どこにかけるか」で結果が逆になる
        </text>
        <path className="mk-thin mk-muted" d="M54 80h1092" />

        <g transform="translate(54 116)">
          <text className="mk-tx mk-body" x="0" y="0">
            失敗：入力画像を先に削る
          </text>
          <g transform="translate(0 36)">
            <rect className="mk-line" width="200" height="160" />
            <use href="#mk-part" />
            <use href="#mk-defect" />
          </g>
          <use href="#mk-arrow" transform="translate(218 116)" />
          <g transform="translate(288 36)">
            <rect className="mk-line" width="200" height="160" />
            <use href="#mk-part" />
            <use href="#mk-defect" />
            <path className="mk-bg" fillRule="evenodd" d="M0 0h200v160H0zM14 14v132h172V14z" />
            <path fill="url(#mk-hatch)" fillRule="evenodd" d="M0 0h200v160H0zM14 14v132h172V14z" />
            <rect className="mk-thin" x="14" y="14" width="172" height="132" />
          </g>
          <use href="#mk-arrow" transform="translate(506 116)" />
          <g transform="translate(576 36)">
            <rect className="mk-line" width="200" height="160" />
            <use href="#mk-part" />
            <path className="mk-bg" fillRule="evenodd" d="M0 0h200v160H0zM14 14v132h172V14z" />
            <path fill="url(#mk-hatch)" fillRule="evenodd" d="M0 0h200v160H0zM14 14v132h172V14z" />
          </g>
          <path className="mk-line" d="M798 116h54m-10-9 10 9-10 9" />
          <g transform="translate(876 38)">
            <path className="mk-accent-line" d="M0 0v156" />
            <text className="mk-tx mk-small" x="24" y="33">
              欠陥スコアが下がる
            </text>
            <text className="mk-tx mk-small" x="24" y="69">
              見逃しゼロのため閾値を下げる
            </text>
            <text className="mk-tx mk-small" x="24" y="105">
              良品まで不良側へ落ちる
            </text>
            <text className="mk-tx mk-big mk-accent" x="24" y="153">
              72.4%
            </text>
            <text className="mk-tx mk-small" x="184" y="151">
              過検出
            </text>
          </g>
        </g>

        <path className="mk-thin mk-muted" d="M54 386h1092" />
        <g transform="translate(54 430)">
          <text className="mk-tx mk-body" x="0" y="0">
            改善：推論結果から背景反応だけを削る
          </text>
          <g transform="translate(0 36)">
            <rect className="mk-line" width="200" height="160" />
            <use href="#mk-part" />
            <use href="#mk-defect" />
          </g>
          <use href="#mk-arrow" transform="translate(218 116)" />
          <g transform="translate(288 36)">
            <rect className="mk-line" width="200" height="160" />
            <use href="#mk-part" />
            <g fill="currentColor">
              <circle cx="10" cy="10" r="5" />
              <circle cx="190" cy="10" r="5" />
              <circle cx="10" cy="150" r="5" />
              <circle cx="190" cy="150" r="5" />
            </g>
            <use href="#mk-defect" />
          </g>
          <use href="#mk-arrow" transform="translate(506 116)" />
          <g transform="translate(576 36)">
            <rect className="mk-line" width="200" height="160" />
            <use href="#mk-part" />
            <path
              fill="url(#mk-hatch)"
              fillRule="evenodd"
              d="M0 0h200v160H0zM100 82m-77 0a77 77 0 1 0 154 0a77 77 0 1 0-154 0"
            />
            <circle className="mk-thin" cx="100" cy="82" r="77" />
            <use href="#mk-defect" />
          </g>
          <path className="mk-line" d="M798 116h54m-10-9 10 9-10 9" />
          <g transform="translate(876 38)">
            <path className="mk-accent-line" d="M0 0v156" />
            <text className="mk-tx mk-small" x="24" y="33">
              元画像と欠陥はそのまま
            </text>
            <text className="mk-tx mk-small" x="24" y="69">
              四隅の背景反応だけ除去
            </text>
            <text className="mk-tx mk-small" x="24" y="105">
              判定に必要な信号が残る
            </text>
            <text className="mk-tx mk-big mk-accent" x="24" y="153">
              20.8%
            </text>
            <text className="mk-tx mk-small" x="184" y="151">
              過検出
            </text>
          </g>
        </g>

        <text className="mk-tx mk-body" x="600" y="790" textAnchor="middle">
          入力を削ると欠陥まで失う。出力を削れば、不要な背景反応だけを捨てられる。
        </text>
      </Plate>
    </Schematic>
  )
}
