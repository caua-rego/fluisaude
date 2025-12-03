import React from 'react'

type CarouselProps = React.HTMLAttributes<HTMLDivElement> & { opts?: any }

export const Carousel: React.FC<CarouselProps> = ({ children, className = '', ...props }) => {
  return (
    <div {...props} className={["relative", className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}

export const CarouselContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => {
  return (
    <div {...props} data-carousel-content className={["flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory px-2 py-4", className].filter(Boolean).join(' ')} role="list">
      {children}
    </div>
  )
}

export const CarouselItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div {...props} role="listitem" className={["snap-start flex-shrink-0 w-[280px] md:w-[720px] h-full", className].filter(Boolean).join(' ')}>
    {children}
  </div>
)

export const CarouselNext: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = '', ...props }) => {
  const handle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget as HTMLButtonElement
    const root = btn.closest('.relative') as HTMLElement | null
    const content = root?.querySelector('[data-carousel-content]') as HTMLElement | null
    if (!content) return
    content.scrollBy({ left: content.clientWidth, behavior: 'smooth' })
  }

  return (
    <button {...props} aria-label="Próximo" className={["absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-800/80", className].filter(Boolean).join(' ')} onClick={handle}>
      <span className="text-lg leading-none">›</span>
    </button>
  )
}

export const CarouselPrevious: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = '', ...props }) => {
  const handle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget as HTMLButtonElement
    const root = btn.closest('.relative') as HTMLElement | null
    const content = root?.querySelector('[data-carousel-content]') as HTMLElement | null
    if (!content) return
    content.scrollBy({ left: -content.clientWidth, behavior: 'smooth' })
  }

  return (
    <button {...props} aria-label="Anterior" className={["absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-800/80", className].filter(Boolean).join(' ')} onClick={handle}>
      <span className="text-lg leading-none">‹</span>
    </button>
  )
}

export default Carousel
