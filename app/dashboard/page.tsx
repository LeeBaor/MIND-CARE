import { DashboardTopbar } from '@/components/dashboard/dashboard-topbar'
import { StatCards } from '@/components/dashboard/stat-cards'
import { AlertZone } from '@/components/dashboard/alert-zone'
import { StudentTable } from '@/components/dashboard/student-table'
import { Analytics } from '@/components/dashboard/analytics'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardTopbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Bảng điều khiển
          </h1>
          <p className="text-muted-foreground">
            Tổng quan sức khỏe tinh thần toàn trường và các ca cần ưu tiên.
          </p>
        </div>

        <StatCards />
        <AlertZone />
        <Analytics />
        <StudentTable />
      </main>
    </div>
  )
}
