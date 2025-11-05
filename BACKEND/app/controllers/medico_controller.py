from __future__ import annotations

from typing import List

from sqlalchemy.exc import SQLAlchemyError 

from app import db
from app.models.medicos import Medico

def create_medico(data: dict) -> Medico:
    payload = data or {}
    nome = payload.get("nome")
    crm = payload.get("crm")
    especialidade_id = payload.get("especialidade_id")

    if not nome:
        raise ValueError("O campo nome é obrigatório")
    if not crm:
        raise ValueError("O campo CRM é obrigatório")
    if not especialidade_id:
        raise ValueError("O campo especialide_id é obrigatório")
    
    medico = Medico(nome=nome, crm=crm, especialidade_id=especialidade_id)
    db.session.add(medico)
    _commit_session()
    return medico

def list_medicos() -> List[Medico]:
    return Medico.query.all()

def get_medico_by_id(medico_id: int):
    return Medico.query.get_or_404(medico_id)


def update_medico(medico_id: int, data: dict) -> Medico :  
    medico  =   get_medico_by_id(medico_id)
    payload  = data or {}
    medico.nome  = payload.get("nome",medico.nome)
    medico_crm = payload.get("crm",medico.crm)
    if "especialidade_id" in payload:
        medico.especialidade_id = payload["especialidade_id"]
    _commit_session()
    return medico
    

def delete_medico(medico_id: int) -> None:
    medico = get_medico_by_id(medico_id)
    db.session.delete(medico)
    _commit_session()

def _commit_session():
    try:
        db.session.commit()
    except SQLAlchemyError:
        db.session.rollback()
        raise
