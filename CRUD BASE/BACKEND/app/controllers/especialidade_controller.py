"""Regras de negocio para especialidades medicas."""
from typing import List

from app import db
from app.models.especialidade import Especialidade
from .utils import commit_session


def create_especialidade(data: dict) -> Especialidade:
    payload = data or {}
    nome = payload.get('nome')
    if not nome:
        raise ValueError('O campo "nome" e obrigatorio.')

    especialidade = Especialidade(nome=nome)
    db.session.add(especialidade)
    commit_session()
    return especialidade


def list_especialidades() -> List[Especialidade]:
    return Especialidade.query.all()


def get_especialidade_by_id(especialidade_id: int) -> Especialidade:
    return Especialidade.query.get_or_404(especialidade_id)


def update_especialidade(especialidade_id: int, data: dict) -> Especialidade:
    especialidade = get_especialidade_by_id(especialidade_id)
    payload = data or {}
    especialidade.nome = payload.get('nome', especialidade.nome)
    commit_session()
    return especialidade


def delete_especialidade(especialidade_id: int) -> None:
    especialidade = get_especialidade_by_id(especialidade_id)
    db.session.delete(especialidade)
    commit_session()
