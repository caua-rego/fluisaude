import { FormEvent, useEffect, useMemo, useState } from 'react'
import { normalizeSearchValue } from '../lib/utils'
import { createEspecialidade, deleteEspecialidade, listEspecialidades, updateEspecialidade, type Especialidade as EspecialidadeDto } from '../services/api'

export default function Especialidades() {
  const [especialidades, setEspecialidades] = useState<EspecialidadeDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [editing, setEditing] = useState<EspecialidadeDto | null>(null)
  const [filterTerm, setFilterTerm] = useState('')

  useEffect(() => {
    void bootstrap()
  }, [])

  async function bootstrap() {
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSaving) return

    const form = new FormData(event.currentTarget)
    const nome = String(form.get('nome') || '').trim()
    const descricao = String(form.get('descricao') || '').trim()

    if (!nome) {
      setError('Informe um nome para a especialidade')
      return
    }

    try {
      setIsSaving(true)
      setError(null)
      if (editing) {
        await updateEspecialidade(editing.id, { nome, descricao: descricao || undefined })
      } else {
        await createEspecialidade({ nome, descricao: descricao || undefined })
      }
      event.currentTarget.reset()
      setEditing(null)
      setIsModalOpen(false)
      await bootstrap()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar a especialidade')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (deletingId) return
    const confirmed = window.confirm('Remover esta especialidade?')
    if (!confirmed) return

    try {
      setDeletingId(id)
      await deleteEspecialidade(id)
      await bootstrap()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível remover a especialidade')
    } finally {
      setDeletingId(null)
    }
  }

  function openModal(target?: EspecialidadeDto) {
    setEditing(target ?? null)
    setIsModalOpen(true)
  }

  const filteredEspecialidades = useMemo(() => {
    const query = filterTerm.trim()
    if (!query) return especialidades
    const normalized = normalizeSearchValue(query)
    return especialidades.filter((item) => {
      const values = [item.nome, item.descricao ?? '']
      return values.some((value) => normalizeSearchValue(value || '').includes(normalized))
    })
  }, [especialidades, filterTerm])
  const hasResults = filteredEspecialidades.length > 0

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Especialidades</h2>
          <p className="text-sm text-gray-500">Gerencie o catálogo de especialidades</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => bootstrap()} className="px-4 py-2 border rounded-lg">Atualizar dados</button>
          <button onClick={() => window.location.reload()} className="px-4 py-2 border rounded-lg">Atualizar página (F5)</button>
          <button onClick={() => openModal()} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm">Nova Especialidade</button>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label className="text-sm font-medium text-gray-600" htmlFor="especialidades-filter">Filtrar localmente</label>
        <input
          id="especialidades-filter"
          value={filterTerm}
          onChange={(event) => setFilterTerm(event.target.value)}
          placeholder="Nome ou descrição"
          className="w-full sm:w-80 px-3 py-2 border rounded-lg"
        />
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-500">Carregando especialidades...</div>
      ) : hasResults ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Descrição</th>
                <th className="px-4 py-3 w-32 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredEspecialidades.map((item) => (
                <tr key={item.id} className="border-t last:border-b">
                  <td className="px-4 py-3 font-medium text-gray-900">{item.nome}</td>
                  <td className="px-4 py-3 text-gray-600">{item.descricao || '—'}</td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button onClick={() => openModal(item)} className="text-blue-600 hover:underline">Editar</button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="text-sm text-red-600 disabled:opacity-50"
                    >
                      {deletingId === item.id ? 'Removendo...' : 'Excluir'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-12 text-center text-gray-400">Nenhuma especialidade cadastrada</div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">{editing ? 'Editar especialidade' : 'Nova especialidade'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4" key={editing ? editing.id : 'new-especialidade'}>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="especialidade-nome">
                  Nome
                </label>
                <input id="especialidade-nome" name="nome" defaultValue={editing?.nome ?? ''} className="w-full px-3 py-2 border rounded-lg" placeholder="Ex.: Cardiologia" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="especialidade-desc">
                  Descrição (opcional)
                </label>
                <textarea id="especialidade-desc" name="descricao" defaultValue={editing?.descricao ?? ''} className="w-full px-3 py-2 border rounded-lg" rows={3} placeholder="Breve descrição" />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => { setIsModalOpen(false); setEditing(null) }} className="px-4 py-2 rounded-lg">
                  Cancelar
                </button>
                <button type="submit" disabled={isSaving} className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50">
                  {isSaving ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
