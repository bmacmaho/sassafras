"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const NAV_LINKS = [
  { href: "/contact", label: "SUBMISSIONS" },
  { href: "/current-issue", label: "CURRENT ISSUE" },
  { href: "/issues", label: "ALL ISSUES" },
  { href: "/explore", label: "EXPLORE" },
  { href: "/keep-in-touch", label: "KEEP IN TOUCH" },
  { href: "/about", label: "ABOUT" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  // 在首页完全隐藏独立的 Header，而是将导航栏作为原生全屏区块直接放置在页面流程中，
  // 实现“向下滚动自动出现全屏导航”的连贯自然浏览体验。
  if (isHome) return null

  // 对于非首页页面，保留一个极简的深色固定导航栏
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] border-b border-white/5 shadow-2xl bg-black">
      <div className="mx-auto max-w-7xl px-4 h-16 sm:h-20 flex items-center justify-center relative">
        
        {/* 返回直接跳转至导航黑幕的花卉图标 */}
        <Link 
          href="/#nav"
          className="absolute left-6 md:left-8 transition-opacity hover:opacity-60"
        >
          <Image
            src="/sassafras-logo.PNG"
            alt="Home"
            width={38}
            height={38}
            className="object-contain"
          />
        </Link>
        
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-12 md:gap-16 text-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] sm:text-[13px] uppercase tracking-[0.2em] font-sans transition-colors text-white/50 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
