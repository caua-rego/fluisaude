import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import TableSimple from '../components/dashboard/TableSimple'
import { normalizeSearchValue } from '../lib/utils'
import { createConsulta, deleteConsulta, listConsultas, listMedicos, listPacientes, updateConsulta, type Consulta as ConsultaDto, type Medico, type Paciente } from '../services/api'

type ConsultaRow = { id: number; paciente: string; medico: string; data_hora: string; status: string }

export default function Consultas() {
  const [consultas, setConsultas] = useState<ConsultaDto[]>([])
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [medicos, setMedicos] = useState<Medico[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editing, setEditing] = useState<ConsultaDto | null>(null)
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
      const [consultasData, pacientesData, medicosData] = await Promise.all([listConsultas(), listPacientes(), listMedicos()])
      setConsultas(consultasData)
      setPacientes(pacientesData)
      setMedicos(medicosData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível carregar consultas')
    } finally {
      setLoading(false)
    }
  }

  function openModal(row?: ConsultaRow) {
    setError(null)
    setSuccessMessage(null)
    if (row) {
      const found = consultas.find((consulta) => consulta.id === row.id)
      setEditing(found ?? null)
    } else {
      setEditing(null)
    }
    setIsModalOpen(true)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSaving) return

    const formElement = formRef.current
    if (!formElement) {
      return
    }
    const form = new FormData(formElement)
    const pacienteId = Number(form.get('paciente_id'))
    const medicoId = Number(form.get('medico_id'))
    const dataAgendamentoRaw = String(form.get('data_agendamento') || '')
    const status = String(form.get('status') || '').trim() || 'agendado'

    if (!pacienteId || !medicoId || !dataAgendamentoRaw) {
      setError('Selecione paciente, médico e data para criar a consulta')
      return
    }

    const isoDate = new Date(dataAgendamentoRaw).toISOString()

    try {
      setIsSaving(true)
      setError(null)
      setSuccessMessage(null)
      if (editing) {
        await updateConsulta(editing.id, { paciente_id: pacienteId, medico_id: medicoId, data_agendamento: isoDate, status })
      } else {
        await createConsulta({ paciente_id: pacienteId, medico_id: medicoId, data_agendamento: isoDate, status })
      }
      formElement.reset()
      setEditing(null)
      setIsModalOpen(false)
      const pacienteNome = pacientes.find((p) => p.id === pacienteId)?.nome ?? `Paciente #${pacienteId}`
      const medicoNome = medicos.find((m) => m.id === medicoId)?.nome ?? `Médico #${medicoId}`
      const successText = editing ? `Consulta #${editing.id} atualizada com sucesso.` : `Consulta criada com sucesso para ${pacienteNome} com ${medicoNome}.`
      setSuccessMessage(successText)
      setError(null)
      await bootstrap()
    } catch (err) {
      const fallback = editing ? 'Não foi possível atualizar a consulta.' : 'Não foi possível criar a consulta.'
      setError(err instanceof Error ? err.message : fallback)
      setSuccessMessage(null)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(row: ConsultaRow) {
    if (deletingId) return
    if (!window.confirm(`Excluir a consulta #${row.id}?`)) return

    try {
      setDeletingId(row.id)
      await deleteConsulta(row.id)
      setSuccessMessage(`Consulta #${row.id} excluída com sucesso.`)
      setError(null)
      await bootstrap()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível excluir a consulta.')
      setSuccessMessage(null)
    } finally {
      setDeletingId(null)
    }
  }

  const rows = useMemo<ConsultaRow[]>(() => {
    const pacienteLookup = new Map(pacientes.map((paciente) => [paciente.id, paciente.nome]))
    const medicoLookup = new Map(medicos.map((medico) => [medico.id, medico.nome]))
    return consultas.map((consulta) => ({
      id: consulta.id,
      paciente: pacienteLookup.get(consulta.paciente_id) ?? `Paciente #${consulta.paciente_id}`,
      medico: medicoLookup.get(consulta.medico_id) ?? `Médico #${consulta.medico_id}`,
      data_hora: new Date(consulta.data_agendamento).toLocaleString('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
      status: consulta.status,
    }))
  }, [consultas, pacientes, medicos])
  const filteredRows = useMemo(() => {
    const query = filterTerm.trim()
    if (!query) return rows
    const normalized = normalizeSearchValue(query)
    return rows.filter((row) => {
      const values = [row.paciente, row.medico, row.status, row.data_hora]
      return values.some((value) => normalizeSearchValue(value).includes(normalized))
    })
  }, [rows, filterTerm])
  const datetimeValue = editing ? new Date(editing.data_agendamento).toISOString().slice(0, 16) : ''

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Consultas</h2>
          <p className="text-sm text-gray-500">Filtrar por data, médico, paciente e status</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => bootstrap()} className="px-4 py-2 border rounded-lg">Atualizar dados</button>
          <button onClick={() => window.location.reload()} className="px-4 py-2 border rounded-lg">Atualizar página (F5)</button>
          <button onClick={() => openModal()} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Nova Consulta</button>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {successMessage && !error && <p className="mb-4 text-sm text-green-600">{successMessage}</p>}

      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label className="text-sm font-medium text-gray-600" htmlFor="consultas-filter">Filtrar localmente</label>
        <input
          id="consultas-filter"
          value={filterTerm}
          onChange={(event) => setFilterTerm(event.target.value)}
          placeholder="Paciente, médico, status ou data"
          className="w-full sm:w-96 px-3 py-2 border rounded-lg"
        />
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-500">Carregando consultas...</div>
      ) : (
        <TableSimple<ConsultaRow>
          columns={[{ key: 'paciente', header: 'Paciente' }, { key: 'medico', header: 'Médico' }, { key: 'data_hora', header: 'Data/Hora' }, { key: 'status', header: 'Status' }]}
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
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">{editing ? 'Editar consulta' : 'Nova consulta'}</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" key={editing ? editing.id : 'new-consulta'}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="consulta-paciente">Paciente</label>
                  <select id="consulta-paciente" name="paciente_id" defaultValue={editing?.paciente_id ?? ''} className="w-full px-3 py-2 border rounded-lg bg-white">
                    <option value="" disabled>
                      Selecione um paciente
                    </option>
                    {pacientes.map((paciente) => (
                      <option key={paciente.id} value={paciente.id}>
                        {paciente.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="consulta-medico">Médico</label>
                  <select id="consulta-medico" name="medico_id" defaultValue={editing?.medico_id ?? ''} className="w-full px-3 py-2 border rounded-lg bg-white">
                    <option value="" disabled>
                      Selecione um médico
                    </option>
                    {medicos.map((medico) => (
                      <option key={medico.id} value={medico.id}>
                        {medico.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="consulta-data">Data e hora</label>
                  <input id="consulta-data" name="data_agendamento" type="datetime-local" defaultValue={datetimeValue} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="consulta-status">Status</label>
                  <select id="consulta-status" name="status" defaultValue={editing?.status ?? 'agendado'} className="w-full px-3 py-2 border rounded-lg bg-white">
                    <option value="agendado">Agendado</option>
                    <option value="confirmado">Confirmado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
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
