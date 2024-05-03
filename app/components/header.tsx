import Link from 'next/link'
import React from 'react'
import Logo from './logo'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'

const navItems = [
    {href: '/', label: 'Home'},
    {href: '/about', label: 'About'},
    {href: '/contact', label: 'Contact'},
]

export default function Header() {
    return (
        <div className='container flex h-24 items-center  justify-between '>
            <Logo />
            <ul className='flex gap-4'>
                {navItems.map((item) => (
                    <li key={item.label} >
                        <Button variant="ghost" asChild>
                            <Link href={item.href}>{item.label}</Link>
                        </Button>
                    </li>
                ))}
                <ModeToggle />
            </ul>
        </div>
  )
}
