import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { cn } from '@/lib/utils'

interface FeatureSectionProps {
  title: string
  description: string
  imageUrl: string
  orientation?: 'left' | 'right'
  index?: number
}

export function FeatureSection({
  title,
  description,
  imageUrl,
  orientation = 'left',
  index = 0,
}: FeatureSectionProps) {
  const { ref, isVisible } = useScrollAnimation(0.15)

  return (
    <section ref={ref} className="py-32 overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <div
          className={cn(
            'flex flex-col gap-16 md:gap-32 items-center',
            orientation === 'right' ? 'md:flex-row-reverse' : 'md:flex-row',
          )}
        >
          {/* Text Content */}
          <div
            className={cn(
              'flex-1 space-y-8 text-center md:text-left transition-all duration-1000 ease-apple transform',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-20 opacity-0',
            )}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-100 text-foreground font-bold text-xl mb-4">
              {index + 1}
            </div>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
              {title}
            </h3>
            <p className="text-xl md:text-2xl leading-relaxed text-gray-500 font-medium max-w-lg mx-auto md:mx-0">
              {description}
            </p>
          </div>

          {/* Image Content */}
          <div
            className={cn(
              'flex-1 w-full transition-all duration-1000 delay-200 ease-apple transform',
              isVisible
                ? 'translate-y-0 opacity-100 scale-100'
                : 'translate-y-20 opacity-0 scale-95',
            )}
          >
            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden glass-card p-3 bg-white/50">
              <div className="rounded-[2rem] overflow-hidden w-full h-full bg-gray-50 relative shadow-inner">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1500 ease-apple"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}