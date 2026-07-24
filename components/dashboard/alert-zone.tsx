'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, ArrowRight, Clock, X, Siren } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { STUDENTS, CASE_HISTORIES, SOS_ALERTS, type SosAlert } from '@/lib/mind-care'
import { cn } from '@/lib/utils'

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins} phút trước`
  const hrs = Math.floor(mins / 60)
  return `${hrs} giờ trước`
}

export function AlertZone() {
  const severeStudents = STUDENTS.filter((s) => s.status === 'SEVERE')
  const [sosAlerts, setSosAlerts] = useState<SosAlert[]>(SOS_ALERTS)
  const [showPopup, setShowPopup] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const pending = sosAlerts.filter((s) => s.status === 'PENDING')

  useEffect(() => {
    if (pending.length > 0 && !dismissed) {
      const t = setTimeout(() => setShowPopup(true), 600)
      return () => clearTimeout(t)
    }
  }, [pending.length, dismissed])

  function handleSos(id: string) {
    setSosAlerts((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'HANDLING' as const } : s)))
  }

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

      {/* SOS real-time popup */}
      {showPopup && pending.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="relative w-full max-w-md animate-in fade-in zoom-in-95 duration-200 rounded-2xl border-2 border-danger bg-card p-6 shadow-2xl">
            <button
              onClick={() => { setShowPopup(false); setDismissed(true) }}
              className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground hover:bg-muted"
              aria-label="Đóng"
            >
              <X className="size-4" />
            </button>
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="flex size-14 animate-pulse items-center justify-center rounded-full bg-danger/15 text-danger">
                <Siren className="size-7" />
              </span>
              <h3 className="font-heading text-xl font-bold text-danger">Cảnh báo SOS khẩn cấp</h3>
              <p className="text-sm text-muted-foreground">
                Có {pending.length} học sinh vừa nhấn nút SOS cần hỗ trợ ngay.
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {pending.map((sos) => (
                <div key={sos.id} className="flex items-center justify-between rounded-xl border border-danger/30 bg-danger/5 p-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-full bg-danger/15 font-heading text-sm font-bold text-danger">
                      {sos.studentName.split(' ').pop()?.[0]}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{sos.studentName}</p>
                      <p className="text-xs text-muted-foreground">{sos.grade} · {timeAgo(sos.triggeredAt)}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-danger text-danger-foreground hover:bg-danger/90"
                    onClick={() => handleSos(sos.id)}
                  >
                    Tiếp nhận
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
