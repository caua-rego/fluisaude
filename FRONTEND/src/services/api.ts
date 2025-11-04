import axios from 'axios';

// Use relative base so the built frontend can be served from the same origin as the Flask API
const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funções para Pacientes
export const getPacientes = () => api.get('/pacientes');
export const getPacienteById = (id: number) => api.get(`/pacientes/${id}`);
export const createPaciente = (paciente: any) => api.post('/pacientes', paciente);
export const updatePaciente = (id: number, paciente: any) => api.put(`/pacientes/${id}`, paciente);
export const deletePaciente = (id: number) => api.delete(`/pacientes/${id}`);

// Funções para Médicos
export const getMedicos = () => api.get('/medicos');
export const getMedicoById = (id: number) => api.get(`/medicos/${id}`);
export const createMedico = (medico: any) => api.post('/medicos', medico);
export const updateMedico = (id: number, medico: any) => api.put(`/medicos/${id}`, medico);
export const deleteMedico = (id: number) => api.delete(`/medicos/${id}`);

// Funções para Especialidades
export const getEspecialidades = () => api.get('/especialidades');
export const getEspecialidadeById = (id: number) => api.get(`/especialidades/${id}`);
export const createEspecialidade = (especialidade: any) => api.post('/especialidades', especialidade);
export const updateEspecialidade = (id: number, especialidade: any) => api.put(`/especialidades/${id}`, especialidade);
export const deleteEspecialidade = (id: number) => api.delete(`/especialidades/${id}`);

// Funções para Consultas
export const getConsultas = () => api.get('/consultas');
export const getConsultaById = (id: number) => api.get(`/consultas/${id}`);
export const createConsulta = (consulta: any) => api.post('/consultas', consulta);
export const updateConsulta = (id: number, consulta: any) => api.put(`/consultas/${id}`, consulta);
export const deleteConsulta = (id: number) => api.delete(`/consultas/${id}`);
