
import Image from 'next/image'
import Link from 'next/link'


export default function Home() {
  return (
    <main>
      <section>
        <div className="container">
          <h1 className=" my-8 p-2 md:text-2xl text-lg text-foreground ">Hey, I&apos;m Natsuki Hayashida 😄</h1>
          {/* 普段は工場でCADとCAMを扱っていますが、夜はフロントエンド開発やAIに没頭しています。
          このサイトは私のテクノロジーの遊び場で、旅を共有し、志を同じくする仲間と繋がる場所です。私がインスピレーションを受けるように、皆さんにも何かの刺激を与えられたら嬉しいです。
          訪問してくださってありがとう。一緒にこの旅を楽しみましょう！ */}
          <div className='mx-2 '>
            <p className=' font-light mb-2'>{`Usually  I work with CAD and CAM in a factory, but personally, I'm really into studying front-end development and AI.`}</p>
            <p className='font-light mb-2'>{`This site is my tech playground, where I share my journey and connect with like-minded folks. I hope it inspires you as much as it inspires me.`}</p>
            <p className='font-light'>{`Thanks for stopping by, and let's enjoy this ride togethere`}✌️</p>
          </div>
        </div>
      </section>

      <section className='my-8 container'>
        <div className="grid grid-cols-3 grid-rows-2 sm:grid-rows-3 sm:grid-cols-3 gap-2  mx-2 justify-center">
          <div className="relative row-span-1 ">
            <Image
              alt="A man sitting on the open toilet seat, holding his laptop"
              src="/image/laptop-toilet.png"
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover object-top sm:object-center"
            />
          </div>
          <div className="relative sm:row-span-2 ">
            <Image
              alt="a Cyber Frog walks with his camera"
              src="/image/CyberFrog.png"
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover object-top sm:object-center"
            />
          </div>
          <div className="relative row-span-1">
            <Image
              alt="monster by alec monopoly, black on white"
              src="/image/Monster.png"
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover"
            />
          </div>
          <div className="relative md:row-span-2 row-span-1">
            <Image
              alt="Man standing, eating taco, cap hoodie, jeans, sneakers, beige background."
              src="/image/eat-taco.png"
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover sm:object-center"
            />
          </div>
          <div className="relative  md:row-span-2 row-span-1">
            <Image
              alt="My badge on top of a pile of badges from a Vercel meetup we held"
              src="/image/Man-bg-yellow.png"
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover"
            />
          </div>
          <div className="relative h-48">
            <Image
              alt="art sketch, simple vector outline drawing, sketch images, hand drawn, white background,prompt: A restaurant serving Spanish tacos in a huge plate simple color"
              src="/image/TACOS.png"
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover sm:object-center"
            />
          </div>
        </div>
      </section>


      <section className='pb-4'>
        <div className="container">
          {/* また、私はMidjourneyを活用してイラストを生成することにも興味を持っています。クリエイティブな表現の一環として、AIを使ってビジュアルコンテンツを生み出すことに魅力を感じています。
          このサイトはNext.jsとTypeScriptを使用し、Vercelで高速にホスティングしています。これにより、効率的かつ安定した開発が可能です。 */}
          <p className='font-light px-2 mb-2 '>{`Additionally, I'm fascinated by using Midjourney to generate illustrations. As a part of my creative expression, I find it appealing to create visual content with AI.`}</p>
          <p className='font-light px-2 '>{`This site is built using Next.js and TypeScript, and is hosted on Vercel for optimal performance. This setup enables efficient and stable development.`}</p>
        </div>
      </section>

      <section>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 mx-1 md:grid-cols-2 gap-1 md:gap-4">
            <div className='my-2 '>
              <Link href="https://www.hanaseisakusyo.com/" target="_blank" rel="noopener noreferrer">
                <div className="group flex transition duration-500 hover:shadow-xl items-center rounded-xl shadow-sm bg-muted border p-2 md:p-4">
                  <div className="aspect-square rounded-full overflow-hidden border-1 border-primary-foreground w-20 relative group-hover:scale-125 group-hover:shadow-lg transition duration-500 mr-4">
                    <Image src="/image/HANA.svg" alt="はなせいさくしょ" width={100} height={100} />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-medium text-lg mb-1">花製作所</h2>
                    <p className="text-xs text-muted-foreground ml-1">💐 花オタク25年。<br />WEBにて販売しております。</p>
                  </div>
                </div>
              </Link>
            </div>
            
            <div className='my-2'>
              <Link href="https://liff.line.me/1645278921-kWRPP32q/?accountId=savvybot" target="_blank" rel="noopener noreferrer">
                <div className="group flex transition duration-500 hover:shadow-2xl items-center rounded-xl shadow-sm bg-muted border p-2 md:p-4">
                  <div className="aspect-square bg-white rounded-full overflow-hidden border-2 border-primary-foreground w-20 relative group-hover:scale-125 group-hover:shadow-lg transition duration-500 mr-4">
                    <Image src="/image/SavvyBot.svg" alt="SavvyBot" width={100} height={100} />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-medium text-lg mb-2">SavvyBot</h2>
                    <div className='flex items-center'>
                      <Image src="/image/LINE.png" alt="LINE" width={24} height={24} />
                      <p className="text-xs text-muted-foreground ml-1">LINEで動くAIチャットボット</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className='mb-8'>
        <div className='container my-4'>
          {/* 1. 花製作所=このサイトは私が初めて作成したもので、現在も運営中です。「花製作所」は、妻が手作りするフラワーリースやスワッグを販売するオンラインショップです。製品は月に2回更新し、各アイテムの魅力を丁寧に紹介しています。
          2. SavvyBot=「SavvyBot」は、コミュニケーションアプリ「LINE」で使用できるAIボットです。GPT-3.5を採用しており、ユーザーとの対話を通じて質問に答えたり、情報を提供したりすることができます。このボットは、効率的なコミュニケーションをサポートし、日常のやり取りをスムーズにします。 */}
          <p className='font-light px-2 mb-2'>{`This is the first site I ever created and it's still active. `}&nbsp;
          <Link className=' font-semibold dark:font-medium text-pink-900  dark:text-pink-500 ' href="https://www.hanaseisakusyo.com/" target="_blank" rel="noopener noreferrer">花製作所</Link>
           {` is an online shop selling handmade flower wreaths and swags crafted by my wife. We update the products bi-monthly, carefully showcasing the charm of each item.`}</p>
          <p className='font-light px-2 '>
          <Link className='font-semibold dark:font-medium text-teal-700  dark:text-teal-500 '  href="https://liff.line.me/1645278921-kWRPP32q/?accountId=savvybot"target="_blank" rel="noopener noreferrer">SavvyBot</Link>
            {` is an AI bot that operates within the communication app LINE It utilizes GPT-4o to interact with users, answering questions and providing information. This bot facilitates efficient communication and smoothens daily interactions.`}</p>
        </div>
      </section>
    </main>
  );
}
