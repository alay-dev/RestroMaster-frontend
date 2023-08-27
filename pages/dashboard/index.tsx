import EmployeeCard from '@/components/employeeCard/EmployeeCard'
import DashboardLayout from '@/components/layout/DashboardLayout'
import RecentOrder from '@/components/recentOrder/RecentOrder'
import StatChartCard from '@/components/statChartCard/StatChartCard'
import { Sale, MoneyBag, GraphUp, ArrowRight } from "solar-icon-set"

const Dashboard = () => {
    return (
        <DashboardLayout>
            <div className='min-h-screen p-6 bg-gray-100'>
                <div className='flex gap-12 overflow-hidden mb-14 h-max' >
                    <div className='w-2/5' >
                        <div className='flex items-center justify-between mb-4' >
                            <h3 className='text-xl font-medium ' >Overview</h3>
                            <div className='px-5 py-2 bg-gray-200 cursor-pointer hover:underline rounded-xl' >
                                <p className='text-xs text-orange-600'>View all</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 mb-7' >
                            <div className='flex-1 p-5 pt-6 text-blue-500 bg-white rounded-3xl '>
                                <Sale size={35} />
                                <div className='mt-4' >
                                    <h4 className='text-sm text-gray-400' >Total sales</h4>
                                    <p>$ <strong className='text-2xl font-semibold' >1,231</strong></p>
                                </div>
                            </div>
                            <div className='flex-1 p-5 pt-6 text-orange-500 bg-white rounded-3xl '>
                                <MoneyBag size={35} />
                                <div className='mt-4' >
                                    <h4 className='text-sm text-gray-400' >Expense</h4>
                                    <p>$ <strong className='text-2xl font-semibold' >1,231</strong></p>
                                </div>
                            </div>
                            <div className='flex-1 p-5 pt-6 text-pink-500 bg-white rounded-3xl '>
                                <GraphUp size={35} />
                                <div className='mt-4' >
                                    <h4 className='text-sm text-gray-400' >Revenue</h4>
                                    <p>$ <strong className='text-2xl font-semibold' >1,231</strong></p>
                                </div>
                            </div>
                        </div>
                        <StatChartCard />
                    </div>
                    <div className='flex w-3/5 gap-5'  >
                        <div className='flex flex-col w-1/2' >
                            <div className='flex items-center justify-between w-full mb-4' >
                                <h3 className='text-xl font-medium ' >Customer stats</h3>
                                <div className='px-5 py-2 bg-gray-200 cursor-pointer hover:underline rounded-xl' >
                                    <p className='text-xs text-orange-600'>View all</p>
                                </div>
                            </div>
                            <div className='flex-1 w-full bg-white rounded-2xl' >

                            </div>
                        </div>
                        <div className='relative items-start justify-start w-1/2' >
                            <img className='w-[90%]' src="/images/dashboard/tryPremium.svg" />
                            <div className='absolute bottom-0 left-0 flex items-center justify-between w-full gap-3 p-5 bg-white bg-opacity-95 rounded-xl' >
                                <div>
                                    <h2 className='text-xl font-medium '>Try premium</h2>
                                    <p className='text-sm text-gray-400'>You will get more analysis and features.</p>
                                </div>
                                <div className='flex items-center justify-center bg-orange-300 rounded-full w-14 h-14' >
                                    <ArrowRight size={30} />
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex gap-12 mb-16' >
                    <div className='w-2/5' >
                        <div className='flex items-center justify-between mb-4' >
                            <h3 className='text-xl font-medium ' >Employee</h3>
                            <div className='px-5 py-2 bg-gray-200 cursor-pointer hover:underline rounded-xl' >
                                <p className='text-xs text-orange-600'>View all</p>
                            </div>
                        </div>
                        <EmployeeCard />
                    </div>
                    <div className='flex flex-col w-3/5 ' >
                        <div className='flex items-center justify-between mb-4' >
                            <h3 className='text-xl font-medium ' >Recent order</h3>
                            <div className='px-5 py-2 bg-gray-200 cursor-pointer hover:underline rounded-xl' >
                                <p className='text-xs text-orange-600'>View all</p>
                            </div>
                        </div>
                        <RecentOrder />
                    </div>
                </div>

            </div>

        </DashboardLayout>

    )
}

export default Dashboard