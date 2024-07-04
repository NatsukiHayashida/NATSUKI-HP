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
    duration: '2021 ~ ',
    impression: 'CAD/CAM 及びレーザ加工機'
  },
  {
    company: '株式会社 ナベル',
    duration: '2008 ~ 2019',
    impression: '主に工作機械に使用される金属製カバー（テレスコカバー）の設計。 3D CAD（creo), 2D CAD（図脳RAPID）使用'
  },
  // {
  //   company: 'イナオ精工',
  //   duration: '2007 ~ 2008',
  //   impression: ''
  // },
  {
    company: '社会福祉法人 伊賀市社会福祉協議会',
    duration: '1998 ~ 2006',
    impression: ''
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
            <p className="mt-1 mb-4 text-muted-foreground border-border">Although brief, I would like to introduce my work experience.</p>
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
  
