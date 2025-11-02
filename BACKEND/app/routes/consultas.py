from flask import Blueprint, request, jsonify
from database.connection import SessionLocal
from app.models.consulta import Consulta

consultas_bp = Blueprint('consultas', __name__)

@consultas_bp.route('/', methods=['POST'])
def criar_consulta():
    data = request.get_json()
    db = SessionLocal()
    try:
        consulta = Consulta(
            paciente_nome=data['paciente_nome'],
            medico_nome=data['medico_nome'],
            especialidade=data['especialidade'],
            horario=data['horario']
        )
        db.add(consulta)
        db.commit()
        db.refresh(consulta)
        return jsonify({
            "id": consulta.id,
            "paciente_nome": consulta.paciente_nome,
            "medico_nome": consulta.medico_nome,
            "especialidade": consulta.especialidade,
            "horario": consulta.horario
        }), 201
    finally:
        db.close()