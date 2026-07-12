"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Menu } from 'lucide-react'
import { menuOptions } from '../data';
import { HeaderMobileNavProps } from '@/types'
import { usePathname } from 'next/navigation'

function HeaderMobileNav({ isSignedIn }: HeaderMobileNavProps) {

    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="h-6 w-6 cursor-pointer" />
            </SheetTrigger>

            <SheetContent side="left">
                <div className="flex flex-col gap-10 pt-20 items-center h-full">
                    <div className='flex flex-col justify-center items-center p-5 gap-10'>
                        {menuOptions.map((menu, index) => (
                            <Link key={index} href={menu.path} className="text-gray-600 hover:text-gray-900">
                                <h2 className="text-lg hover:scale-105 transition-all text-primary hover:text-primary/50 duration-500">{menu.name}</h2>
                            </Link>
                        ))}
                    </div>

                    {/* Get Started Btn */}
                    {!isSignedIn ?
                        <SignInButton mode="modal">
                            <Button className="cursor-pointer text-white">
                                Get Started
                            </Button>
                        </SignInButton>
                        :
                        <Link href={'/create-new-trip'}>
                            <Button className="cursor-pointer">Create New Trip</Button>
                        </Link>
                    }
                </div>
            </SheetContent>
        </Sheet>
    );
}


function Header() {
    const { user, isLoaded } = useUser()
    const path = usePathname()

    if (!isLoaded) {
        return null;
    }
    return (
        <header className='flex justify-between items-center p-4 border-b fixed w-full top-0 z-50 bg-white'>
            {/* Logo */}
            <div className='flex items-center w-full max-w-75 lg:max-w-150 gap-2'>
                <Image src="/assets/logo.svg" alt="logo" height={30} width={30} />
                <Link href="/">
                    <h2 className="font-bold text-2xl hover:scale-95 transition-all duration-400 text-primary">AI Trip Planner</h2>
                </Link>
            </div>
            {/* Menu Options */}
            <div className='hidden md:flex items-center w-full justify-between gap-10'>
                <div className='flex items-center w-full gap-10'>
                    {menuOptions.map((menu, index) => (
                        <Link key={index} href={menu.path} className="text-gray-600 hover:text-gray-900">
                            <h2 className="text-lg hover:scale-105 transition-all text-primary hover:text-primary/50 duration-500">{menu.name}</h2>
                        </Link>
                    ))}
                </div>

                {/* Get Started Btn */}
                <div className="flex gap-5 items-center">
                    {!user ?
                        <SignInButton mode="modal">
                            <Button className="cursor-pointer text-white">
                                Get Started
                            </Button>
                        </SignInButton>
                        :
                        path === "/create-new-trip" ? <Link href={'/my-trips'}>
                            <Button className="cursor-pointer">My Trips</Button>
                        </Link> :
                            path.startsWith("/view-trip") ? <Link href={'/my-trips'}>
                                <Button className="cursor-pointer">View My Trips</Button>
                            </Link> :
                                <Link href={'/create-new-trip'}>
                                    <Button className="cursor-pointer">Create New Trip</Button>
                                </Link>
                    }

                    <UserButton />
                </div>
            </div>

            <div className="md:hidden">
                <HeaderMobileNav isSignedIn={!!user} />
            </div>
        </header>
    )
}

export default Header