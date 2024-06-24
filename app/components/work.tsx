import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
  
import React from 'react'
  

const workHistory = [
  {
    company: '株式会社 富士工業所',
    duration: '2021 ~ 現在',
    impression: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, commodi. Labore id cupiditate aliquam maiores explicabo dolore. Reiciendis similique nulla et, optio magni minus voluptatibus, accusantium, molestias vitae enim aspernatur?'
  },
  {
    company: '株式会社 ナベル',
    duration: '2008 ~ 2019',
    impression: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, commodi. Labore id cupiditate aliquam maiores explicabo dolore. Reiciendis similique nulla et, optio magni minus voluptatibus, accusantium, molestias vitae enim aspernatur?'
  },
  {
    company: 'イナオ精工',
    duration: '2007 ~ 2008',
    impression: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic laboriosam ea repudiandae asperiores minus corrupti doloribus ad necessitatibus magnam aliquid!'
  },
  {
    company: '社会福祉法人 伊賀市社会福祉協議会',
    duration: '1998 ~ 2006',
    impression: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic laboriosam ea repudiandae asperiores minus corrupti doloribus ad necessitatibus magnam aliquid!'
  },
  // 他の勤務先の情報を追加します
];
  
  export default function Work() {
    return (
     <div className="container">
      <Accordion type="single" collapsible  >
       <AccordionItem value="item-1">
            <AccordionTrigger>
              <h1 className='text-4xl font-normal hover:no-underline'>Work history</h1>
            </AccordionTrigger>
            <p className="mt-1 mb-4 text-muted-foreground border-border">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi vitae esse quam minima? Unde eligendi, veniam molestiae iste exercitationem eius blanditiis hic vel perspiciatis tempora temporibus aperiam numquam! Harum, magnam!</p>
      <AccordionContent>
      <ul >
      {workHistory.map((work, index) => (
        <li key={index} className="my-4 px-2 border-t">
          <div className="flex items-baseline mb-1">
            <h2 className="mt-4 text-xl tracking-wider font-sans leading-normal ">{work.company}</h2>
            <p className=" mx-6 text-sm text-muted-foreground font-sans font-light tracking-wider ">{work.duration}</p>
          </div>
          <p className="mb-4">{work.impression}</p>
        </li>
      ))}
    </ul>
    </AccordionContent>
  </AccordionItem>
</Accordion>
            
      </div>
    )
  }
  
