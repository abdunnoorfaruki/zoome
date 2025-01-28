import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex justify-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
     <Link   href='/' className="flex items-center gap-2 text-white">
        <Image src='/icons/logo.svg' alt='Zoome Logo' width={32} height={32} />
        <p className='text-2xl font-extrabold'>Zoome</p>
     </Link>

     <div className='flex-between gap-5 ' >
        {/* Clerk user management */}
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav  />
     </div>
    </nav>
  )
}

export default Navbar
