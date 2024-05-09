import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const tags = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
//   { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
]

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
         {tags.map((tag) => (
          <li className="list-none text-muted-foreground" key={tag.label}>
            <Button className=" justify-start text-lg" variant="ghost" asChild>
             <Link href={tag.href}>{tag.label}</Link>
            </Button>
          </li> 
        ))} 
    </div>
      </SheetContent>
    </Sheet>
  )
}
