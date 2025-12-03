import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

export function Hero() {
  return (
    <section
      id="overview"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FAFAFA] pt-32 pb-20"
    >
      {/* Abstract Background Blur */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none opacity-60" />

      <div className="container mx-auto px-6 flex flex-col items-center text-center z-10 max-w-5xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-black/5 shadow-sm mb-8 animate-fade-in-up opacity-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-sm font-medium text-gray-600">
            Nova versão 2.0 disponível
          </span>
        </div>

        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground mb-8 animate-fade-in-up-delay-1 opacity-0 text-balance leading-[0.9]"
          style={{ animationFillMode: 'forwards' }}
        >
          Saúde fluida.
          <br />
          <span className="text-gray-400">Como deve ser.</span>
        </h1>

        <p
          className="text-xl md:text-2xl text-gray-500 max-w-2xl mb-12 animate-fade-in-up-delay-2 opacity-0 leading-relaxed text-balance font-medium"
          style={{ animationFillMode: 'forwards' }}
        >
          Gestão de benefícios corporativos simplificada. Tecnologia que cuida
          de pessoas.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-6 animate-fade-in-up-delay-3 opacity-0 w-full sm:w-auto items-center"
          style={{ animationFillMode: 'forwards' }}
        >
          <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-10 py-7 text-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-105 w-full sm:w-auto">
            Começar Agora
          </Button>
          <Button
            variant="link"
            className="text-foreground hover:text-accent text-lg group w-full sm:w-auto"
          >
            Ver como funciona{' '}
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      <div
        className="relative w-full max-w-[1400px] mt-20 animate-fade-in-up-delay-3 opacity-0 flex justify-center px-4"
        style={{ animationFillMode: 'forwards', animationDelay: '0.8s' }}
      >
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/40 bg-white/40 backdrop-blur-xl p-2">
          <div className="rounded-[2rem] overflow-hidden bg-white">
            <img
              src="https://img.usecurling.com/p/1400/900?q=dashboard%20ui%20clean%20minimalist%20white&dpr=2"
              alt="FluiSaúde Platform Interface"
              className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-1500 ease-apple"
            />
          </div>
          {/* Glass reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none rounded-[2.5rem]" />
        </div>
      </div>
    </section>
  )
}