import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"
import { navItems } from '@/lib/navigation'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet"

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent>
      <div className='flex flex-col mt-4 gap-2'>
         {navItems.map((item) => (
           <div className="text-muted-foreground" key={item.label}>
             <SheetClose asChild>
            <Button className=" justify-start text-lg" variant="ghost" asChild>
             <Link href={item.href}>{item.label}</Link>
               </Button>
               </SheetClose>
          </div> 
        ))} 
    </div>
      </SheetContent>
    </Sheet>
  )
}
