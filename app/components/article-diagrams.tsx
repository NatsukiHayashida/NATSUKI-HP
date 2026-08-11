/**
 * 記事本文に差し込む模式図の登録表。
 * MDX 側に <figure data-diagram="キー"></figure> と書くと、ここに登録した図が本文中に描画される。
 * 差し替えは app/projects/[slug]/page.tsx の figure レンダラが行う。
 *
 * **2026-08-11 に一度すべて撤去し（登録ゼロ）、同日 mask-placement の1枚だけ入れ直した。**
 * 撤去したのは「名称を隠すと何の比較か分からない」水準を越えられなかったため。
 * 経緯は claudedocs/DIAGRAM_REVIEW_RESPONSE_2026-08.md。
 *
 * 入れ直した1枚は、幾何を実験記録の実画像から実測して確定させたもの。
 * 図の寸法はデザインの都合ではなく事実なので、動かすときは記録に当たり直すこと。
 *
 * 追加するときは、1図1ファイルで作ってここへ登録する。
 * 共通枠は app/components/schematic.tsx（Schematic / Callouts / Overlay / Legend / Readout）。
 * 作図の規約は CLAUDE.md「記事本文への模式図の差し込み」を必ず読むこと。
 */

export const articleDiagrams: Record<string, () => React.JSX.Element> = {}
