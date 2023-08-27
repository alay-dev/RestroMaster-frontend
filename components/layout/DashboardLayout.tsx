import React, { FC, ReactNode } from 'react'
import { ChefHat, Home, BarChair, Settings, Logout, DonutBitten as Dishes, DonutBitten } from 'solar-icon-set';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';


const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter()


    return (
        <div className='flex w-full pl-24' >
            <nav className='fixed top-0 left-0 flex flex-col items-center w-24 h-screen py-5 text-white bg-blue-500'>
                <ChefHat iconStyle='BoldDuotone' size={35} />
                <ul className='flex flex-col items-center flex-1 w-full mt-16' >

                    <div className={cn('flex items-center justify-center w-full h-12', router.pathname === "/home" && "border-l-4 border-white bg-blue-400 h-16 [&>*]:scale-125")}>
                        <Link href="/home">
                            <Home iconStyle='BoldDuotone' size={25} />
                        </Link>
                    </div>
                    <div className={cn('flex items-center justify-center w-full h-12', router.pathname === "/table-view" && "border-l-4 border-white bg-blue-400 h-16 [&>*]:scale-125")}>
                        <Link href="/table-view">
                            <BarChair iconStyle='BoldDuotone' size={25} />
                        </Link>
                    </div>
                    <div className={cn('flex items-center justify-center w-full h-12 transition duration-150', router.pathname === "/dishes" && "border-l-4 border-white bg-blue-400 h-16 [&>*]:scale-125")}>
                        <Link href="/dishes">
                            <DonutBitten iconStyle='BoldDuotone' size={25} />
                        </Link>
                    </div>
                    <div className={cn('flex items-center justify-center w-full h-12', router.pathname === "/settings" && "border-l-4 border-white bg-blue-400 h-16 [&>*]:scale-125")}>
                        <Link href="/settings">
                            <Settings iconStyle='BoldDuotone' size={25} />
                        </Link>
                    </div>
                </ul>
                <Logout iconStyle='BoldDuotone' size={30} />
            </nav>
            <div className='flex-1'>
                <header className='flex items-center justify-between w-full h-16 px-4 border-b'>
                    <div />
                    <div className='flex items-center gap-2' >
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p>Adam </p>
                    </div>
                </header>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout;