import DashboardLayout from '@/components/layout/DashboardLayout'
import { Inter } from 'next/font/google'
import TableView from './table-view'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <DashboardLayout>
      <main className={`flex min-h-screen flex-col items-center justify-between flex-1 ${inter.className}`}>
        main file
      </main >
    </DashboardLayout>

  )
}
