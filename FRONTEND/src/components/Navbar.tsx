import { useState, useEffect, useRef } from 'react'
import { Menu, Droplets, LogIn, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { products } from '@/data/products'

const navItems = [
  { name: 'Soluções', href: '#features', type: 'hash' },
  { name: 'Produtos', href: '/products', type: 'path' },
  { name: 'Benefícios', href: '#beneficios', type: 'hash' },
  { name: 'Avaliações', href: '#avaliacoes', type: 'hash' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const navRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDropdown(null)
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  // expose header height as a CSS variable for other parts of the app
  useEffect(() => {
    const el = headerRef.current
    if (!el || typeof window === 'undefined') return

    const setVar = () => {
      const h = Math.ceil(el.getBoundingClientRect().height)
      try {
        document.documentElement.style.setProperty('--site-header-height', `${h}px`)
      } catch (e) {
        // ignore
      }
    }

    setVar()

    const ResizeObs: any = (window as any).ResizeObserver || null
    let ro: any = null
    if (ResizeObs) {
      ro = new ResizeObs(setVar)
      ro.observe(el)
    }

    window.addEventListener('resize', setVar)
    window.addEventListener('scroll', setVar)

    return () => {
      if (ro) ro.disconnect()
      window.removeEventListener('resize', setVar)
      window.removeEventListener('scroll', setVar)
    }
  }, [])

  const handleNavigation = (item: { href: string; type: string }) => {
    setIsOpen(false)
    if (item.type === 'path') {
      navigate(item.href)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      if (location.pathname !== '/') {
        navigate(`/${item.href}`)
        setTimeout(() => {
          const elementId = item.href.replace('#', '')
          const element = document.getElementById(elementId)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else {
        const elementId = item.href.replace('#', '')
        const element = document.getElementById(elementId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-apple',
        isScrolled ? 'glass py-3' : 'bg-transparent py-6',
      )}
    >
      <div className="container mx-auto px-6 grid grid-cols-3 items-center">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
          >
            <div className="bg-foreground text-background p-1.5 rounded-lg transition-transform duration-300 group-hover:scale-110">
              <Droplets className="h-5 w-5 fill-current" />
            </div>
            <span className="font-semibold text-xl tracking-tight text-foreground">
              FluiSaúde
            </span>
          </Link>
        </div>

        <div className="flex justify-center">
          <nav className="hidden md:flex items-center gap-6" ref={navRef}>
            {navItems.map((item) => {
              const isProducts = item.name === 'Produtos'
              return (
                <div key={item.name} className="relative">
                  {isProducts ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenDropdown(openDropdown === item.name ? null : item.name)
                        }}
                        className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2"
                      >
                        {item.name}
                        <svg className="w-3 h-3" viewBox="0 0 20 20" fill="none" aria-hidden>
                          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      {openDropdown === item.name && (
                        <div className="absolute left-1/2 top-full -translate-x-1/2 mt-3 bg-white rounded-2xl shadow-2xl p-6 z-50 ring-1 ring-black/5 w-[840px]">
                          <div className="grid grid-cols-2 gap-4">
                            {products.map((p) => (
                              <button
                                key={p.slug}
                                onClick={() => {
                                  setOpenDropdown(null)
                                  if (p.slug === 'admin') navigate('/admin')
                                  else navigate(`/products/${p.slug}`)
                                  window.scrollTo({ top: 0, behavior: 'smooth' })
                                }}
                                className="flex gap-4 items-start p-4 rounded-2xl hover:bg-gray-50 text-left border border-transparent hover:border-gray-100 transition-colors"
                              >
                                <div className="w-24 h-20 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                                  <img src={p.imageUrl} alt={p.name} className="max-w-full max-h-full object-contain" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-foreground">{p.name}</h4>
                                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                                    {p.shortDescription}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                          <div className="mt-5 flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                            <div>
                              <p className="text-sm font-semibold text-foreground">Quer ver tudo em detalhes?</p>
                              <p className="text-xs text-gray-500">Abra a página dedicada de produtos.</p>
                            </div>
                            <button
                              onClick={() => {
                                setOpenDropdown(null)
                                navigate('/products')
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                              }}
                              className="text-sm font-semibold text-accent hover:underline"
                            >
                              Ver todos
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => handleNavigation(item)}
                      className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              )
            })}
          </nav>
        </div>

        <div className="flex justify-end items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate('/login')}
              className="text-foreground/80 hover:text-foreground hover:bg-black/5 rounded-full px-5"
            >
              Login
            </Button>
            <Button
              onClick={() => {}}
              className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Agende uma Demo
            </Button>
          </div>
        </div>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-black/5"
              >
                <Menu className="h-6 w-6 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-[400px] p-0 border-l border-white/20 bg-white/90 backdrop-blur-3xl"
            >
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-100/50">
                  <SheetTitle className="text-left text-2xl font-bold flex items-center gap-2">
                    FluiSaúde
                  </SheetTitle>
                  <SheetDescription className="sr-only">Menu</SheetDescription>
                </div>

                <nav className="flex-1 overflow-y-auto py-8 px-6">
                  <div className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavigation(item)}
                        className="flex items-center justify-between w-full py-4 text-2xl font-semibold text-foreground hover:text-accent transition-colors border-b border-gray-100/50"
                      >
                        {item.name}
                        <ChevronRight className="h-5 w-5 text-gray-300" />
                      </button>
                    ))}
                  </div>
                </nav>

                <div className="p-8 space-y-4">
                  <Button
                    onClick={() => navigate('/login')}
                    variant="outline"
                    className="w-full rounded-2xl h-14 text-lg font-medium border-gray-200"
                  >
                    <LogIn className="mr-2 h-5 w-5" />
                    Login
                  </Button>
                  <Button className="w-full rounded-2xl h-14 text-lg font-medium bg-foreground text-background hover:bg-foreground/90">
                    Agende uma Demo
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
