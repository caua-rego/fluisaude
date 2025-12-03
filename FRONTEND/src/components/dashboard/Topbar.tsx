import { FormEvent, KeyboardEvent, useState } from 'react'
import { normalizeSearchValue } from '../../lib/utils'
import { getMedico, listMedicos, type Medico } from '../../services/api'

type Props = {
  onToggleSidebar?: () => void
  onNavigateToTab?: (tab: string) => void
}

export default function Topbar({ onToggleSidebar, onNavigateToTab }: Props) {
  const [medicoIdQuery, setMedicoIdQuery] = useState('')
  const [isSearchingById, setIsSearchingById] = useState(false)
  const [medicoFound, setMedicoFound] = useState<Medico | null>(null)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [nameQuery, setNameQuery] = useState('')
  const [nameMatches, setNameMatches] = useState<Medico[]>([])
  const [isFilteringByName, setIsFilteringByName] = useState(false)

  const navigateToMedicos = () => {
    onNavigateToTab?.('medicos')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearchById = async (event?: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>, explicitId?: number) => {
    event?.preventDefault()
    const numericId = typeof explicitId === 'number' ? explicitId : Number(medicoIdQuery.trim())
    if (!numericId) {
      setSearchError('Informe um ID numérico válido.')
      setMedicoFound(null)
      return
    }

    setIsSearchingById(true)
    setSearchError(null)
    try {
      const medico = await getMedico(numericId)
      setMedicoFound(medico)
      setNameMatches([])
      navigateToMedicos()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível localizar o médico informado.'
      setSearchError(message)
      setMedicoFound(null)
    } finally {
      setIsSearchingById(false)
    }
  }

  const handleSearchByName = async (event?: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>) => {
    event?.preventDefault()
    const query = nameQuery.trim()
    if (!query) {
      setSearchError('Digite um nome ou parte dele para pesquisar.')
      setNameMatches([])
      return
    }

    setIsFilteringByName(true)
    setSearchError(null)
    try {
      const medicos = await listMedicos()
      const normalizedQuery = normalizeSearchValue(query)
      const matches = medicos.filter((medico) => normalizeSearchValue(medico.nome).includes(normalizedQuery))
      setNameMatches(matches.slice(0, 5))
      setMedicoFound(null)
      if (matches.length) {
        navigateToMedicos()
      } else {
        setSearchError('Nenhum médico encontrado com esse nome.')
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao pesquisar médicos.'
      setSearchError(message)
      setNameMatches([])
    } finally {
      setIsFilteringByName(false)
    }
  }

  const handleNameKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      void handleSearchByName(event)
    }
  }

  const handleIdKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      void handleSearchById(event)
    }
  }

  return (
    <header className="w-full bg-transparent border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onToggleSidebar} aria-expanded={false} className="p-2 rounded-lg hover:bg-gray-100/80 md:hidden">☰</button>
          <div className="text-sm text-gray-600">Dashboard</div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <form onSubmit={handleSearchById} className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
            <div className="flex flex-col">
              <label htmlFor="medico-id" className="text-xs text-gray-500">
                Buscar médico por ID
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="medico-id"
                  name="medico-id"
                  inputMode="numeric"
                  placeholder="Ex.: 12"
                  className="w-24 border-b border-gray-200 focus:outline-none focus:border-blue-500 text-sm"
                  value={medicoIdQuery}
                  onChange={(event) => setMedicoIdQuery(event.target.value)}
                  onKeyDown={handleIdKeyDown}
                />
                <button type="submit" className="text-sm font-semibold text-blue-600 hover:text-blue-700" disabled={isSearchingById}>
                  {isSearchingById ? 'Buscando...' : 'Buscar'}
                </button>
              </div>
            </div>
          </form>

          <form onSubmit={handleSearchByName} className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
            <div className="flex flex-col">
              <label htmlFor="medico-nome" className="text-xs text-gray-500">
                Procurar por nome
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="medico-nome"
                  name="medico-nome"
                  placeholder="Digite o nome"
                  className="w-40 border-b border-gray-200 focus:outline-none focus:border-blue-500 text-sm"
                  value={nameQuery}
                  onChange={(event) => setNameQuery(event.target.value)}
                  onKeyDown={handleNameKeyDown}
                />
                <button type="submit" className="text-sm font-semibold text-blue-600 hover:text-blue-700" disabled={isFilteringByName}>
                  {isFilteringByName ? 'Filtrando...' : 'Pesquisar'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-4 space-y-3">
        {searchError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg" aria-live="polite">
            {searchError}
          </div>
        )}

        {medicoFound && (
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">Médico localizado</p>
              <p className="text-lg font-semibold text-gray-900">
                #{medicoFound.id} · {medicoFound.nome}
              </p>
              <p className="text-sm text-gray-500">CRM: {medicoFound.crm} · Especialidade #{medicoFound.especialidade_id}</p>
            </div>
            <button onClick={navigateToMedicos} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              Ver na aba Médicos
            </button>
          </div>
        )}

        {nameMatches.length > 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">Sugestões por nome</p>
            <ul className="space-y-1">
              {nameMatches.map((match) => (
                <li key={match.id} className="flex items-center justify-between text-sm text-gray-700">
                  <span>
                    #{match.id} · {match.nome}
                  </span>
                  <button
                    onClick={() => {
                      setMedicoIdQuery(String(match.id))
                      setNameQuery(match.nome)
                      void handleSearchById(undefined, match.id)
                    }}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Detalhar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
