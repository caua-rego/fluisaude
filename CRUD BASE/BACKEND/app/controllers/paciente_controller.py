from typing import List, Optional

from sqlalchemy import or_

from app import db
from app.models.paciente import Paciente
from .utils import commit_session


def create_paciente(data: dict) -> Paciente:
    payload = data or {}
    nome = payload.get("nome")
    cpf = payload.get("cpf")
    if not nome:
        raise ValueError('O campo "nome" e obrigatorio.')
    if not cpf:
        raise ValueError('O campo "cpf" e obrigatorio.')

    paciente = Paciente(nome=nome, cpf=cpf, telefone=payload.get("telefone"))
    db.session.add(paciente)
    commit_session()
    return paciente


def list_pacientes() -> List[Paciente]:
    return Paciente.query.all()


def get_paciente_by_id(paciente_id: int) -> Paciente:
    return Paciente.query.get_or_404(paciente_id)


def update_paciente(paciente_id: int, data: dict) -> Paciente:
    paciente = get_paciente_by_id(paciente_id)
    payload = data or {}
    paciente.nome = payload.get("nome", paciente.nome)
    paciente.cpf = payload.get("cpf", paciente.cpf)
    paciente.telefone = payload.get("telefone", paciente.telefone)
    commit_session()
    return paciente


def delete_paciente(paciente_id: int) -> None:
    paciente = get_paciente_by_id(paciente_id)
    db.session.delete(paciente)
    commit_session()


def get_paciente_by_cpf(cpf: str) -> Optional[Paciente]:
    if not cpf:
        return None
    return Paciente.query.filter_by(cpf=cpf).first()


def search_pacientes(term: str) -> List[Paciente]:
    if not term:
        return []
    return (
        Paciente.query.filter(
            or_(Paciente.nome.contains(term), Paciente.cpf.contains(term))
        )
        .all()
    )
