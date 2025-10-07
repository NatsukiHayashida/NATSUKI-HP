import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3)
  return (
    <main className="pt-8">
      <section className="py-12">
        <div className="container max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Hey, I&apos;m Natsuki Hayashida 😄</h1>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              Usually I work with CAD and CAM in a factory, but personally, I&apos;m really into studying front-end development and AI.
            </p>
            <p>
              This site is my tech playground, where I share my journey and connect with like-minded folks. I hope it inspires you as much as it inspires me.
            </p>
            <p>
              Thanks for stopping by, and let&apos;s enjoy this ride together ✌️
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
            <div className="relative h-full">
              <Image
                alt="A man sitting on the open toilet seat, holding his laptop"
                src="/image/laptop-toilet.png"
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="rounded-xl object-cover"
              />
            </div>
            <div className="relative h-full row-span-2">
              <Image
                alt="a Cyber Frog walks with his camera"
                src="/image/CyberFrog.png"
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="rounded-xl object-cover"
              />
            </div>
            <div className="relative h-full">
              <Image
                alt="monster by alec monopoly, black on white"
                src="/image/Monster.png"
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="rounded-xl object-cover"
              />
            </div>
            <div className="relative h-full row-span-2">
              <Image
                alt="Man standing, eating taco, cap hoodie, jeans, sneakers, beige background."
                src="/image/eat-taco.png"
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="rounded-xl object-cover object-[center_20%]"
              />
            </div>
            <div className="relative h-full row-span-2">
              <Image
                alt="My badge on top of a pile of badges from a Vercel meetup we held"
                src="/image/Man-bg-yellow.png"
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="rounded-xl object-cover"
              />
            </div>
            <div className="relative h-full">
              <Image
                alt="art sketch, simple vector outline drawing, sketch images, hand drawn, white background,prompt: A restaurant serving Spanish tacos in a huge plate simple color"
                src="/image/TACOS.png"
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>


      <section className="py-8">
        <div className="container max-w-5xl">
          <div className="space-y-4 text-muted-foreground">
            <p>
              Additionally, I&apos;m fascinated by using Midjourney to generate illustrations. As a part of my creative expression, I find it appealing to create visual content with AI.
            </p>
            <p>
              This site is built using Next.js and TypeScript, and is hosted on Vercel for optimal performance. This setup enables efficient and stable development.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container max-w-5xl">
          <h2 className="text-2xl font-bold mb-6">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/projects/hanaseisakusyo-rebuild" className="group block">
              <div className="flex flex-col gap-4 p-6 rounded-xl border bg-card hover:border-primary transition-all hover:shadow-lg">
                <div className="aspect-square rounded-full overflow-hidden w-16 h-16">
                  <Image src="/image/HANA.svg" alt="花製作所" width={64} height={64} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">花製作所サイト移行</h3>
                  <p className="text-sm text-muted-foreground">EC-CUBE → Next.js + Supabase</p>
                </div>
              </div>
            </Link>

            <Link href="/projects/savvybot" className="group block">
              <div className="flex flex-col gap-4 p-6 rounded-xl border bg-card hover:border-primary transition-all hover:shadow-lg">
                <div className="aspect-square bg-white rounded-full overflow-hidden w-16 h-16">
                  <Image src="/image/SavvyBot.svg" alt="Savybot" width={64} height={64} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">Savybot バージョンアップ</h3>
                  <p className="text-sm text-muted-foreground">AI チャットアプリの進化記録</p>
                </div>
              </div>
            </Link>

            <Link href="/projects/hobby" className="group block">
              <div className="flex flex-col gap-4 p-6 rounded-xl border bg-card hover:border-primary transition-all hover:shadow-lg">
                <div className="aspect-square rounded-full overflow-hidden w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                  🏔️
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">Hobby</h3>
                  <p className="text-sm text-muted-foreground">山登り・キャンピングカー・サーフィン</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link href="/projects" className="inline-flex items-center gap-2 text-primary hover:underline">
              View all projects →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container max-w-5xl">
          <h2 className="text-2xl font-bold mb-6">Recent Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/articles/${post.slug}`}>
                <Card className="h-full hover:border-primary transition-all hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription>
                      {new Date(post.date).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        timeZone: 'Asia/Tokyo'
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    <div className="mt-4">
                      <Badge variant="secondary">{post.readingTime}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline">
              View all blog posts →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
