from flask import Blueprint, request, jsonify
from app.models.medico import Medico
from app import db

medicos_bp = Blueprint('medicos_bp', __name__)

@medicos_bp.route('/medicos', methods=['POST'])
def create_medico():
    data = request.get_json()
    novo_medico = Medico(
        nome=data['nome'],
        crm=data['crm'],
        especialidade_id=data['especialidade_id']
    )
    db.session.add(novo_medico)
    db.session.commit()
    return jsonify(novo_medico.to_json()), 201

@medicos_bp.route('/medicos', methods=['GET'])
def get_medicos():
    medicos = Medico.query.all()
    return jsonify([medico.to_json() for medico in medicos])

@medicos_bp.route('/medicos/<int:id>', methods=['GET'])
def get_medico(id):
    medico = Medico.query.get_or_404(id)
    return jsonify(medico.to_json())

@medicos_bp.route('/medicos/<int:id>', methods=['PUT'])
def update_medico(id):
    data = request.get_json()
    medico = Medico.query.get_or_404(id)
    medico.nome = data['nome']
    medico.crm = data['crm']
    medico.especialidade_id = data['especialidade_id']
    db.session.commit()
    return jsonify(medico.to_json())

@medicos_bp.route('/medicos/<int:id>', methods=['DELETE'])
def delete_medico(id):
    medico = Medico.query.get_or_404(id)
    db.session.delete(medico)
    db.session.commit()
    return jsonify({'message': 'Medico deletado com sucesso'})
