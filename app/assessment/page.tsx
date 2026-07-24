import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { AssessmentFlow } from '@/components/assessment/assessment-flow'

export default function AssessmentPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="assessment" />
      <main className="flex-1 bg-card/30">
        <AssessmentFlow />
      </main>
      <SiteFooter />
    </div>
  )
}
