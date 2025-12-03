import { useState } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import DashboardOverview from './DashboardOverview'
import Medicos from './Medicos'
import Pacientes from './Pacientes'
import Consultas from './Consultas'
import Especialidades from './Especialidades'

type Tab = 'overview' | 'medicos' | 'pacientes' | 'consultas' | 'especialidades'

export default function Admin() {
  const [tab, setTab] = useState<Tab>('overview')

  return (
    <DashboardLayout active={tab} onChange={setTab}>
      <div className="p-6">
        {tab === 'overview' && <DashboardOverview />}
        {tab === 'medicos' && <Medicos />}
        {tab === 'pacientes' && <Pacientes />}
        {tab === 'consultas' && <Consultas />}
        {tab === 'especialidades' && <Especialidades />}
      </div>
    </DashboardLayout>
  )
}
