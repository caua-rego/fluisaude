from flask import Blueprint, request, jsonify
from app.models.consulta import Consulta
from app import db

consultas_bp = Blueprint('consultas_bp', __name__)

@consultas_bp.route('/consultas', methods=['POST'])
def create_consulta():
    data = request.get_json()
    nova_consulta = Consulta(
        paciente_id=data['paciente_id'],
        medico_id=data['medico_id'],
        data_agendamento=data['data_agendamento']
    )
    db.session.add(nova_consulta)
    db.session.commit()
    return jsonify(nova_consulta.to_json()), 201

@consultas_bp.route('/consultas', methods=['GET'])
def get_consultas():
    consultas = Consulta.query.all()
    return jsonify([consulta.to_json() for consulta in consultas])

@consultas_bp.route('/consultas/<int:id>', methods=['GET'])
def get_consulta(id):
    consulta = Consulta.query.get_or_404(id)
    return jsonify(consulta.to_json())

@consultas_bp.route('/consultas/<int:id>', methods=['PUT'])
def update_consulta(id):
    data = request.get_json()
    consulta = Consulta.query.get_or_404(id)
    consulta.paciente_id = data['paciente_id']
    consulta.medico_id = data['medico_id']
    consulta.data_agendamento = data['data_agendamento']
    consulta.status = data.get('status', consulta.status)
    db.session.commit()
    return jsonify(consulta.to_json())

@consultas_bp.route('/consultas/<int:id>', methods=['DELETE'])
def delete_consulta(id):
    consulta = Consulta.query.get_or_404(id)
    db.session.delete(consulta)
    db.session.commit()
    return jsonify({'message': 'Consulta deletada com sucesso'})
