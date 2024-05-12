'use client'

import Image from 'next/image'
import React, { useState } from "react";
import Link from 'next/link'


export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const images = [
    "/image/mask.jpg",
    "/image/CyberFrog.png",
    "/image/laptop-toilet.png",
    "/image/CyberFrog.png",
    "/image/mask.jpg",
    "/image/CyberFrog.png",
  ];

 
  function Badge(props: React.HTMLProps<HTMLAnchorElement>) {
    return (
      <a
        {...props}
        target="_blank"
        className="inline-flex items-center rounded border border-neutral-300 bg-neutral-100 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-400 dark:bg-neutral-600 dark:text-neutral-100"
      />
    );
  }

  const openModal = (imagePath: string) => {
    setModalImage(imagePath);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <main>
      <section>
        <div className="container">
          <h1 className=" my-8 px-2 text-2xl text-foreground tracking-wider ">Hey, I&apos;m Natsuki Hayashida😄</h1>
          <p className='px-2'>{`Lorem ipsum dolor sit amet consectetur adipisicing elit.`}
          <span className=" m-1 ">
            <Badge className='mr-2 ' href="https://www.hanaseisakusyo.com/">
          {/* <Image
            alt="花製作所"
            src="/image/HANA.svg"
            className="m-1"
            width="14"
            height="14"
          /> */}
               
                花製作所
          
              </Badge>
              </span>
            {`Consequatur, commodi.Labore id cupiditate aliquam maiores explicabo dolore. Reiciendis similique nulla et, optio magni minus voluptatibus, accusantium, molestias vitae enim aspernatur?`}</p>
        </div>
      </section>

      <section className='my-8 container'>
      <div className="grid grid-cols-3 grid-rows-2 sm:grid-rows-3 sm:grid-cols-3 gap-2  mx-2 justify-center">
      <div className="relative row-span-1 ">
        <Image
          alt="A man sitting on the open toilet seat, holding his laptop"
          src= "/image/laptop-toilet.png"
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
      <div className="relative row-span-2">
        <Image
          alt="Man standing, eating taco, cap hoodie, jeans, sneakers, beige background."
          src="/image/eat-taco.png"
          fill
          sizes="(max-width: 768px) 213px, 33vw"
          priority
          className="rounded-lg object-cover sm:object-center"
        />
          </div>
      <div className="relative row-span-2">
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

      {showModal && (
        <div
          className="fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div className="relative">
            <Image src={modalImage} width={320} height={240} alt="Eyecatch Image" />
          </div>
        </div>
      )}

      <section className='pb-8'>
      <div className="container">
          <p className='px-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, commodi. Labore id cupiditate aliquam maiores explicabo dolore. Reiciendis similique nulla et, optio magni minus voluptatibus, accusantium, molestias vitae enim aspernatur?</p>
        </div>
      </section>

      <section>
        <div className='container my-4 '>
          <Link href="https://www.hanaseisakusyo.com/" target="_blank" rel="noopener noreferrer">
          <div className="group gap-6 flex transion duration-500 hover:shadow-xl items-center rounded-xl shadow-sm bg-muted border mx-2 p-4">
          <div className="aspect-square  rounded-full overflow-hidden border-1 border-primary-foreground w-20 relative
        group-hover:scale-125 group-hover:shadow-lg
        transition duration-500">
          <Image src="/image/HANA.svg" alt="はなせいさくしょ" width={100} height={100}/>
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-xl mb-1">花製作所</h2>
          <p className="text-muted-foreground">Lorem ipsum dolor sit amet.</p>
        </div>
          </div>
            </Link>
        </div>
        
        <div className='container my-4'>
        <Link href="https://liff.line.me/1645278921-kWRPP32q/?accountId=savvybot" target="_blank" rel="noopener noreferrer">
          <div className="group gap-6 flex transion duration-500 hover:shadow-2xl items-center rounded-xl shadow-sm bg-muted border mx-2 p-4">
          <div className="aspect-square  bg-white rounded-full overflow-hidden border-2 border-primary-foreground w-20 relative
        group-hover:scale-125 group-hover:shadow-lg
        transition duration-500">
          <Image src="/image/SavvyBot.svg" alt="SavvyBot" width={100} height={100}/>
            </div>
        <div className="flex-1">
          <h2 className="font-bold text-xl mb-1">SavvyBot</h2>
        <div className='flex items-end'>
          <Image src="/image/LINE.png" alt="LINE" width={24} height={24}/>
          <p className="text-muted-foreground mx-4">LINEをで動くAIチャットボット</p>
        </div>
        </div>
            </div>
            </Link>
        </div>
      </section>

      <section>
        <div className='container my-8'>
        <p className='px-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, commodi. Labore id cupiditate aliquam maiores explicabo dolore. Reiciendis similique nulla et, optio magni minus voluptatibus, accusantium, molestias vitae enim aspernatur?</p>
        </div>
        </section>
    </main>
  );
}