const FALLBACK_API_URL = 'http://127.0.0.1:5001/api'

const DEFAULT_API_URL =
  typeof window !== 'undefined' && window.location?.origin
    ? `${window.location.origin.replace(/\/$/, '')}/api`
    : FALLBACK_API_URL

const API_BASE_URL = (import.meta.env?.VITE_API_BASE_URL ?? DEFAULT_API_URL).replace(/\/$/, '')

export type Paciente = {
  id: number
  nome: string
  cpf: string
  data_nascimento: string | null
  telefone?: string | null
  endereco?: string | null
}

export type PacientePayload = {
  nome: string
  cpf: string
  telefone?: string
  endereco?: string
  data_nascimento?: string
}

export type Medico = {
  id: number
  nome: string
  crm: string
  especialidade_id: number
}

export type MedicoPayload = {
  nome: string
  crm: string
  especialidade_id: number
}

export type Especialidade = {
  id: number
  nome: string
  descricao?: string | null
}

export type EspecialidadePayload = {
  nome: string
  descricao?: string
}

export type Consulta = {
  id: number
  paciente_id: number
  medico_id: number
  data_agendamento: string
  status: string
}

export type ConsultaPayload = {
  paciente_id: number
  medico_id: number
  data_agendamento: string
  status?: string
}

type RequestConfig = RequestInit & { skipJson?: boolean }

async function request<TResponse>(path: string, config: RequestConfig = {}): Promise<TResponse> {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const url = `${API_BASE_URL}${normalizedPath}`

  const headers = new Headers(config.headers)
  if (!headers.has('Content-Type') && config.body) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(url, {
    ...config,
    headers,
  })

  if (!response.ok) {
    const fallback = `Erro ${response.status}`
    let detail = fallback
    try {
      const data = await response.json()
      detail = typeof data?.error === 'string' ? data.error : fallback
    } catch {
      detail = fallback
    }
    const error = new Error(detail)
    throw error
  }

  if (config.skipJson || response.status === 204) {
    return undefined as TResponse
  }

  return (await response.json()) as TResponse
}

export function listPacientes() {
  return request<Paciente[]>('/pacientes/')
}

export function createPaciente(payload: PacientePayload) {
  return request<Paciente>('/pacientes/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updatePaciente(id: number, payload: Partial<PacientePayload>) {
  return request<Paciente>(`/pacientes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export function deletePaciente(id: number) {
  return request<void>(`/pacientes/${id}`, {
    method: 'DELETE',
    skipJson: true,
  })
}

export function listMedicos() {
  return request<Medico[]>('/medicos/')
}

export function getMedico(id: number) {
  return request<Medico>(`/medicos/${id}`)
}

export function createMedico(payload: MedicoPayload) {
  return request<Medico>('/medicos/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateMedico(id: number, payload: Partial<MedicoPayload>) {
  return request<Medico>(`/medicos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export function deleteMedico(id: number) {
  return request<void>(`/medicos/${id}`, {
    method: 'DELETE',
    skipJson: true,
  })
}

export function listEspecialidades() {
  return request<Especialidade[]>('/especialidades/')
}

export function createEspecialidade(payload: EspecialidadePayload) {
  return request<Especialidade>('/especialidades/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateEspecialidade(id: number, payload: Partial<EspecialidadePayload>) {
  return request<Especialidade>(`/especialidades/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export function deleteEspecialidade(id: number) {
  return request<void>(`/especialidades/${id}`, {
    method: 'DELETE',
    skipJson: true,
  })
}

export function listConsultas() {
  return request<Consulta[]>('/consultas/')
}

export function createConsulta(payload: ConsultaPayload) {
  return request<Consulta>('/consultas/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateConsulta(id: number, payload: Partial<ConsultaPayload>) {
  return request<Consulta>(`/consultas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export function deleteConsulta(id: number) {
  return request<void>(`/consultas/${id}`, {
    method: 'DELETE',
    skipJson: true,
  })
}
