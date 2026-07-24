'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend, LegendProps,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  MONTHLY_TREND, DASS21_BREAKDOWN, RISK_BY_GRADE,
} from '@/lib/mind-care'

const RISK_COLORS = { normal: '#22c55e', needHelp: '#f59e0b', severe: '#ef4444' }

const tooltipStyle = {
  borderRadius: 12,
  border: '1px solid hsl(var(--border))',
  background: 'hsl(var(--card))',
  color: 'hsl(var(--card-foreground))',
  fontSize: 12,
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
}

function ChartLegend({ payload }: LegendProps) {
  if (!payload) return null
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-muted-foreground">
      {payload.map((entry, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm" style={{ background: entry.color }} />
          {entry.value}
        </span>
      ))}
    </div>
  )
}

export function Analytics() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {/* Line chart - 12-month trend */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="font-heading text-lg">Xu hướng sức khỏe tinh thần 12 tháng</CardTitle>
          <p className="text-sm text-muted-foreground">Tỷ lệ học sinh theo mức độ rủi ro (%)</p>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_TREND} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--border))" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--border))" />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend content={<ChartLegend />} />
                <Line type="monotone" dataKey="normal" name="Bình thường" stroke={RISK_COLORS.normal} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="needHelp" name="Cần tham vấn" stroke={RISK_COLORS.needHelp} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="severe" name="Báo động đỏ" stroke={RISK_COLORS.severe} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* DASS-21 breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg">Phân bố DASS-21</CardTitle>
          <p className="text-sm text-muted-foreground">Điểm trung bình 3 khía cạnh (0-21)</p>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DASS21_BREAKDOWN} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="dimension" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--border))" />
                <YAxis domain={[0, 21]} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--border))" />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }} />
                <Bar dataKey="value" name="Điểm" radius={[8, 8, 0, 0]} maxBarSize={80}>
                  {DASS21_BREAKDOWN.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Risk by grade */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg">Rủi ro theo khối lớp</CardTitle>
          <p className="text-sm text-muted-foreground">Số học sinh theo mức độ & khối</p>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RISK_BY_GRADE} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="grade" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--border))" />
                <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--border))" />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }} />
                <Legend content={<ChartLegend />} />
                <Bar dataKey="normal" name="Bình thường" stackId="a" fill={RISK_COLORS.normal} radius={[0, 0, 0, 0]} maxBarSize={80} />
                <Bar dataKey="needHelp" name="Cần tham vấn" stackId="a" fill={RISK_COLORS.needHelp} maxBarSize={80} />
                <Bar dataKey="severe" name="Báo động đỏ" stackId="a" fill={RISK_COLORS.severe} radius={[8, 8, 0, 0]} maxBarSize={80} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
