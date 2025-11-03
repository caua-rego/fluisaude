"""Regras de negocio e validacao para consultas."""
from datetime import datetime
from typing import List

from app import db
from app.models.consulta import Consulta
from .utils import commit_session


def _parse_datetime(value) -> datetime:
    """Normaliza strings de data/hora aceitas pelo frontend."""
    if isinstance(value, datetime):
        return value
    if not value:
        raise ValueError('O campo "data_agendamento" e obrigatorio.')

    try:
        return datetime.fromisoformat(value)
    except Exception:
        try:
            return datetime.strptime(value, '%Y-%m-%dT%H:%M')
        except Exception as exc:
            raise ValueError('Formato de data invalido.') from exc


def create_consulta(data: dict) -> Consulta:
    payload = data or {}
    try:
        paciente_id = int(payload.get('paciente_id'))
        medico_id = int(payload.get('medico_id'))
    except (TypeError, ValueError) as exc:
        raise ValueError('Os campos "paciente_id" e "medico_id" devem ser numericos.') from exc

    consulta = Consulta(
        paciente_id=paciente_id,
        medico_id=medico_id,
        data_agendamento=_parse_datetime(payload.get('data_agendamento')),
        status=payload.get('status') or 'agendado',
    )
    db.session.add(consulta)
    commit_session()
    return consulta


def list_consultas() -> List[Consulta]:
    return Consulta.query.all()


def get_consulta_by_id(consulta_id: int) -> Consulta:
    return Consulta.query.get_or_404(consulta_id)


def update_consulta(consulta_id: int, data: dict) -> Consulta:
    consulta = get_consulta_by_id(consulta_id)
    payload = data or {}

    if 'paciente_id' in payload and payload.get('paciente_id') is not None:
        try:
            consulta.paciente_id = int(payload.get('paciente_id'))
        except (TypeError, ValueError) as exc:
            raise ValueError('O campo "paciente_id" deve ser numerico.') from exc

    if 'medico_id' in payload and payload.get('medico_id') is not None:
        try:
            consulta.medico_id = int(payload.get('medico_id'))
        except (TypeError, ValueError) as exc:
            raise ValueError('O campo "medico_id" deve ser numerico.') from exc

    if 'data_agendamento' in payload and payload.get('data_agendamento'):
        consulta.data_agendamento = _parse_datetime(payload.get('data_agendamento'))

    if 'status' in payload and payload.get('status'):
        consulta.status = payload.get('status')

    commit_session()
    return consulta


def delete_consulta(consulta_id: int) -> None:
    consulta = get_consulta_by_id(consulta_id)
    db.session.delete(consulta)
    commit_session()
