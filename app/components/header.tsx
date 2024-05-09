import React from 'react'
import Logo from './logo'
import { ModeToggle } from '@/components/mode-toggle'
import MobileNav from './mobile-nav'
import Nav from './nav'

const navItems = [
    {href: '/', label: 'Home'},
    {href: '/about', label: 'About'},
    {href: '/contact', label: 'Contact'},
]

export default function Header() {
    return (
        <div className='container flex h-24 items-center  justify-between '>
            <Logo />
            <div className='flex gap-2'>
            <div className='block :md:hidden'>
                 <ModeToggle />
            </div>
            <div className="block md:hidden">
                <MobileNav />
            </div>
            <div className="hidden md:block">
                <Nav />
                </div>
            <div className='hidden md:block'>
                 <ModeToggle />
            </div>
            </div>
        </div>
  )
}
