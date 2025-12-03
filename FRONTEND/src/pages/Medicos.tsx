import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import TableSimple from '../components/dashboard/TableSimple'
import { normalizeSearchValue } from '../lib/utils'
import { createMedico, deleteMedico, listEspecialidades, listMedicos, updateMedico, type Medico as MedicoDto, type Especialidade } from '../services/api'

type MedicoRow = { id: number; nome: string; crm: string; especialidade: string }

export default function Medicos() {
  const [medicos, setMedicos] = useState<MedicoDto[]>([])
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<MedicoDto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [filterTerm, setFilterTerm] = useState('')
  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    void bootstrap()
  }, [])

  async function bootstrap() {
    setLoading(true)
    setError(null)
    try {
      const [medicosData, especialidadesData] = await Promise.all([listMedicos(), listEspecialidades()])
      setEspecialidades(especialidadesData)
      setMedicos(medicosData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível carregar os médicos')
    } finally {
      setLoading(false)
    }
  }

  function mapRows(medicosList: MedicoDto[], especialidadesList: Especialidade[]): MedicoRow[] {
    const lookup = new Map(especialidadesList.map((esp) => [esp.id, esp.nome]))
    return medicosList.map((medico) => ({
      id: medico.id,
      nome: medico.nome,
      crm: medico.crm,
      especialidade: lookup.get(medico.especialidade_id) ?? `#${medico.especialidade_id}`,
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSaving) {
      return
    }

    const formElement = formRef.current
    if (!formElement) {
      return
    }
    const form = new FormData(formElement)
    const nome = String(form.get('nome') || '').trim()
    const crm = String(form.get('crm') || '').trim()
    const especialidadeId = Number(form.get('especialidade_id'))

    if (!nome || !crm || !especialidadeId) {
      setError('Preencha todos os campos do formulário')
      return
    }

    try {
      setIsSaving(true)
      setError(null)
      setSuccessMessage(null)
      if (editing) {
        await updateMedico(editing.id, { nome, crm, especialidade_id: especialidadeId })
      } else {
        await createMedico({ nome, crm, especialidade_id: especialidadeId })
      }
      formElement.reset()
      setEditing(null)
      setOpen(false)
      const actionLabel = editing ? 'atualizado' : 'criado'
      setSuccessMessage(`Médico ${nome} ${actionLabel} com sucesso.`)
      setError(null)
      await bootstrap()
    } catch (err) {
      const fallback = editing ? 'Não foi possível atualizar o médico.' : 'Não foi possível criar o médico.'
      setError(err instanceof Error ? err.message : fallback)
      setSuccessMessage(null)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(row: MedicoRow) {
    if (deletingId) return
    if (!window.confirm(`Excluir o médico ${row.nome}?`)) return

    try {
      setDeletingId(row.id)
      await deleteMedico(row.id)
      setSuccessMessage(`Médico ${row.nome} excluído com sucesso.`)
      setError(null)
      await bootstrap()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível excluir o médico.')
      setSuccessMessage(null)
    } finally {
      setDeletingId(null)
    }
  }

  function openModal(target?: MedicoRow) {
    setError(null)
    setSuccessMessage(null)
    if (target) {
      const found = medicos.find((m) => m.id === target.id)
      setEditing(found ?? null)
    } else {
      setEditing(null)
    }
    setOpen(true)
  }

  const especialidadeOptions = useMemo(() => especialidades.slice().sort((a, b) => a.nome.localeCompare(b.nome)), [especialidades])
  const rows = useMemo(() => mapRows(medicos, especialidades), [medicos, especialidades])
  const filteredRows = useMemo(() => {
    const query = filterTerm.trim()
    if (!query) return rows
    const normalized = normalizeSearchValue(query)
    return rows.filter((row) => {
      const values = [row.nome, row.crm, row.especialidade]
      return values.some((value) => normalizeSearchValue(value).includes(normalized))
    })
  }, [rows, filterTerm])
  const isEditing = Boolean(editing)

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Médicos</h2>
          <p className="text-sm text-gray-500">Gerencie o cadastro de médicos e especialidades</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => bootstrap()} className="px-4 py-2 border rounded-lg">Atualizar dados</button>
          <button onClick={() => window.location.reload()} className="px-4 py-2 border rounded-lg">Atualizar página (F5)</button>
          <button onClick={() => openModal()} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm">Novo Médico</button>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {successMessage && !error && <p className="mb-4 text-sm text-green-600">{successMessage}</p>}

      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label className="text-sm font-medium text-gray-600" htmlFor="medicos-filter">Filtrar localmente</label>
        <input
          id="medicos-filter"
          value={filterTerm}
          onChange={(event) => setFilterTerm(event.target.value)}
          placeholder="Busque por nome, CRM ou especialidade"
          className="w-full sm:w-80 px-3 py-2 border rounded-lg"
        />
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-500">Carregando médicos...</div>
      ) : (
        <TableSimple<MedicoRow>
          columns={[{ key: 'nome', header: 'Nome' }, { key: 'crm', header: 'CRM' }, { key: 'especialidade', header: 'Especialidade' }]}
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

      {open && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Editar' : 'Criar'} Médico</h3>
            <form ref={formRef} onSubmit={handleSubmit} id="medico-form" key={editing ? editing.id : 'new'}>
              <div className="space-y-3">
                <input name="nome" defaultValue={editing?.nome ?? ''} placeholder="Nome" className="w-full px-3 py-2 border rounded-lg" />
                <input name="crm" defaultValue={editing?.crm ?? ''} placeholder="CRM" className="w-full px-3 py-2 border rounded-lg" />
                <select name="especialidade_id" defaultValue={editing?.especialidade_id ?? ''} className="w-full px-3 py-2 border rounded-lg bg-white">
                  <option value="" disabled>
                    Selecione uma especialidade
                  </option>
                  {especialidadeOptions.map((esp) => (
                    <option key={esp.id} value={esp.id}>
                      {esp.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={() => { setOpen(false); setEditing(null) }} className="px-3 py-2 rounded-lg">Cancelar</button>
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
