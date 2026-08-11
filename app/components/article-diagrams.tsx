/**
 * 記事本文に差し込む模式図の登録表。
 * MDX 側に <figure data-diagram="キー"></figure> と書くと、ここに登録した図が本文中に描画される。
 * 差し替えは app/projects/[slug]/page.tsx の figure レンダラが行う。
 *
 * **図は 2026-08-11 にすべて撤去した（登録ゼロ）。**
 * 作り直しを重ねても「名称を隠すと何の比較か分からない」水準を越えられなかったため、
 * 仕組みだけ残して中身を落とした。経緯は claudedocs/DIAGRAM_REVIEW_RESPONSE_2026-08.md。
 *
 * 入れ直すときは、1図1ファイルで作ってここへ登録する。
 * 共通枠は app/components/schematic.tsx（Schematic / Callouts / Overlay / Legend / Readout）。
 * 作図の規約は CLAUDE.md「記事本文への模式図の差し込み」を必ず読むこと。
 */
export const articleDiagrams: Record<string, () => React.JSX.Element> = {}
