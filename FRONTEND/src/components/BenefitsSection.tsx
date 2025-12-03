import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { cn } from '@/lib/utils'
import { Wallet, Users, Zap } from 'lucide-react'

const benefits = [
  {
    icon: Wallet,
    title: 'Redução de Custos',
    description:
      'Otimize seus investimentos em saúde corporativa com planos inteligentes e gestão eficiente.',
  },
  {
    icon: Users,
    title: 'Equipe Engajada',
    description:
      'Colaboradores saudáveis e felizes são mais produtivos. Cuide de quem cuida do seu negócio.',
  },
  {
    icon: Zap,
    title: 'Tecnologia de Ponta',
    description:
      'Uma plataforma segura, rápida e fácil de usar, projetada para simplificar o seu dia a dia.',
  },
]

export function BenefitsSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section
      id="beneficios"
      ref={ref}
      className="py-40 bg-[#F5F5F7] relative overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-white/50 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div
          className={cn(
            'text-center mb-24 transition-all duration-1000 ease-apple',
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-20',
          )}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight">
            Mais saúde.
            <br className="hidden md:block" />{' '}
            <span className="text-gray-400">Menos complexidade.</span>
          </h2>
          <p className="text-gray-500 text-2xl max-w-3xl mx-auto font-medium">
            Descubra como a FluiSaúde pode transformar a gestão de benefícios da
            sua empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={cn(
                'glass-card p-12 rounded-[2.5rem] flex flex-col items-start text-left transition-all duration-1000 ease-apple hover:-translate-y-2 bg-white/60',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20',
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="mb-8 p-4 bg-black/5 rounded-2xl text-foreground">
                <benefit.icon className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
                {benefit.title}
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed font-medium">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}