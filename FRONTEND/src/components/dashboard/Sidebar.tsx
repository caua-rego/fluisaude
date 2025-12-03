import type { } from 'react'

type Props = {
  active: string
  onChange: (tab: string) => void
  // mobile
  isOpen?: boolean
  onClose?: () => void
}

const NavItem: React.FC<{
  label: string
  active: boolean
  onClick: () => void
}> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-xl mb-1 flex items-center justify-between transition-colors duration-150 ${
      active ? 'bg-white shadow-sm font-semibold' : 'text-gray-600 hover:bg-white/60'
    }`}
  >
    <span>{label}</span>
  </button>
)

export default function Sidebar({ active, onChange, isOpen, onClose }: Props) {
  return (
    <>
      <div
        className="sticky p-6 bg-gradient-to-b from-white/60 to-gray-50/60 border-r border-gray-100 hidden md:block"
        style={{ top: 'var(--site-header-height, 64px)', height: 'calc(100vh - var(--site-header-height, 64px))' }}
      >
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Painel</h2>
        <p className="text-sm text-gray-500 mt-1">Área administrativa</p>
      </div>

          <nav aria-label="Admin navigation" className="space-y-1">
            <NavItem label="Overview" active={active === 'overview'} onClick={() => onChange('overview')} />
            <NavItem label="Médicos" active={active === 'medicos'} onClick={() => onChange('medicos')} />
            <NavItem label="Pacientes" active={active === 'pacientes'} onClick={() => onChange('pacientes')} />
            <NavItem label="Consultas" active={active === 'consultas'} onClick={() => onChange('consultas')} />
            <NavItem label="Especialidades" active={active === 'especialidades'} onClick={() => onChange('especialidades')} />
          </nav>

      <div className="mt-8 text-sm text-gray-500">
        <p>Permissões: <span className="font-medium text-gray-700">Admin</span></p>
      </div>
      </div>

      {/* Mobile Off-canvas */}
      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-50 md:hidden transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className={`absolute inset-0 bg-black/40`} onClick={onClose} />
        <aside className={`absolute left-0 top-0 bottom-0 w-72 bg-white p-6 shadow-xl transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ paddingTop: 'var(--site-header-height, 64px)' }}>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Painel</h3>
            <button onClick={onClose} aria-label="Fechar menu" className="px-2 py-1">✕</button>
          </div>

          <nav aria-label="Admin navigation" className="space-y-1">
            <NavItem label="Overview" active={active === 'overview'} onClick={() => { onChange('overview'); onClose && onClose() }} />
            <NavItem label="Médicos" active={active === 'medicos'} onClick={() => { onChange('medicos'); onClose && onClose() }} />
            <NavItem label="Pacientes" active={active === 'pacientes'} onClick={() => { onChange('pacientes'); onClose && onClose() }} />
            <NavItem label="Consultas" active={active === 'consultas'} onClick={() => { onChange('consultas'); onClose && onClose() }} />
            <NavItem label="Especialidades" active={active === 'especialidades'} onClick={() => { onChange('especialidades'); onClose && onClose() }} />
          </nav>

          <div className="mt-8 text-sm text-gray-500">
            <p>Permissões: <span className="font-medium text-gray-700">Admin</span></p>
          </div>
        </aside>
      </div>
    </>
  )
}
