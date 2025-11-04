from __future__ import annotations

from datetime import datetime
from typing import List, Optional

from sqlalchemy import or_
from sqlalchemy.exc import SQLAlchemyError

from app import db
from app.models.pacientes import Paciente


def get_all_pacientes() -> List[Paciente]:
    return Paciente.query.all()


def get_paciente_by_id(paciente_id: int) -> Paciente:
    return Paciente.query.get_or_404(paciente_id)


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


def create_paciente(data: dict) -> Paciente:
    nome = data.get("nome")
    cpf = data.get("cpf")
    if not nome or not cpf:
        raise ValueError("Nome e CPF sao obrigatorios")

    new_paciente = Paciente(
        nome=nome,
        cpf=cpf,
        telefone=data.get("telefone"),
        endereco=data.get("endereco"),
    )

    data_nascimento_str = data.get("data_nascimento")
    if data_nascimento_str:
        new_paciente.data_nascimento = datetime.strptime(
            data_nascimento_str, "%Y-%m-%d"
        ).date()

    db.session.add(new_paciente)
    _commit_session()
    return new_paciente


def update_paciente(paciente_id: int, data: dict) -> Paciente:
    paciente = get_paciente_by_id(paciente_id)

    paciente.nome = data.get("nome", paciente.nome)
    paciente.cpf = data.get("cpf", paciente.cpf)
    paciente.telefone = data.get("telefone", paciente.telefone)
    paciente.endereco = data.get("endereco", paciente.endereco)

    data_nascimento_str = data.get("data_nascimento")
    if data_nascimento_str:
        paciente.data_nascimento = datetime.strptime(
            data_nascimento_str, "%Y-%m-%d"
        ).date()

    _commit_session()
    return paciente


def delete_paciente(paciente_id: int) -> None:
    paciente = get_paciente_by_id(paciente_id)
    db.session.delete(paciente)
    _commit_session()


def _commit_session() -> None:
    try:
        db.session.commit()
    except SQLAlchemyError:
        db.session.rollback()
        raise
