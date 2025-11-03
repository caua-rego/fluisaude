"""Controlador com regras de negocio para medicos."""
from typing import List

from app import db
from app.models.medico import Medico
from .utils import commit_session


def create_medico(data: dict) -> Medico:
    """Cria um medico garantindo campos obrigatorios."""
    payload = data or {}
    nome = payload.get('nome')
    crm = payload.get('crm')
    especialidade_id = payload.get('especialidade_id')

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
    """Retorna todos os medicos."""
    return Medico.query.all()


def get_medico_by_id(medico_id: int) -> Medico:
    """Obtem medico por ID ou gera 404."""
    return Medico.query.get_or_404(medico_id)


def update_medico(medico_id: int, data: dict) -> Medico:
    """Atualiza um medico existente."""
    medico = get_medico_by_id(medico_id)
    payload = data or {}
    medico.nome = payload.get('nome', medico.nome)
    medico.crm = payload.get('crm', medico.crm)
    medico.especialidade_id = payload.get('especialidade_id', medico.especialidade_id)
    commit_session()
    return medico


def delete_medico(medico_id: int) -> None:
    """Exclui um medico."""
    medico = get_medico_by_id(medico_id)
    db.session.delete(medico)
    commit_session()
