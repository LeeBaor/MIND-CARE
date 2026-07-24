import Link from 'next/link'
import { AlertTriangle, ArrowRight, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { STUDENTS, CASE_HISTORIES } from '@/lib/mind-care'

export function AlertZone() {
  const severeStudents = STUDENTS.filter((s) => s.status === 'SEVERE')

  function hasSos(studentId: string) {
    return CASE_HISTORIES.some((c) => c.studentId === studentId && c.isUrgent)
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-lg bg-danger/10 text-danger">
          <AlertTriangle className="size-5" />
        </span>
        <h2 className="font-heading text-lg font-bold text-foreground">Khu vực báo động đỏ</h2>
        <span className="rounded-full bg-danger/10 px-2 py-0.5 text-xs font-bold text-danger">
          {severeStudents.length} ca
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {severeStudents.map((s) => (
          <Card
            key={s.id}
            className="flex flex-col gap-3 border-danger/30 bg-danger/5 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-full bg-danger/15 font-heading font-bold text-danger">
                  {s.name.split(' ').pop()?.[0]}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{s.name}</p>
                  <p className="text-sm text-muted-foreground">{s.grade}</p>
                </div>
              </div>
              {hasSos(s.id) && (
                <span className="animate-pulse rounded-full bg-danger px-2.5 py-1 text-xs font-bold text-danger-foreground">
                  SOS
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4" />
              Điểm rủi ro: <span className="font-semibold text-danger">{s.riskScore}/27</span>
            </div>
            <Link href={`/dashboard/student/${s.id}`}>
              <Button className="h-9 w-full gap-2 bg-danger text-danger-foreground hover:bg-danger/90">
                Xử lý ngay <ArrowRight className="size-4" />
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  )
}
