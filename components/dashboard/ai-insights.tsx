'use client'

import { Sparkles, ArrowRight, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AI_INSIGHTS } from '@/lib/mind-care'
import { cn } from '@/lib/utils'

const PRIORITY_META = {
  HIGH: { label: 'Ưu tiên cao', color: 'bg-danger/15 text-danger border-danger/30' },
  MEDIUM: { label: 'Trung bình', color: 'bg-warning/20 text-warning-foreground border-warning/40' },
  LOW: { label: 'Tham khảo', color: 'bg-primary/15 text-primary border-primary/30' },
}

export function AiInsights() {
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-secondary/30 to-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Sparkles className="size-5" />
          </span>
          <CardTitle className="font-heading text-lg">Phân tích & Gợi ý can thiệp AI</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Dựa trên dữ liệu DASS-21, xu hướng và quan sát từ giáo viên chủ nhiệm.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {AI_INSIGHTS.map((insight) => (
          <div
            key={insight.id}
            className="flex flex-col gap-2 rounded-xl border border-border bg-card/60 p-4 transition-colors hover:border-primary/40"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold text-foreground">{insight.title}</p>
              <span
                className={cn(
                  'shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-bold',
                  PRIORITY_META[insight.priority].color,
                )}
              >
                {PRIORITY_META[insight.priority].label}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{insight.detail}</p>
            <div className="flex items-center justify-between pt-1">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="size-3.5" />
                {insight.affectedStudents} học sinh bị ảnh hưởng
              </span>
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-primary">
                Tạo kế hoạch <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
