import React, { FC, ReactNode } from 'react'
import { ChefHat, Home, BarChair, Settings, Logout } from 'solar-icon-set';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className='flex w-full pl-24' >
            <nav className='bg-blue-500 text-white w-24 fixed left-0 top-0  h-screen  flex flex-col items-center py-5'>
                <ChefHat iconStyle='BoldDuotone' size={35} />
                <ul className='flex flex-col gap-8 items-center mt-16 flex-1' >
                    <Home iconStyle='BoldDuotone' size={25} />
                    <BarChair iconStyle='BoldDuotone' size={25} />
                    <Settings iconStyle='BoldDuotone' size={25} />
                </ul>
                <Logout iconStyle='BoldDuotone' size={30} />
            </nav>
            <div className='flex-1'>
                <header className='w-full h-16 flex justify-between items-center border-b px-4'>
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