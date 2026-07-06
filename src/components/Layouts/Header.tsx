import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'

const menuOptions = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Pricing",
        path: "/pricing"
    },
    {
        name: "Contact",
        path: "/contact"
    }
]

function Header() {
    const { user } = useUser()
    return (
        <header className='flex justify-between items-center p-4 border-b fixed w-full top-0 z-50 bg-white'>
            {/* Logo */}
            <div className='flex items-center gap-2'>
                <Image src="/assets/logo.svg" alt="logo" height={30} width={30} />
                <Link href="/">
                    <h2 className="font-bold text-2xl hover:scale-95 transition-all duration-400 text-primary">AI Trip Planner</h2>
                </Link>
            </div>

            {/* Menu Options */}
            <div className='flex items-center gap-10'>
                {menuOptions.map((menu, index) => (
                    <Link key={index} href={menu.path} className="text-gray-600 hover:text-gray-900">
                        <h2 className="text-lg hover:scale-105 transition-all text-primary hover:text-primary/50 duration-500">{menu.name}</h2>
                    </Link>
                ))}
            </div>

            {/* Get Started Btn */}
            {!user ?
                <SignInButton mode="modal">
                    <Button className="cursor-pointer text-white">
                        Get Started
                    </Button>
                </SignInButton>
                :
                <Link href={'/create-trip'}>
                    <Button className="cursor-pointer">Create New Trip</Button>
                </Link>
            }
        </header>
    )
}

export default Header