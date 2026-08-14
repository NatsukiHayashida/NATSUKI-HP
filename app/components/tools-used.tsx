/**
 * この基盤を何で作って、何で外から届けているかを並べる。
 * 内容は ~/work/project-hub/README.md と記事本文から起こした（推測を入れない）。
 *
 * **アイコンについて**
 * 本人が用意した icons8 の「Clawd sparkles」を使っている
 * （原本は public/image/logos/claude-code.svg。SVGはここに直に写してある）。
 * Anthropic の公式マークではなく第三者の作ったアイコン。
 * **icons8 の無料ライセンスは icons8 への表示を求める**ため、下に出典を出している。
 * 公式マークが手に入ったら、このアイコンごと差し替えてよい。
 *
 * 接続の話は「何を使っているか」までにとどめ、
 * ホスト名・ポート・認証の作りは書かない（記事本文も同じ方針）。
 */

const TOOLS = [
  {
    name: 'Claude Code',
    kind: '主に使っている道具',
    body: '設計から実装まで、この基盤はほぼCCで書いた。用途に応じて Haiku / Sonnet / Opus / Fable を切り替えている。スマホから投げた指示を、PC側で無人実行させることもできる。',
    accent: true,
  },
  {
    name: 'Python（標準ライブラリのみ）',
    kind: 'サーバーと画面',
    body: '外部パッケージはゼロ。フレームワークもビルド工程も使っていない。壊れる要素が少ないほど長く動く、という判断。',
  },
  {
    name: 'Tailscale',
    kind: '外から届ける経路',
    body: 'VPNで作った閉域網の中だけに公開している。インターネットへ出す機能は使わない。扱うファイルに業務の情報が含まれるため、ここは最初から選択肢にしていない。',
  },
]

/** icons8「Clawd sparkles」。色は原本のまま（朱 #d77757・青 #0091ff） */
function ClaudeMark() {
  return (
    <svg viewBox="0 0 48 48" width="28" height="28" aria-hidden className="shrink-0">
      <rect width="36" height="24" x="6" y="18" fill="#d77757" />
      <rect width="3" height="9" x="9" y="39" fill="#d77757" />
      <rect width="3" height="9" x="15" y="39" fill="#d77757" />
      <rect width="3" height="9" x="30" y="39" fill="#d77757" />
      <rect width="3" height="9" x="36" y="39" fill="#d77757" />
      <rect width="7.5" height="6" y="33" fill="#d77757" />
      <rect width="7.5" height="6" x="40.5" y="33" fill="#d77757" />
      <rect width="3" height="6" x="12" y="24" />
      <rect width="3" height="6" x="33" y="24" />
      <rect width="3" height="7" x="39" y="4" fill="#0091ff" />
      <rect width="3" height="7" x="39" y="4" fill="#0091ff" transform="rotate(90 40.5 7.5)" />
      <rect width="3" height="13" x="21" fill="#0091ff" />
      <rect width="3" height="13" x="21" fill="#0091ff" transform="rotate(90 22.5 6.5)" />
      <rect width="3" height="3" x="31" y="12" fill="#0091ff" />
      <rect width="7" height="7" x="19" y="3" fill="#0091ff" />
    </svg>
  )
}

function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <ClaudeMark />
      <span className="font-mono text-[13px] font-semibold uppercase tracking-[0.22em] text-primary">
        Claude Code
      </span>
    </span>
  )
}

export function ToolsUsed() {
  return (
    <figure className="not-prose my-12 md:my-16">
      <ul className="mx-auto max-w-[640px] divide-y divide-border border-y border-border">
        {TOOLS.map((t) => (
          <li key={t.name} className="py-6 md:py-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {t.kind}
            </p>
            <div className="mt-2">
              {t.accent ? (
                <Wordmark />
              ) : (
                <span className="text-[15px] font-semibold tracking-tight">{t.name}</span>
              )}
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground md:text-sm">
              {t.body}
            </p>
          </li>
        ))}
      </ul>
      {/* icons8 の無料ライセンスは出典の表示を求める */}
      <figcaption className="mx-auto mt-4 max-w-[640px] font-mono text-[10px] tracking-[0.08em] text-muted-foreground">
        アイコン: Clawd sparkles by icons8
      </figcaption>
    </figure>
  )
}
