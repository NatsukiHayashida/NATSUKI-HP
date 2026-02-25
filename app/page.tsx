import Image from 'next/image'
import Link from 'next/link'
import { getAllConnections } from '@/lib/connections'
import { getAllProjects } from '@/lib/projects'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Mountain, ArrowRight } from 'lucide-react'

export default function Home() {
  const recentNotes = getAllConnections().slice(0, 3)
  const recentProjects = getAllProjects().slice(0, 3)
  return (
    <main className="pt-4">
      <section className="py-12 md:py-16">
        <div className="container max-w-5xl">
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary">製造業</Badge>
            <Badge variant="secondary">AI開発</Badge>
            <Badge variant="secondary">Web開発</Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            こんにちは、
          </h1>
          <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
            <p>
              普段は自動車の保安部品をつくる仕事に携わっていて、冷間鍛造の技術を中心に開発業務を行っています。
            </p>
            <p>
              一方で、AI や Web アプリの開発にも取り組み、現場での気づきをプロダクトや仕組みに落とし込むことを楽しんでいます。
            </p>
            <p>
              このサイトは、そんな私のプレイグラウンド。プロジェクトの記録や学んだことをシェアしています。
            </p>
            <p>
              成功も失敗も、そのすべてを含めて共有していきますので、気軽にのぞいてください。
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link href="/projects">プロジェクトを見る</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/connections">接続ノートを読む</Link>
            </Button>
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
                priority
                sizes="(max-width: 768px) 50vw, 33vw"
                className="rounded-xl object-cover"
              />
            </div>
            <div className="relative h-full row-span-2">
              <Image
                alt="a Cyber Frog walks with his camera"
                src="/image/CyberFrog.png"
                fill
                priority
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

      <section className="py-12">
        <div className="container max-w-5xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold">
              Projects
            </h2>
            <Button variant="ghost" asChild>
              <Link href="/projects" className="gap-2">
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`}>
                <Card variant="interactive" className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="tag">{project.category}</Badge>
                    </div>
                    <CardTitle className="text-xl line-clamp-2">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-muted-foreground text-xs self-center">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-5xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold">
              接続ノート
            </h2>
            <Button variant="ghost" asChild>
              <Link href="/connections" className="gap-2">
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentNotes.map((note) => (
              <Link key={note.slug} href={`/connections/${note.slug}`}>
                <Card variant="interactive" className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                      <time>
                        {new Date(note.date).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          timeZone: 'Asia/Tokyo'
                        })}
                      </time>
                      <span>•</span>
                      <span>{note.readingTime}</span>
                    </div>
                    <CardTitle className="text-xl line-clamp-2">{note.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {note.connections.join(' / ')}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
