import Link from 'next/link'
import { HeartHandshake } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

interface SiteHeaderProps {
  active?: 'home' | 'assessment' | 'dashboard'
}

const NAV = [
  { key: 'home', label: 'Trang chủ', href: '/' },
  { key: 'assessment', label: 'Khảo sát', href: '/assessment' },
  { key: 'dashboard', label: 'Bảng điều khiển', href: '/dashboard' },
] as const

export function SiteHeader({ active = 'home' }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <HeartHandshake className="size-5" />
          </span>
          <span className="font-heading text-lg font-bold tracking-tight text-foreground">
            MIND<span className="text-primary">-CARE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Điều hướng chính">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={active === item.key ? 'page' : undefined}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                active === item.key
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/assessment"
          className={cn(buttonVariants({ size: 'lg' }), 'h-10 px-4')}
        >
          Bắt đầu khảo sát
        </Link>
      </div>
    </header>
  )
}
