'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, ArrowRight, Download, FileText, Filter } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  STUDENTS, RISK_META, type RiskStatus, DASS_SCORES,
} from '@/lib/mind-care'
import * as XLSX from 'xlsx'

type Filter = 'ALL' | RiskStatus
type Grade = 'ALL' | 'Khối 10' | 'Khối 11' | 'Khối 12'

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'ALL', label: 'Tất cả' },
  { key: 'SEVERE', label: 'Báo động đỏ' },
  { key: 'NEED_HELP', label: 'Cần tham vấn' },
  { key: 'NORMAL', label: 'Bình thường' },
]

const GRADES: { key: Grade; label: string }[] = [
  { key: 'ALL', label: 'Tất cả khối' },
  { key: 'Khối 10', label: 'Khối 10' },
  { key: 'Khối 11', label: 'Khối 11' },
  { key: 'Khối 12', label: 'Khối 12' },
]

function gradeBlock(grade: string): Grade {
  if (grade.includes('10')) return 'Khối 10'
  if (grade.includes('11')) return 'Khối 11'
  if (grade.includes('12')) return 'Khối 12'
  return 'ALL'
}

function dassLevel(score: number) {
  if (score >= 14) return { label: 'Nặng', color: 'bg-danger/15 text-danger' }
  if (score >= 10) return { label: 'Vừa', color: 'bg-warning/20 text-warning-foreground' }
  if (score >= 7) return { label: 'Nhẹ', color: 'bg-primary/15 text-primary' }
  return { label: 'Bình thường', color: 'bg-success/15 text-success' }
}

export function StudentTable() {
  const [filter, setFilter] = useState<Filter>('ALL')
  const [gradeFilter, setGradeFilter] = useState<Grade>('ALL')
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    return STUDENTS.filter((s) => {
      const matchFilter = filter === 'ALL' || s.status === filter
      const matchGrade = gradeFilter === 'ALL' || gradeBlock(s.grade) === gradeFilter
      const matchQuery =
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.grade.toLowerCase().includes(query.toLowerCase())
      return matchFilter && matchGrade && matchQuery
    }).sort((a, b) => b.riskScore - a.riskScore)
  }, [filter, gradeFilter, query])

  function exportExcel() {
    const data = rows.map((s) => {
      const d = DASS_SCORES.find((x) => x.studentId === s.id)
      return {
        'Học sinh': s.name,
        'Lớp': s.grade,
        'Điểm rủi ro': s.riskScore,
        'Trạng thái': RISK_META[s.status].label,
        'Trầm cảm': d?.depression ?? 0,
        'Lo âu': d?.anxiety ?? 0,
        'Căng thẳng': d?.stress ?? 0,
      }
    })
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Học sinh')
    XLSX.writeFile(wb, 'danh-sach-hoc-sinh.xlsx')
  }

  function exportPdf() {
    window.print()
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-heading text-lg font-bold text-foreground">Danh sách học sinh</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={exportExcel}>
            <Download className="size-4" /> Excel
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={exportPdf}>
            <FileText className="size-4" /> PDF
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={cn(
                'rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors',
                filter === f.key
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/50',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative sm:w-40">
            <Filter className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value as Grade)}
              className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm text-foreground outline-none focus:border-primary"
            >
              {GRADES.map((g) => (
                <option key={g.key} value={g.key}>{g.label}</option>
              ))}
            </select>
          </div>
          <div className="relative sm:w-56">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm theo tên hoặc lớp..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="divide-y divide-border">
          <div className="hidden grid-cols-12 gap-4 bg-muted/50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground md:grid">
            <span className="col-span-3">Học sinh</span>
            <span className="col-span-2">Lớp</span>
            <span className="col-span-2">Điểm rủi ro</span>
            <span className="col-span-2">DASS-21</span>
            <span className="col-span-2">Trạng thái</span>
            <span className="col-span-1 text-right">Chi tiết</span>
          </div>

          {rows.map((s) => {
            const d = DASS_SCORES.find((x) => x.studentId === s.id)
            const total = (d?.depression ?? 0) + (d?.anxiety ?? 0) + (d?.stress ?? 0)
            const lvl = dassLevel(total / 3)
            return (
              <Link
                key={s.id}
                href={`/dashboard/student/${s.id}`}
                className="grid grid-cols-1 gap-3 px-4 py-3 transition-colors hover:bg-muted/40 md:grid-cols-12 md:items-center md:gap-4"
              >
                <div className="col-span-3 flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-secondary font-heading text-sm font-bold text-primary">
                    {s.name.split(' ').pop()?.[0]}
                  </span>
                  <span className="font-medium text-foreground">{s.name}</span>
                </div>
                <span className="col-span-2 text-sm text-muted-foreground">{s.grade}</span>
                <div className="col-span-2 flex items-center gap-2">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        'h-full rounded-full',
                        s.status === 'SEVERE' && 'bg-danger',
                        s.status === 'NEED_HELP' && 'bg-warning',
                        s.status === 'NORMAL' && 'bg-success',
                      )}
                      style={{ width: `${(s.riskScore / 27) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{s.riskScore}</span>
                </div>
                <div className="col-span-2">
                  <span className={cn('rounded-md px-2 py-0.5 text-xs font-medium', lvl.color)}>
                    {lvl.label}
                  </span>
                </div>
                <div className="col-span-2">
                  <Badge variant="outline" className={cn('h-6', RISK_META[s.status].badge)}>
                    <span className={cn('size-1.5 rounded-full', RISK_META[s.status].dot)} />
                    {RISK_META[s.status].label}
                  </Badge>
                </div>
                <div className="col-span-1 flex md:justify-end">
                  <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </Link>
            )
          })}

          {rows.length === 0 && (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              Không tìm thấy học sinh phù hợp.
            </p>
          )}
        </div>
      </Card>
    </section>
  )
}
