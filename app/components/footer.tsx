import React from 'react'
import Link from 'next/link'
import { navItems } from '@/lib/navigation'

export default function Footer() {
  return (
    <footer className='sticky top-full border-t'>
      <div className='container max-w-5xl py-8 flex flex-col md:flex-row items-center justify-between gap-4'>
        <ul className='flex flex-wrap items-center gap-x-6 gap-y-2'>
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className='font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors'
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className='font-mono text-xs text-muted-foreground/60'>
          &copy; {new Date().getFullYear()} Natsuki Hayashida
        </p>
      </div>
    </footer>
  )
}
