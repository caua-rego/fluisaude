import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section id="avaliacoes" ref={ref} className="py-40 bg-white relative">
      <div className="container mx-auto px-6 relative z-10">
        <div
          className={cn(
            'text-center mb-20 transition-all duration-1000 ease-apple',
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-20',
          )}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
            O que dizem.
          </h2>
        </div>

        <div
          className={cn(
            'max-w-5xl mx-auto transition-all duration-1000 delay-200 ease-apple',
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
          )}
        >
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              <CarouselItem>
                <div className="h-full flex flex-col justify-between p-8 md:p-12 bg-[#F5F5F7] rounded-[3rem] items-center text-center">
                  <p className="text-2xl md:text-4xl font-semibold text-foreground mb-6 md:mb-10 leading-tight tracking-tight">
                    "FluiSaúde transformou a maneira como gerenciamos a saúde na
                    nossa empresa. É intuitivo e o suporte é fantástico."
                  </p>
                  <div className="flex flex-col items-center gap-4 mt-4">
                    <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                      <AvatarImage
                        src="https://img.usecurling.com/ppl/medium?gender=female&seed=1"
                        alt="Mariana Costa"
                      />
                      <AvatarFallback>MC</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <p className="font-bold text-foreground text-lg">
                        Mariana Costa
                      </p>
                      <p className="text-gray-500">
                        Diretora de RH, TechSolutions
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem>
                <div className="h-full flex flex-col justify-between p-8 md:p-12 bg-[#F5F5F7] rounded-[3rem] items-center text-center">
                  <p className="text-2xl md:text-4xl font-semibold text-foreground mb-6 md:mb-10 leading-tight tracking-tight">
                    "A facilidade de agendamento e a clareza dos relatórios nos
                    ajudaram a reduzir o absenteísmo em 30%."
                  </p>
                  <div className="flex flex-col items-center gap-4 mt-4">
                    <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                      <AvatarImage
                        src="https://img.usecurling.com/ppl/medium?gender=male&seed=2"
                        alt="Carlos Silva"
                      />
                      <AvatarFallback>CS</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <p className="font-bold text-foreground text-lg">
                        Carlos Silva
                      </p>
                      <p className="text-gray-500">CEO, InovaCorp</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem>
                <div className="h-full flex flex-col justify-between p-8 md:p-12 bg-[#F5F5F7] rounded-[3rem] items-center text-center">
                  <p className="text-2xl md:text-4xl font-semibold text-foreground mb-6 md:mb-10 leading-tight tracking-tight">
                    "Com a análise detalhada, conseguimos identificar problemas crônicos
                    e aplicar medidas preventivas com maior eficiência."
                  </p>
                  <div className="flex flex-col items-center gap-4 mt-4">
                    <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                      <AvatarImage
                        src="https://img.usecurling.com/ppl/medium?gender=female&seed=3"
                        alt="Paula Mendes"
                      />
                      <AvatarFallback>PM</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <p className="font-bold text-foreground text-lg">Paula Mendes</p>
                      <p className="text-gray-500">Coordenadora de Saúde, MediCare</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem>
                <div className="h-full flex flex-col justify-between p-8 md:p-12 bg-[#F5F5F7] rounded-[3rem] items-center text-center">
                  <p className="text-2xl md:text-4xl font-semibold text-foreground mb-6 md:mb-10 leading-tight tracking-tight">
                    "A integração com nosso sistema de RH foi rápida e sem complicações.
                    A adoção pelos funcionários foi imediata."
                  </p>
                  <div className="flex flex-col items-center gap-4 mt-4">
                    <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                      <AvatarImage
                        src="https://img.usecurling.com/ppl/medium?gender=male&seed=4"
                        alt="Rafael Oliveira"
                      />
                      <AvatarFallback>RO</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <p className="font-bold text-foreground text-lg">Rafael Oliveira</p>
                      <p className="text-gray-500">Gerente de Pessoas, AlfaLog</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-6 h-14 w-14 border-none bg-black/5 hover:bg-black/10 text-foreground transition-all" />
              <CarouselNext className="-right-6 h-14 w-14 border-none bg-black/5 hover:bg-black/10 text-foreground transition-all" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}