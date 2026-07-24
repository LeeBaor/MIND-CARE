import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { HowItWorks } from '@/components/landing/how-it-works'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="home" />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
      </main>
      <SiteFooter />
    </div>
  )
}
