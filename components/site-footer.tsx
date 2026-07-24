import Link from 'next/link'
import { HeartHandshake, PhoneCall } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <HeartHandshake className="size-4" />
            </span>
            <span className="font-heading text-base font-bold text-foreground">
              MIND<span className="text-primary">-CARE</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Nền tảng chăm sóc sức khỏe tinh thần dành cho học đường.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="font-heading font-semibold text-foreground">Liên kết</p>
          <Link href="/" className="text-muted-foreground hover:text-foreground">Trang chủ</Link>
          <Link href="/assessment" className="text-muted-foreground hover:text-foreground">Khảo sát</Link>
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">Bảng điều khiển</Link>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="font-heading font-semibold text-foreground">Hỗ trợ</p>
          <span className="text-muted-foreground">Phòng Tư vấn tâm lý học đường</span>
          <span className="text-muted-foreground">Giờ làm việc: 7:30 - 17:00</span>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="font-heading font-semibold text-foreground">Khẩn cấp 24/7</p>
          <a href="tel:111" className="inline-flex items-center gap-2 font-semibold text-primary">
            <PhoneCall className="size-4" /> Tổng đài 111
          </a>
          <span className="text-muted-foreground">Bảo vệ trẻ em Quốc gia</span>
        </div>
      </div>
      <div className="border-t border-border py-4">
        <p className="text-center text-xs text-muted-foreground">
          © 2026 MIND-CARE. Được xây dựng vì sức khỏe tinh thần của học sinh.
        </p>
      </div>
    </footer>
  )
}
