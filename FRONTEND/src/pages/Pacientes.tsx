import { FormEvent, useEffect, useMemo, useState } from 'react'
import TableSimple from '../components/dashboard/TableSimple'
import { normalizeSearchValue } from '../lib/utils'
import { createPaciente, deletePaciente, listPacientes, updatePaciente, type Paciente } from '../services/api'

type PacienteRow = { id: number; nome: string; cpf: string; data_nascimento: string }

function exportCSV(rows: any[]) {
  const headers = Object.keys(rows[0] || {})
  const csv = [headers.join(','), ...rows.map((r) => headers.map((h) => JSON.stringify(r[h] ?? '')).join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'pacientes.csv'
  a.click()
  URL.revokeObjectURL(url)
}

export default function Pacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editing, setEditing] = useState<Paciente | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [filterTerm, setFilterTerm] = useState('')

  useEffect(() => {
    void bootstrap()
  }, [])

  async function bootstrap() {
    setLoading(true)
    setError(null)
    try {
      const data = await listPacientes()
      setPacientes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível carregar pacientes')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSaving) return

    const form = new FormData(event.currentTarget)
    const nome = String(form.get('nome') || '').trim()
    const cpf = String(form.get('cpf') || '').trim()
    const telefone = String(form.get('telefone') || '').trim()
    const endereco = String(form.get('endereco') || '').trim()
    const data_nascimento = String(form.get('data_nascimento') || '').trim()

    if (!nome || !cpf) {
      setError('Nome e CPF são obrigatórios')
      return
    }

    try {
      setIsSaving(true)
      setError(null)
      if (editing) {
        await updatePaciente(editing.id, { nome, cpf, telefone: telefone || undefined, endereco: endereco || undefined, data_nascimento: data_nascimento || undefined })
      } else {
        await createPaciente({ nome, cpf, telefone: telefone || undefined, endereco: endereco || undefined, data_nascimento: data_nascimento || undefined })
      }
      event.currentTarget.reset()
      setEditing(null)
      setIsModalOpen(false)
      await bootstrap()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar o paciente')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(row: PacienteRow) {
    if (deletingId) return
    if (!window.confirm(`Excluir o paciente ${row.nome}?`)) return

    try {
      setDeletingId(row.id)
      await deletePaciente(row.id)
      await bootstrap()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível excluir o paciente')
    } finally {
      setDeletingId(null)
    }
  }

  function openModal(target?: PacienteRow) {
    if (target) {
      const found = pacientes.find((p) => p.id === target.id)
      setEditing(found ?? null)
    } else {
      setEditing(null)
    }
    setIsModalOpen(true)
  }

  const rows = useMemo<PacienteRow[]>(
    () =>
      pacientes.map((paciente) => ({
        id: paciente.id,
        nome: paciente.nome,
        cpf: paciente.cpf,
        data_nascimento: paciente.data_nascimento
          ? new Date(paciente.data_nascimento).toLocaleDateString('pt-BR')
          : '—',
      })),
    [pacientes],
  )
  const filteredRows = useMemo(() => {
    const query = filterTerm.trim()
    if (!query) return rows
    const normalized = normalizeSearchValue(query)
    return rows.filter((row) => {
      const values = [row.nome, row.cpf, row.data_nascimento]
      return values.some((value) => normalizeSearchValue(value).includes(normalized))
    })
  }, [rows, filterTerm])
  const birthDateValue = editing?.data_nascimento ? editing.data_nascimento.slice(0, 10) : ''

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Pacientes</h2>
          <p className="text-sm text-gray-500">Busque, filtre e exporte listas de pacientes</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => bootstrap()} className="px-4 py-2 border rounded-lg">Atualizar dados</button>
          <button onClick={() => window.location.reload()} className="px-4 py-2 border rounded-lg">Atualizar página (F5)</button>
          <button onClick={() => openModal()} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Novo Paciente</button>
          <button onClick={() => exportCSV(filteredRows)} disabled={!filteredRows.length} className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50">
            Exportar CSV
          </button>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label className="text-sm font-medium text-gray-600" htmlFor="pacientes-filter">Filtrar localmente</label>
        <input
          id="pacientes-filter"
          value={filterTerm}
          onChange={(event) => setFilterTerm(event.target.value)}
          placeholder="Nome, CPF ou data"
          className="w-full sm:w-80 px-3 py-2 border rounded-lg"
        />
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-500">Carregando pacientes...</div>
      ) : (
        <TableSimple<PacienteRow>
          columns={[{ key: 'nome', header: 'Nome' }, { key: 'cpf', header: 'CPF' }, { key: 'data_nascimento', header: 'Nascimento' }]}
          data={filteredRows}
          actionHeader="Ações"
          renderActions={(row) => (
            <>
              <button onClick={() => openModal(row)} className="text-blue-600 hover:underline">Editar</button>
              <button onClick={() => handleDelete(row)} className="text-red-600 hover:underline" disabled={deletingId === row.id}>
                {deletingId === row.id ? 'Excluindo...' : 'Excluir'}
              </button>
            </>
          )}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">{editing ? 'Editar paciente' : 'Novo paciente'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4" key={editing ? editing.id : 'new-paciente'}>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="paciente-nome">Nome</label>
                <input id="paciente-nome" name="nome" defaultValue={editing?.nome ?? ''} className="w-full px-3 py-2 border rounded-lg" placeholder="Nome completo" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="paciente-cpf">CPF</label>
                  <input id="paciente-cpf" name="cpf" defaultValue={editing?.cpf ?? ''} className="w-full px-3 py-2 border rounded-lg" placeholder="000.000.000-00" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="paciente-data">Data de nascimento</label>
                  <input id="paciente-data" name="data_nascimento" type="date" defaultValue={birthDateValue} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="paciente-telefone">Telefone</label>
                  <input id="paciente-telefone" name="telefone" defaultValue={editing?.telefone ?? ''} className="w-full px-3 py-2 border rounded-lg" placeholder="(11) 00000-0000" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="paciente-endereco">Endereço</label>
                  <input id="paciente-endereco" name="endereco" defaultValue={editing?.endereco ?? ''} className="w-full px-3 py-2 border rounded-lg" placeholder="Rua, número" />
                </div>
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
