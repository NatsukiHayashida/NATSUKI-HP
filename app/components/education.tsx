import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

  
  const educationHistory = [
    {
      school: '英知大学 文学部 スペイン語',
      duration: '1994 ~ 1998',
      impression: ''
    },
    {
      school: '南山国際高校 高等部',
      duration: '1991~ 1994',
      impression: ''
    },
    {
      school: '南山中学校 国際部',
      duration: '2007 ~ 2010',
      impression: ''
    },
    
  ];

  
  export default function Education() {
    return (
     <div className="container">
      <Accordion type="single" collapsible  >
       <AccordionItem value="item-1">
            <AccordionTrigger>
              <h1 className='text-4xl font-normal hover:no-underline'>Education</h1>
            </AccordionTrigger>
            <p className="mt-1 mb-4 text-muted-foreground border-border">This is my educational background.</p>
      <AccordionContent>
      <ul >
      {educationHistory.map((education, index) => (
        <li key={index} className="my-4 px-2 border-t">
          <div className="flex items-baseline mb-1">
            <h2 className="mt-4 text-xl tracking-wider font-sans leading-normal ">{education.school}</h2>
            <p className=" mx-6 text-sm text-muted-foreground font-sans font-light tracking-wider ">{education.duration}</p>
          </div>
          <p className="mb-4">{education.impression}</p>
        </li>
      ))}
    </ul>
    </AccordionContent>
  </AccordionItem>
</Accordion>
            
      </div>
    )
  }
  
