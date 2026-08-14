/**
 * この基盤を何で作って、何で外から届けているかを並べる。
 * 内容は ~/work/project-hub/README.md と記事本文から起こした（推測を入れない）。
 *
 * **マークについて**
 * 本人が用意した Claude Code の公式マークを使っている。
 * 原本は public/image/logos/claude-code.svg（Claude 単体のマークは claude.svg）。
 * パスはここに直に写してある。差し替えるときは原本のほうも一緒に更新すること。
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

/** Claude Code の公式マーク（原本 public/image/logos/claude-code.svg） */
function ClaudeCodeMark() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden className="shrink-0">
      <title>Claude Code</title>
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        fill="#D97757"
        d="M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z"
      />
    </svg>
  )
}

function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <ClaudeCodeMark />
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
    </figure>
  )
}
