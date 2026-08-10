import Link from 'next/link'
import React from 'react'
import { navItems } from '@/lib/navigation'

export default function Nav() {
  return (
    <nav>
      <ul className='flex items-center gap-6 mr-4'>
        {navItems.filter((item) => item.href !== '/').map((item) => (
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
    </nav>
  )
}
