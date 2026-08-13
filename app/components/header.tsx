import React from 'react'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import MobileNav from './mobile-nav'
import Nav from './nav'
import SoundFx from './sound-fx'

export default function Header() {
    return (
        <header className='border-b'>
            <div className='container max-w-5xl flex h-16 items-center justify-between'>
                <Link
                    href='/'
                    className='font-mono text-sm font-medium tracking-[0.2em] uppercase hover:text-primary transition-colors'
                >
                    N.Hayashida
                </Link>
                <div className='flex items-center gap-2'>
                    <div className="hidden md:block">
                        <Nav />
                    </div>
                    <SoundFx />
                    <ModeToggle />
                    <div className="block md:hidden">
                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    )
}
