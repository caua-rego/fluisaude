import { useLayoutEffect, useState } from 'react'
import type { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

type Props = {
  children: ReactNode
  active: string
  onChange: (tab: any) => void
}

export default function DashboardLayout({ children, active, onChange }: Props) {
  const [headerHeight, setHeaderHeight] = useState<number>(64)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    // Prefer a CSS variable set by the global Navbar (more deterministic)
    const rootVar = getComputedStyle(document.documentElement).getPropertyValue('--site-header-height')
    const rootPx = parseInt(rootVar || '', 10)
    if (!Number.isNaN(rootPx) && rootPx > 0) {
      setHeaderHeight(rootPx)
      return
    }

    // fallback: prefer the fixed global header (Navbar) to avoid picking internal Topbar
    let header = document.querySelector('header.fixed') as HTMLElement | null
    if (!header) {
      // fallback to first header on the page
      header = document.querySelector('header') as HTMLElement | null
    }
    if (!header) return

    const update = () => {
      const h = Math.ceil(header!.getBoundingClientRect().height)
      setHeaderHeight(h)
      if ((import.meta as any).env?.DEV) {
        // debug info to help during development
        // eslint-disable-next-line no-console
        console.debug('[DashboardLayout] header height:', h, 'header selector:', header)
      }
    }

    // initial
    update()

    // ResizeObserver to react to header size changes (e.g., shrink on scroll)
    const ResizeObs: any = (window as any).ResizeObserver || null
    let ro: any = null
    if (ResizeObs) {
      ro = new ResizeObs(update)
      ro.observe(header)
    }

    window.addEventListener('resize', update)
    window.addEventListener('scroll', update)

    return () => {
      if (ro) ro.disconnect()
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="flex">
        <Sidebar active={active} onChange={onChange} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* aplicar padding-top dinâmico baseado na altura real do header global */}
        <div className="flex-1 min-h-screen" style={{ paddingTop: `${headerHeight}px` }}>
          <Topbar onToggleSidebar={() => setIsSidebarOpen((s) => !s)} onNavigateToTab={onChange} />
          <main className="px-6 py-8 max-w-7xl mx-auto">{children}</main>
        </div>
      </div>
    </div>
  )
}
