/**
 * この基盤を何で作って、何で外から届けているかを並べる。
 * 内容は ~/work/project-hub/README.md と記事本文から起こした（推測を入れない）。
 *
 * **Claude Code のロゴについて**
 * Anthropic の公式マークは手元に無く、記憶で似せて描くと別物になるため、
 * ここでは文字組みで置いている。公式のSVGを
 *   public/image/logos/claude-code.svg
 * に置いて、下の Wordmark を <Image> に差し替えれば入れ替わる。
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

function Wordmark() {
  return (
    <span className="inline-flex items-baseline gap-[0.4em] font-mono text-[13px] font-semibold uppercase tracking-[0.22em] text-primary">
      Claude Code
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
