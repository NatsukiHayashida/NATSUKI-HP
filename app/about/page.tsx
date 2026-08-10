import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description:
    '冷間鍛造の金型設計を本業に、AIとWebアプリケーションの開発に取り組むエンジニア。製造業の現場課題をプロダクトで解決することを目指しています。',
}

const pillars = [
  {
    no: '01',
    title: '金型設計',
    body: '自動車の保安部品をつくる現場で、冷間鍛造の金型設計・製造に携わっています。CADでの設計から鍛造シミュレーションまで、素材が形になるプロセスの上流を担当しています。',
  },
  {
    no: '02',
    title: 'AI開発',
    body: '製造現場へのAI適用に取り組んでいます。画像による外観検査、会話型AIチャットボット、業務データの分析など、「現場で本当に使えるAI」を模索しています。',
  },
  {
    no: '03',
    title: 'Web開発',
    body: 'Next.jsを中心に、業務アプリからECサイトまで設計・開発しています。現場の課題を拾い上げてプロダクトに落とし込むまでを、一人で完結できるのが強みです。',
  },
]

const services = [
  {
    title: 'Webサイト・アプリケーション開発',
    body: 'ポートフォリオサイト、コーポレートサイト、カスタムWebアプリケーションの設計・開発',
    points: [
      'モダンな技術スタックで高速・保守性の高いサイト',
      'レスポンシブ対応、SEO最適化',
      'Lighthouseスコア90+を目標',
    ],
  },
  {
    title: 'AIチャットボット開発',
    body: 'LINEやWebサイトに組み込める会話型AIの開発',
    points: [
      'LINE公式アカウント向けAIチャットボット（SavvyBot）',
      'LLMを活用した自然な対話システム',
    ],
  },
  {
    title: 'ECサイトカスタム開発',
    body: '既製CMSに頼らない、完全自作ECサイトの構築',
    points: [
      'ECcube → Next.js完全移行プロジェクト',
      'Stripe決済統合、在庫管理システム',
    ],
  },
]

export default function About() {
  return (
    <main className="container max-w-4xl py-14 md:py-20">
      {/* Header */}
      <header className="mb-14 md:mb-20">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-4">About</p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Natsuki Hayashida
        </h1>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
          冷間鍛造の金型設計を本業に、AIとWebアプリケーションの開発に取り組んでいます。
          「もっと効率的なツールがあれば」という現場の実感から独学でプログラミングを始め、
          いまは実際に課題を解決するプロダクトをつくっています。
        </p>
      </header>

      {/* 3本柱 */}
      <section className="mb-14 md:mb-20">
        <div className="divide-y border-t border-b">
          {pillars.map((pillar) => (
            <div
              key={pillar.no}
              className="grid grid-cols-[auto_1fr] gap-x-5 md:gap-x-8 py-6 md:py-8"
            >
              <span className="font-mono text-sm md:text-base text-primary tabular-nums">
                {pillar.no}
              </span>
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-2">{pillar.title}</h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                  {pillar.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="mb-14 md:mb-20">
        <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
          Why I Build
        </h2>
        <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
          <p>
            製造業のエンジニアとして働く中で、「もっと効率的なツールがあれば」「こんな機能があったら便利なのに」と感じることが多くありました。
          </p>
          <p>
            そこから独学でプログラミングを学び始め、今では実際に問題を解決できるアプリケーションを作れるようになりました。
          </p>
          <p>
            仕事の枠を超えて、自分の技術で何かを作る。そんな気持ちでこのサイトを運営しています。
          </p>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-14 md:mb-20">
        <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
          Tech Stack
        </h2>
        <div className="divide-y border-t border-b">
          <div className="grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 py-4 md:py-5">
            <h3 className="text-sm font-semibold">フロントエンド</h3>
            <p className="font-mono text-xs md:text-sm text-muted-foreground leading-relaxed">
              Next.js / React / TypeScript / Tailwind CSS
            </p>
          </div>
          <div className="grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 py-4 md:py-5">
            <h3 className="text-sm font-semibold">バックエンド & AI</h3>
            <p className="font-mono text-xs md:text-sm text-muted-foreground leading-relaxed">
              Node.js / Python / Supabase / PostgreSQL / LLM API
            </p>
          </div>
          <div className="grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 py-4 md:py-5">
            <h3 className="text-sm font-semibold">ものづくり</h3>
            <p className="font-mono text-xs md:text-sm text-muted-foreground leading-relaxed">
              金型設計 / CAD（Fusion 360） / 鍛造シミュレーション
            </p>
          </div>
          <div className="grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 py-4 md:py-5">
            <h3 className="text-sm font-semibold">ツール</h3>
            <p className="font-mono text-xs md:text-sm text-muted-foreground leading-relaxed">
              Git / GitHub / Vercel / Claude Code / Figma
            </p>
          </div>
        </div>
      </section>

      {/* What I Can Do */}
      <section className="mb-14 md:mb-20">
        <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
          What I Can Do
        </h2>
        <div className="divide-y border-t border-b">
          {services.map((service) => (
            <div key={service.title} className="py-6 md:py-8">
              <h3 className="text-base md:text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{service.body}</p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Interests */}
      <section className="mb-14 md:mb-20 grid md:grid-cols-2 gap-10 md:gap-8">
        <div>
          <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
            Current Interests
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">—</span>
              <span>AIエージェントの実務活用</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">—</span>
              <span>製造現場へのAI画像検査の適用</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">—</span>
              <span>鍛造シミュレーションと実測の突き合わせ</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">—</span>
              <span>異なる領域の知識をつなぐこと（接続ノート）</span>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
            Off the Clock
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">—</span>
              <span>生成AIでのイラスト制作</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">—</span>
              <span>タコスが好き</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">—</span>
              <span>妻が運営する花製作所のWebサイトも制作</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t pt-10 md:pt-14">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-4">Contact</p>
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4">
          一緒に何か作りませんか？
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mb-6 leading-relaxed">
          Web開発のご相談、技術的な質問、または単純に技術について話したい方、気軽にお問い合わせください。通常24時間以内にご返信します。
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 border border-primary text-primary px-5 py-2.5 font-mono text-xs tracking-[0.15em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Get in touch
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 border px-5 py-2.5 font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
          >
            View projects
          </Link>
        </div>
      </section>
    </main>
  )
}
