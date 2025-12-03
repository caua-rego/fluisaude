import adminDashboardIllustration from '@/assets/admin-dashboard.svg'
import dashboardIllustration from '@/assets/product-dashboard.svg'
import scheduleIllustration from '@/assets/product-schedule.svg'
import analyticsIllustration from '@/assets/product-analytics.svg'

export type Product = {
  id: number
  slug: string
  name: string
  shortDescription: string
  fullDescription: string
  features: string[]
  imageUrl: string
}

export const products: Product[] = [
  {
    id: 0,
    slug: 'admin',
    name: 'Painel Administrativo',
    shortDescription: 'Central de controle para administradores — o principal da plataforma.',
    fullDescription:
      'Acesse métricas, usuários, planos e controle total da plataforma a partir de um painel intuitivo.',
    features: ['Controle de usuários', 'Relatórios avançados', 'Configurações de planos'],
    imageUrl: adminDashboardIllustration,
  },
  {
    id: 1,
    slug: 'gestao-simplificada',
    name: 'Gestão Simplificada',
    shortDescription: 'Plataforma para gerenciar planos e benefícios com poucos cliques.',
    fullDescription:
      'Gestão centralizada de planos e benefícios, relatórios avançados e controle em tempo real para equipes de RH.',
    features: ['Painel administrativo', 'Relatórios em tempo real', 'Integração com rede credenciada'],
    imageUrl: dashboardIllustration,
  },
  {
    id: 2,
    slug: 'agendamento-inteligente',
    name: 'Agendamento Inteligente',
    shortDescription: 'Agende consultas rapidamente com nossa rede credenciada.',
    fullDescription:
      'Sistema de agendamento moderno, com filtros de especialidade, disponibilidade e lembretes automáticos.',
    features: ['Filtros inteligentes', 'Lembretes automáticos', 'Interface mobile'],
    imageUrl: scheduleIllustration,
  },
  {
    id: 3,
    slug: 'dados-e-relatorios',
    name: 'Dados e Relatórios',
    shortDescription: 'Insights sobre a saúde da sua equipe para decisões melhores.',
    fullDescription:
      'Painel de métricas e relatórios personalizáveis para análise de utilização e bem-estar.',
    features: ['Métricas por período', 'Exportação de relatórios', 'Alertas personalizados'],
    imageUrl: analyticsIllustration,
  },
]

export default products
