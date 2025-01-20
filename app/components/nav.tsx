import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'

const navItems = [
    {href: '/', label: 'Home'},
    {href: '/blog', label: 'Blog'},
    {href: '/ai', label: 'AI'},
    {href: '/contact', label: 'Contact'},
]

export default function Nav() {
  return (
      <div>
          <ul className='flex gap-4'>
                {navItems.map((item) => (
                    <li key={item.label} >
                        <Button variant="ghost" asChild>
                            <Link href={item.href}>{item.label}</Link>
                        </Button>
                    </li>
                ))}
            </ul>
    </div>
  )
}
