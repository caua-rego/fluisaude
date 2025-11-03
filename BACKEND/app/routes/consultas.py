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
        
@consultas_bp.route('/', methods=['GET'])
def listar_consultas():
    db = SessionLocal()
    try:
        consultas = db.query(Consulta).all()
        resultado = []
        for consulta in consultas:
            resultado.append({
                "id": consulta.id,
                "paciente_nome": consulta.paciente_nome,
                "medico_nome": consulta.medico_nome,
                "especialidade": consulta.especialidade,
                "horario": consulta.horario
            })
        return jsonify(resultado), 200
    finally:
        db.close()
    
@consultas_bp.route('/<int:consulta_id>', methods=['PATCH'])
def atualizar_consulta(consulta_id):
    data = request.get_json()
    db = SessionLocal()
    try:
        consulta = db.query(Consulta).filter(Consulta.id == consulta_id).first()
        if not consulta:
            return jsonify({"error": "Consulta não encontrada"}), 404
        
        if 'paciente_nome' in data:
            consulta.paciente_nome = data['paciente_nome']
        if 'medico_nome' in data:
            consulta.medico_nome = data['medico_nome']
        if 'especialidade' in data:
            consulta.especialidade = data['especialidade']
        if 'horario' in data:
            consulta.horario = data['horario']
        
        db.commit()
        db.refresh(consulta)
        return jsonify({
            "id": consulta.id,
            "paciente_nome": consulta.paciente_nome,
            "medico_nome": consulta.medico_nome,
            "especialidade": consulta.especialidade,
            "horario": consulta.horario
        }), 200
    finally:
      db.close()
      
@consultas_bp.route('/<int:consulta_id>', methods=['DELETE'])
def deletar_consulta(consulta_id):
    db = SessionLocal()
    try:
        consulta = db.query(Consulta).filter(Consulta.id == consulta_id).first()
        if not consulta:
            return jsonify({"error": "Consulta não encontrada"}), 404

        db.delete(consulta)
        db.commit()
        return jsonify({"message": "Consulta deletada com sucesso"}), 200
    finally:
        db.close()       