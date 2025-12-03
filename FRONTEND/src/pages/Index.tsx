import { useState, useEffect } from 'react'
import { Hero } from '@/components/Hero'
import { FeatureSection } from '@/components/FeatureSection'
import { BenefitsSection } from '@/components/BenefitsSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { CtaSection } from '@/components/CtaSection'
import { IntroAnimation } from '@/components/IntroAnimation'

const Index = () => {
  const [showIntro, setShowIntro] = useState(true)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited')
    if (hasVisited) {
      setShowIntro(false)
      setContentVisible(true)
    }
  }, [])

  const handleIntroComplete = () => {
    sessionStorage.setItem('hasVisited', 'true')
    setShowIntro(false)
    setContentVisible(true)
  }

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      <div
        className={`flex flex-col w-full bg-background transition-opacity duration-1000 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <Hero />

        <div id="features" className="flex flex-col relative z-10">
          <div className="py-24 text-center bg-background">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground max-w-4xl mx-auto px-6 text-balance">
              Tudo o que você precisa. <br />
              <span className="text-gray-400">Em um só lugar.</span>
            </h2>
          </div>

          <FeatureSection
            title="Gestão Simplificada"
            description="Administre planos e benefícios de saúde sem burocracia. Nossa plataforma centraliza todas as informações, permitindo que você foque no que realmente importa: as pessoas."
            imageUrl="https://img.usecurling.com/p/1200/900?q=dashboard%20ui%20clean%20minimalist%20white&dpr=2"
            orientation="left"
            index={0}
          />

          <FeatureSection
            title="Agendamento Inteligente"
            description="Encontre médicos e marque consultas em poucos cliques. Com nossa rede credenciada premium, seus colaboradores têm acesso aos melhores especialistas com total agilidade."
            imageUrl="https://img.usecurling.com/p/1200/900?q=app%20interface%20health%20booking%20clean&dpr=2"
            orientation="right"
            index={1}
          />

          <FeatureSection
            title="Dados e Relatórios"
            description="Tenha insights sobre a saúde da sua equipe para tomar decisões melhores. Acompanhe métricas de utilização, sinistralidade e bem-estar em tempo real."
            imageUrl="https://img.usecurling.com/p/1200/900?q=analytics%20charts%20clean%20modern&dpr=2"
            orientation="left"
            index={2}
          />
        </div>

        <BenefitsSection />

        <TestimonialsSection />

        <CtaSection />
      </div>
    </>
  )
}

export default Index