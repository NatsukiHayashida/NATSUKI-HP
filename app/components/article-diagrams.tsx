import { CadAiScene } from '@/app/components/diagrams/cad-ai-scene'
import { DomainShift } from '@/app/components/diagrams/domain-shift'
import { GaikanKensaScene } from '@/app/components/diagrams/gaikan-kensa-scene'
import { MailSpeed } from '@/app/components/diagrams/mail-speed'
import { MaskPlacement } from '@/app/components/diagrams/mask-placement'
import { MetricBlindspot } from '@/app/components/diagrams/metric-blindspot'
import { ParityGate } from '@/app/components/diagrams/parity-gate'
import { PositionShift } from '@/app/components/diagrams/position-shift'
import { ReworkBreakdown } from '@/app/components/diagrams/rework-breakdown'
import { TrafficFunnel } from '@/app/components/diagrams/traffic-funnel'
import { WorkHubPhone } from '@/app/components/work-hub-phone'
import { WorkHubScene } from '@/app/components/diagrams/work-hub-scene'

/**
 * 記事本文に差し込む模式図の登録表。
 * MDX 側に <figure data-diagram="キー"></figure> と書くと、ここに登録した図が本文中に描画される。
 * 差し替えは app/projects/[slug]/page.tsx の figure レンダラが行う。
 *
 * **2026-08-11 に一度すべて撤去し（登録ゼロ）、同日 GPT の作り直し8枚を入れた。**
 * 撤去したのは、こちらが作図の制約を積み上げた結果、分かりにくい図しか出なくなったため。
 * 以後、作り方に制約は置かない。守るのは「数値を捏造しない」「伏字」の2つだけ。
 * 経緯は claudedocs/DIAGRAM_REVIEW_RESPONSE_2026-08.md、図が要る場所と使ってよい数字は
 * claudedocs/DIAGRAM_BRIEF_2026-08-11.md。
 *
 * **図番は本文の出現順**。記事をまたぐと Fig.01 が複数あるが、記事内で閉じているので問題ない。
 * 縦組み（スマホ版）があるのは外観検査AIの3枚だけ。残り5枚は横組みのみで、
 * 幅が足りないぶんは `Plate` が枠内スクロールへ逃がしている。縦組みが届いたら
 * `--sp` を足して `scripts/svg-to-diagram.py` を流し直す。
 *
 * 追加するときは受け取ったSVGを `claudedocs/received/` へ置き、
 * `scripts/svg-to-diagram.py` で変換してここへ登録する。手で写さないこと
 * （SVGの中の `<style>` は文書全体に効くため、クラス名の前置きを1つ落とすと他の図が壊れる）。
 */

export const articleDiagrams: Record<string, () => React.JSX.Element> = {
  // 外観検査AI
  'gaikan-kensa-scene': GaikanKensaScene, // 冒頭のイメージ図（図番なし）
  'metric-blindspot': MetricBlindspot,
  'position-shift': PositionShift,
  'mask-placement': MaskPlacement,
  'domain-shift': DomainShift,
  // CAD自動化
  'cad-ai-scene': CadAiScene, // 冒頭のイメージ図（図番なし）
  'rework-breakdown': ReworkBreakdown,
  'parity-gate': ParityGate,
  // 花製作所
  'traffic-funnel': TrafficFunnel,
  // work-hub
  'work-hub-scene': WorkHubScene, // 冒頭のイメージ図（図番なし）
  'work-hub-phone': WorkHubPhone, // 実機のスクショをiPhone枠でスクロールさせる
  'mail-speed': MailSpeed,
}
