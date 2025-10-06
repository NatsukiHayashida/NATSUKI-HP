import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Code2, Sparkles, Zap, Target, Lightbulb, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About | Natsuki Portfolio',
  description: 'CAD/CAMエンジニア × Web Developer × AI Enthusiast。製造業の現場から最新のWeb技術とAIを活用したアプリケーション開発に挑戦しています。',
}

export default function About() {
  return (
    <main className="container py-12">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Natsuki Hayashida
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            CAD/CAMエンジニア × Web Developer × AI Enthusiast
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Next.js
            </span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              React
            </span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              TypeScript
            </span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              AI Integration
            </span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              OpenAI API
            </span>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto pt-4">
            普段はCAD/CAMエンジニア、個人では最新のWeb技術とAIを活用したアプリケーション開発に取り組んでいます。
          </p>
        </section>

        {/* Story Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">なぜ開発をするのか</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              製造業のエンジニアとして働く中で、「もっと効率的なツールがあれば...」「こんな機能があったら便利なのに...」と感じることが多くありました。
            </p>
            <p>
              そこから独学でプログラミングを学び始め、今では実際に問題を解決できるアプリケーションを作れるようになりました。
            </p>
            <p>
              仕事の枠を超えて、自分の技術で何かを作る。そんな気持ちでこのサイトを運営しています。
            </p>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Code2 className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">Tech Stack</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-6 space-y-3">
              <h3 className="text-xl font-semibold">フロントエンド</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium text-foreground">Expert</p>
                  <p className="text-muted-foreground">Next.js, React, TypeScript, Tailwind CSS</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Proficient</p>
                  <p className="text-muted-foreground">HTML5, CSS3, Responsive Design</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Exploring</p>
                  <p className="text-muted-foreground">Framer Motion, Three.js</p>
                </div>
              </div>
            </div>

            <div className="border rounded-xl p-6 space-y-3">
              <h3 className="text-xl font-semibold">バックエンド & AI</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium text-foreground">Expert</p>
                  <p className="text-muted-foreground">Node.js, OpenAI API, REST API</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Proficient</p>
                  <p className="text-muted-foreground">Firebase, Vercel, PostgreSQL</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Exploring</p>
                  <p className="text-muted-foreground">Supabase, LangChain</p>
                </div>
              </div>
            </div>

            <div className="border rounded-xl p-6 space-y-3 md:col-span-2">
              <h3 className="text-xl font-semibold">ツール & プラットフォーム</h3>
              <p className="text-sm text-muted-foreground">
                Git, GitHub, Vercel, Netlify, VSCode, Figma
              </p>
            </div>
          </div>
        </section>

        {/* What I Offer Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">What I Can Do For You</h2>
          </div>
          <div className="grid md:grid-cols-1 gap-6">
            <div className="border rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-semibold">Webサイト・アプリケーション開発</h3>
              <p className="text-muted-foreground">
                ポートフォリオサイト、コーポレートサイト、カスタムWebアプリケーションの設計・開発
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>モダンな技術スタックで高速・保守性の高いサイト</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>レスポンシブ対応、SEO最適化</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Lighthouseスコア90+を目標</span>
                </li>
              </ul>
            </div>

            <div className="border rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-semibold">AIチャットボット開発</h3>
              <p className="text-muted-foreground">
                LINEやWebサイトに組み込める会話型AIの開発
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>LINE公式アカウント向けAIチャットボット（SavvyBot）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>GPT-4を活用した自然な対話システム</span>
                </li>
              </ul>
            </div>

            <div className="border rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-semibold">ECサイトカスタム開発</h3>
              <p className="text-muted-foreground">
                既製CMSに頼らない、完全自作ECサイトの構築
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>ECcube → Next.js完全移行プロジェクト（進行中）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Stripe決済統合、在庫管理システム</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* My Approach Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">My Approach</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <span className="text-2xl">📱</span>
              <div>
                <h3 className="font-semibold">モバイルファースト</h3>
                <p className="text-sm text-muted-foreground">スマホでの体験を最優先</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <span className="text-2xl">⚡</span>
              <div>
                <h3 className="font-semibold">パフォーマンス重視</h3>
                <p className="text-sm text-muted-foreground">表示速度とUXにこだわり</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <span className="text-2xl">🎨</span>
              <div>
                <h3 className="font-semibold">デザイン思考</h3>
                <p className="text-sm text-muted-foreground">見た目と使いやすさの両立</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <span className="text-2xl">🔄</span>
              <div>
                <h3 className="font-semibold">継続的改善</h3>
                <p className="text-sm text-muted-foreground">データと検証に基づく改善サイクル</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border rounded-lg md:col-span-2">
              <span className="text-2xl">📚</span>
              <div>
                <h3 className="font-semibold">ドキュメント重視</h3>
                <p className="text-sm text-muted-foreground">将来の保守性を考慮</p>
              </div>
            </div>
          </div>
        </section>

        {/* Current Focus Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">今、興味があること</h2>
          </div>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Next.js App Routerの最適化パターン</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>AIエージェントの実用的な活用方法</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>パフォーマンス最適化（Core Web Vitals）</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>アクセシビリティの向上</span>
            </li>
          </ul>
        </section>

        {/* Personal Touch Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">仕事以外では</h2>
          </div>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Midjourneyでのイラスト生成が趣味</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>タコスが好き（このサイトの画像でもわかる通り😄）</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>妻が運営する花製作所のWebサイトも制作中</span>
            </li>
          </ul>
        </section>

        {/* CTA Section */}
        <section className="border-t pt-12">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">一緒に何か作りませんか？</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Web開発のご相談、技術的な質問、または単純に技術について話したい方、気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                お問い合わせ
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
              >
                プロジェクトを見る
              </Link>
            </div>
            <div className="pt-6 space-y-1 text-sm text-muted-foreground">
              <p>
                <strong>Response Time:</strong> 通常24時間以内にご返信します
              </p>
              <p>
                <strong>Languages:</strong> 日本語 / English
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
