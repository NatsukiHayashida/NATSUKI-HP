'use client'

import Image from 'next/image'
import React, { useState } from "react";
import Link from 'next/link'


export default function Works() {
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const images = [
    "/image/mask.jpg",
    "/image/mir.jpg",
    "/image/laptop-toilet.png",
    "/image/mir.jpg",
    "/image/mask.jpg",
    "/image/laptop-toilet.png",
  ];

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
          <h1 className=" my-8 text-2xl text-foreground tracking-wider ">Hey, I&apos;m Natsuki Hayashida😄</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, commodi. Labore id cupiditate aliquam maiores explicabo dolore. Reiciendis similique nulla et, optio magni minus voluptatibus, accusantium, molestias vitae enim aspernatur?</p>
        </div>
      </section>

      <section className='my-8 container'>
        <div className="mx-1 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols3 2xl:grid-cols-3">
          {images.map((img, index) => (
            <div key={index} onClick={() => openModal(img)}>
              <Image
                className="cursor-pointer transition-all  border border-muted rounded-lg"
                src={img}
                width={320}
                height={240}
                alt="Eyecatch Image"
              />
            </div>
          ))}
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
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, commodi. Labore id cupiditate aliquam maiores explicabo dolore. Reiciendis similique nulla et, optio magni minus voluptatibus, accusantium, molestias vitae enim aspernatur?</p>
        </div>
      </section>

      <section>
        <div className='container my-4 '>
          <Link href="https://www.hanaseisakusyo.com/" target="_blank" rel="noopener noreferrer">
          <div className="group gap-6 flex transion duration-500 hover:shadow-xl items-center rounded-xl shadow-sm bg-muted border mx-2 p-6">
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
          <div className="group gap-6 flex transion duration-500 hover:shadow-2xl items-center rounded-xl shadow-sm bg-muted border mx-2 p-6">
          <div className="aspect-square  bg-white rounded-full overflow-hidden border-2 border-primary-foreground w-20 relative
        group-hover:scale-125 group-hover:shadow-lg
        transition duration-500">
          <Image src="/image/SavvyBot.svg" alt="" width={100} height={100}/>
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-xl mb-1">SavvyBot</h2>
          <p className="text-muted-foreground">Lorem ipsum dolor sit amet.</p>
        </div>
          </div>
          </div>
</section>

      <section>
        <div className='container my-8'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, commodi. Labore id cupiditate aliquam maiores explicabo dolore. Reiciendis similique nulla et, optio magni minus voluptatibus, accusantium, molestias vitae enim aspernatur?</p>
        </div>
</section>
    </main>
  );
}
