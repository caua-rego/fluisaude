import { Button } from '@/components/ui/button'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { cn } from '@/lib/utils'

export function CtaSection() {
  const { ref, isVisible } = useScrollAnimation(0.2)

  return (
    <section
      ref={ref}
      className="py-40 bg-black text-white text-center overflow-hidden relative"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div
          className={cn(
            'max-w-4xl mx-auto space-y-10 transition-all duration-1000 ease-apple',
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
          )}
        >
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">
            Pronto para transformar?
          </h2>
          <p className="text-2xl text-gray-400 max-w-2xl mx-auto font-medium">
            Junte-se a centenas de empresas que já escolheram a FluiSaúde.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button className="rounded-full bg-white text-black hover:bg-white/90 px-12 py-8 text-xl font-semibold shadow-lg hover:scale-105 transition-all">
              Agende uma Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}