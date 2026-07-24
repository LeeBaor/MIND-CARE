import { Users, ShieldAlert, HeartPulse, TrendingUp, Siren, TimerReset } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { STUDENTS, COVERAGE_BY_GRADE, SOS_ALERTS } from '@/lib/mind-care'
import { cn } from '@/lib/utils'

export function StatCards() {
  const severe = STUDENTS.filter((s) => s.status === 'SEVERE').length
  const needHelp = STUDENTS.filter((s) => s.status === 'NEED_HELP').length
  const totalSurveyed = COVERAGE_BY_GRADE.reduce((a, b) => a + b.surveyed, 0)
  const totalStudents = COVERAGE_BY_GRADE.reduce((a, b) => a + b.total, 0)
  const coverage = Math.round((totalSurveyed / totalStudents) * 100)
  const pendingSos = SOS_ALERTS.filter((s) => s.status === 'PENDING').length
  const avgRisk = Math.round(
    (STUDENTS.reduce((a, s) => a + s.riskScore, 0) / STUDENTS.length / 27) * 100,
  )

  const stats = [
    {
      label: 'Học sinh theo dõi',
      value: totalStudents.toLocaleString('vi-VN'),
      sub: `${STUDENTS.length} đang theo dõi sát`,
      icon: Users,
      tone: 'text-primary bg-secondary',
    },
    {
      label: 'Tỷ lệ rủi ro trung bình',
      value: `${avgRisk}%`,
      sub: 'Dựa trên điểm DASS-21',
      icon: TrendingUp,
      tone: 'text-warning-foreground bg-warning/20',
    },
    {
      label: 'SOS đang chờ',
      value: pendingSos,
      sub: pendingSos > 0 ? 'Cần xử lý ngay' : 'Không có ca chờ',
      icon: Siren,
      tone: 'text-danger bg-danger/10',
      pulse: pendingSos > 0,
    },
    {
      label: 'Tỷ lệ bao phủ khảo sát',
      value: `${coverage}%`,
      sub: `${totalSurveyed}/${totalStudents} đã khảo sát`,
      icon: TimerReset,
      tone: 'text-success bg-success/15',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label} className="relative overflow-hidden">
          <CardContent className="flex items-center gap-4 py-5">
            <span
              className={cn(
                'flex size-12 items-center justify-center rounded-xl',
                s.tone,
                s.pulse && 'animate-pulse',
              )}
            >
              <s.icon className="size-6" />
            </span>
            <div className="flex flex-col">
              <p className="font-heading text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-xs text-muted-foreground/70">{s.sub}</p>
            </div>
          </CardContent>
          {s.pulse && (
            <span className="absolute right-3 top-3 size-2.5 animate-ping rounded-full bg-danger" />
          )}
        </Card>
      ))}
    </div>
  )
}
