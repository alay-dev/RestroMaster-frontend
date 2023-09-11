import { useState } from "react"
import { cn } from "@/lib/utils"
import DishCard from '@/components/dishCard/DishCard'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { PaperBin, Bacteria, Wineglass, SunFog, AddSquare } from "solar-icon-set"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import AddDishDrawer from "@/components/addDishDrawer/AddDishDrawer"

const DISH_TYPES: { title: "All" | "Starters" | "Main courses" | "Desserts" | "Drinks"; icon: any }[] = [
    { title: "All", icon: "" },
    { title: "Starters", icon: <SunFog size={20} /> },
    { title: "Main courses", icon: <Bacteria size={20} /> },
    { title: "Desserts", icon: <PaperBin size={20} /> },
    { title: "Drinks", icon: <Wineglass size={20} /> },
]

const Dishes = () => {
    const [dishType, setDishType] = useState<"All" | "Starters" | "Main courses" | "Desserts" | "Drinks">("All")
    const [addDishModal, setAddDishModal] = useState(false)

    return (
        <DashboardLayout>
            <div className='min-h-screen p-6 bg-gray-100'>
                <h1 className='mb-12 text-3xl font-medium' >Dishes</h1>
                <div className='flex items-center gap-3 my-3 mb-8' >
                    {DISH_TYPES?.map(item => {
                        return <div className={cn('flex cursor-pointer select-none  gap-2 px-6 py-2 bg-white rounded-md shadow-sm text-gray-500 , items-center', dishType === item.title && "bg-orange-400 text-white font-medium")} onClick={() => setDishType(item.title)}>
                            {item.icon}
                            <p className="text-xs">{item.title}</p>

                        </div>
                    })}
                </div>
                <div className='grid grid-cols-4 gap-6'>
                    {[1, 2, 3, 4, 5].map(item => {
                        return <DishCard />
                    })}
                </div>
            </div>
            <div onClick={() => setAddDishModal(true)} className='fixed flex items-center justify-center text-green-500 cursor-pointer bottom-6 right-6' >
                <AddSquare iconStyle='BoldDuotone' size={60} />
            </div>
            <Sheet open={addDishModal} onOpenChange={() => setAddDishModal(!addDishModal)}  >
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add a dish</SheetTitle>
                        <SheetDescription>
                            <AddDishDrawer setAddDishModal={setAddDishModal} />
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </DashboardLayout>

    )
}

export default Dishes