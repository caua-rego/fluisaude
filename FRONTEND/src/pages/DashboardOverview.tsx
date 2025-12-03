import KPICard from '../components/dashboard/KPICard'
import EspecialidadesWidget from '../components/dashboard/EspecialidadesWidget'

export default function DashboardOverview() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Visão Geral</h1>
          <p className="text-sm text-gray-500">Resumo das principais métricas (PT-BR)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <KPICard title="Consultas Hoje" value={42} subtitle="+3 vs ontem" />
        <KPICard title="Canceladas" value={4} subtitle="2%" />
        <KPICard title="Próximos 7 dias" value={18} />
        <KPICard title="Pacientes Ativos" value={1240} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
          <h3 className="font-semibold mb-3">Agenda (próximos 7 dias)</h3>
          <div className="h-44 flex items-center justify-center text-gray-400">[Gráfico placeholder]</div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
          <h3 className="font-semibold mb-3">Atalhos</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Criar médico</li>
            <li>• Exportar pacientes</li>
            <li>• Revisar consultas agendadas</li>
          </ul>
        </div>

        <EspecialidadesWidget />
      </div>
    </section>
  )
}
