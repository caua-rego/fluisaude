from flask import Blueprint, request, jsonify
from app.models.especialidade import Especialidade
from app import db

especialidades_bp = Blueprint('especialidades_bp', __name__)

@especialidades_bp.route('/especialidades', methods=['POST'])
def create_especialidade():
    data = request.get_json()
    nova_especialidade = Especialidade(nome=data['nome'])
    db.session.add(nova_especialidade)
    db.session.commit()
    return jsonify(nova_especialidade.to_json()), 201

@especialidades_bp.route('/especialidades', methods=['GET'])
def get_especialidades():
    especialidades = Especialidade.query.all()
    return jsonify([especialidade.to_json() for especialidade in especialidades])

@especialidades_bp.route('/especialidades/<int:id>', methods=['GET'])
def get_especialidade(id):
    especialidade = Especialidade.query.get_or_404(id)
    return jsonify(especialidade.to_json())

@especialidades_bp.route('/especialidades/<int:id>', methods=['PUT'])
def update_especialidade(id):
    data = request.get_json()
    especialidade = Especialidade.query.get_or_404(id)
    especialidade.nome = data['nome']
    db.session.commit()
    return jsonify(especialidade.to_json())

@especialidades_bp.route('/especialidades/<int:id>', methods=['DELETE'])
def delete_especialidade(id):
    especialidade = Especialidade.query.get_or_404(id)
    db.session.delete(especialidade)
    db.session.commit()
    return jsonify({'message': 'Especialidade deletada com sucesso'})
