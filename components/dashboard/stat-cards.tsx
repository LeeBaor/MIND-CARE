import { Users, ShieldAlert, HeartPulse, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { STUDENTS, COVERAGE_BY_GRADE } from '@/lib/mind-care'
import { cn } from '@/lib/utils'

export function StatCards() {
  const severe = STUDENTS.filter((s) => s.status === 'SEVERE').length
  const needHelp = STUDENTS.filter((s) => s.status === 'NEED_HELP').length
  const totalSurveyed = COVERAGE_BY_GRADE.reduce((a, b) => a + b.surveyed, 0)
  const totalStudents = COVERAGE_BY_GRADE.reduce((a, b) => a + b.total, 0)
  const coverage = Math.round((totalSurveyed / totalStudents) * 100)

  const stats = [
    {
      label: 'Học sinh theo dõi',
      value: totalStudents.toLocaleString('vi-VN'),
      icon: Users,
      tone: 'text-primary bg-secondary',
    },
    {
      label: 'Báo động đỏ',
      value: severe,
      icon: ShieldAlert,
      tone: 'text-danger bg-danger/10',
    },
    {
      label: 'Cần tham vấn',
      value: needHelp,
      icon: HeartPulse,
      tone: 'text-warning-foreground bg-warning/20',
    },
    {
      label: 'Tỷ lệ bao phủ',
      value: `${coverage}%`,
      icon: TrendingUp,
      tone: 'text-success bg-success/15',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label}>
          <CardContent className="flex items-center gap-4 py-5">
            <span className={cn('flex size-12 items-center justify-center rounded-xl', s.tone)}>
              <s.icon className="size-6" />
            </span>
            <div>
              <p className="font-heading text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
