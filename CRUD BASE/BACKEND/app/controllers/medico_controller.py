from typing import List

from app import db
from app.models.medico import Medico
from .utils import commit_session


def create_medico(data: dict) -> Medico:
    payload = data or {}
    nome = payload.get("nome")
    crm = payload.get("crm")
    especialidade_id = payload.get("especialidade_id")

    if not nome:
        raise ValueError('O campo "nome" e obrigatorio.')
    if not crm:
        raise ValueError('O campo "crm" e obrigatorio.')
    if especialidade_id is None:
        raise ValueError('O campo "especialidade_id" e obrigatorio.')

    medico = Medico(nome=nome, crm=crm, especialidade_id=especialidade_id)
    db.session.add(medico)
    commit_session()
    return medico


def list_medicos() -> List[Medico]:
    return Medico.query.all()


def get_medico_by_id(medico_id: int) -> Medico:
    return Medico.query.get_or_404(medico_id)


def update_medico(medico_id: int, data: dict) -> Medico:
    medico = get_medico_by_id(medico_id)
    payload = data or {}
    medico.nome = payload.get("nome", medico.nome)
    medico.crm = payload.get("crm", medico.crm)
    medico.especialidade_id = payload.get("especialidade_id", medico.especialidade_id)
    commit_session()
    return medico


def delete_medico(medico_id: int) -> None:
    medico = get_medico_by_id(medico_id)
    db.session.delete(medico)
    commit_session()
