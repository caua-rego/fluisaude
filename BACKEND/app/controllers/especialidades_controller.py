from __future__ import annotations

from typing import List

from sqlalchemy.exc import SQLAlchemyError

from app import db
from app.models.especialidades import Especialidade


def create_especialidade(data: dict) -> Especialidade:
    payload = data or {}
    nome = payload.get("nome")

    if not nome:
        raise ValueError('O campo "nome" e obrigatorio.')

    especialidade = Especialidade(nome=nome, descricao=payload.get("descricao"))
    db.session.add(especialidade)
    _commit_session()
    return especialidade


def list_especialidades() -> List[Especialidade]:
    return Especialidade.query.all()


def get_especialidade_by_id(especialidade_id: int) -> Especialidade:
    return Especialidade.query.get_or_404(especialidade_id)


def update_especialidade(especialidade_id: int, data: dict) -> Especialidade:
    especialidade = get_especialidade_by_id(especialidade_id)
    payload = data or {}
    if "nome" in payload:
        especialidade.nome = payload["nome"]
    if "descricao" in payload:
        especialidade.descricao = payload["descricao"]
    _commit_session()
    return especialidade


def delete_especialidade(especialidade_id: int) -> None:
    especialidade = get_especialidade_by_id(especialidade_id)
    db.session.delete(especialidade)
    _commit_session()


def _commit_session() -> None:
    try:
        db.session.commit()
    except SQLAlchemyError:
        db.session.rollback()
        raise
