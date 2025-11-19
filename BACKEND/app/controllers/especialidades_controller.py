from __future__ import annotations

from typing import List, Optional

from sqlalchemy import or_
from sqlalchemy.exc import SQLAlchemyError

from app import db
from app.models.especialidades import Especialidade


def get_all_especialidades() -> List[Especialidade]:
    return Especialidade.query.order_by(Especialidade.nome).all()


def get_especialidade_by_id(especialidade_id: int) -> Especialidade:
    return Especialidade.query.get_or_404(especialidade_id)


def get_especialidade_by_nome(nome: str) -> Optional[Especialidade]:
    if not nome:
        return None
    return Especialidade.query.filter_by(nome=nome).first()


def search_especialidades(term: str) -> List[Especialidade]:
    if not term:
        return []
    return (
        Especialidade.query.filter(
            or_(
                Especialidade.nome.contains(term),
                Especialidade.descricao.contains(term),
            )
        )
        .order_by(Especialidade.nome)
        .all()
    )


def create_especialidade(data: dict) -> Especialidade:
    nome = data.get("nome")
    if not nome:
        raise ValueError("O nome da especialidade é obrigatório.")

    if get_especialidade_by_nome(nome):
        raise ValueError(f"A especialidade '{nome}' já existe.")

    new_especialidade = Especialidade(
        nome=nome,
        descricao=data.get("descricao"),
    )

    db.session.add(new_especialidade)
    _commit_session()
    return new_especialidade


def update_especialidade(especialidade_id: int, data: dict) -> Especialidade:
    especialidade = get_especialidade_by_id(especialidade_id)

    novo_nome = data.get("nome")
    if novo_nome and novo_nome != especialidade.nome:
        if get_especialidade_by_nome(novo_nome):
            raise ValueError(f"A especialidade '{novo_nome}' já existe.")
        especialidade.nome = novo_nome

    if "descricao" in data:
        especialidade.descricao = data.get("descricao")

    _commit_session()
    return especialidade


def delete_especialidade(especialidade_id: int) -> None:
    especialidade = get_especialidade_by_id(especialidade_id)
    db.session.delete(especialidade)
    _commit_session()


def _commit_session() -> None:
    try:
        db.session.commit()
    except SQLAlchemyError as e:
        db.session.rollback()
        raise e

