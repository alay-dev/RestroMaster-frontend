import { useState } from "react"
import { cn } from "@/lib/utils"
import DishCard from '@/components/dishCard/DishCard'
import DashboardLayout from '@/components/layout/DashboardLayout'

const DISH_TYPES: { title: "All" | "Starters" | "Main courses" | "Desserts" | "Drinks"; icon: string }[] = [
    { title: "All", icon: "" },
    { title: "Starters", icon: "" },
    { title: "Main courses", icon: "" },
    { title: "Desserts", icon: "" },
    { title: "Drinks", icon: "" },
]

const Dishes = () => {
    const [dishType, setDishType] = useState<"All" | "Starters" | "Main courses" | "Desserts" | "Drinks">("All")

    return (
        <DashboardLayout>
            <div className='min-h-screen p-6 bg-gray-100'>
                <h1 className='mb-12 text-3xl font-medium' >Dishes</h1>
                <div className='flex items-center gap-5 my-3 mb-8' >
                    {DISH_TYPES?.map(item => {
                        return <div className={cn('flex cursor-pointer select-none  gap-2 px-6 py-2 bg-white rounded-md shadow-md', dishType === item.title && "bg-orange-400 text-white font-medium")} onClick={() => setDishType(item.title)}>
                            <p>{item.title}</p>
                        </div>
                    })}
                </div>
                <div className='grid grid-cols-4 gap-6'>
                    {[1, 2, 3, 4, 5].map(item => {
                        return <DishCard />
                    })}
                </div>

            </div>
        </DashboardLayout>

    )
}

export default Dishes