import { DomainShift } from '@/app/components/diagrams/domain-shift'
import { MaskPlacement } from '@/app/components/diagrams/mask-placement'
import { MetricBlindspot } from '@/app/components/diagrams/metric-blindspot'

/**
 * 記事本文に差し込む模式図の登録表。
 * MDX 側に <figure data-diagram="キー"></figure> と書くと、ここに登録した図が本文中に描画される。
 * 差し替えは app/projects/[slug]/page.tsx の figure レンダラが行う。
 *
 * **2026-08-11 に一度すべて撤去し（登録ゼロ）、同日 GPT の作り直し3枚を入れた。**
 * 撤去したのは、こちらが作図の制約を積み上げた結果、分かりにくい図しか出なくなったため。
 * 以後、作り方に制約は置かない。守るのは「数値を捏造しない」「伏字」の2つだけ。
 * 経緯は claudedocs/DIAGRAM_REVIEW_RESPONSE_2026-08.md、図が要る場所は
 * claudedocs/DIAGRAM_BRIEF_2026-08-11.md。
 *
 * 現在の3枚はいずれも横組み1本のみで、**縦組みのスマホ版がまだ無い**。
 * 幅が足りないぶんは Plate が枠内スクロールへ逃がしている。スマホ版が届いたら
 * Plate ごと sm: の出し分けに置き換えること。
 *
 * 追加するときは、1図1ファイルで作ってここへ登録する。
 * 共通枠は app/components/schematic.tsx（Schematic / Plate / Callouts / Overlay / Legend / Readout）。
 */

export const articleDiagrams: Record<string, () => React.JSX.Element> = {
  'metric-blindspot': MetricBlindspot,
  'mask-placement': MaskPlacement,
  'domain-shift': DomainShift,
}
