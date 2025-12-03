import { useEffect, useMemo, useState } from 'react'
import { listEspecialidades, type Especialidade } from '../../services/api'

export default function EspecialidadesWidget() {
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void loadEspecialidades()
  }, [])

  async function loadEspecialidades() {
    setLoading(true)
    setError(null)
    try {
      const data = await listEspecialidades()
      setEspecialidades(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível carregar especialidades')
    } finally {
      setLoading(false)
    }
  }

  const items = useMemo(() => especialidades.slice(0, 6), [especialidades])

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold">Especialidades</h3>
          <p className="text-xs text-gray-500">{especialidades.length} cadastradas</p>
        </div>
        <button
          onClick={() => loadEspecialidades()}
          className="text-xs font-medium text-blue-600 hover:text-blue-500"
        >
          Atualizar
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">Carregando...</div>
      ) : items.length ? (
        <ul className="flex-1 space-y-2 text-sm text-gray-700">
          {items.map((item) => (
            <li key={item.id} className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900">{item.nome}</p>
                {item.descricao && <p className="text-xs text-gray-500">{item.descricao}</p>}
              </div>
              <span className="text-xs text-gray-400">#{item.id}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
          Nenhuma especialidade cadastrada
        </div>
      )}

      {especialidades.length > items.length && (
        <p className="mt-3 text-xs text-gray-500">+{especialidades.length - items.length} especialidades fora da visualização</p>
      )}
    </div>
  )
}
