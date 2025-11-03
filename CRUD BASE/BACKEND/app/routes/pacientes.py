from flask import Blueprint, request, jsonify
from app.models.paciente import Paciente
from app import db

pacientes_bp = Blueprint('pacientes_bp', __name__)

@pacientes_bp.route('/pacientes', methods=['POST'])
def create_paciente():
    data = request.get_json()
    novo_paciente = Paciente(
        nome=data['nome'],
        cpf=data['cpf'],
        telefone=data.get('telefone')
    )
    db.session.add(novo_paciente)
    db.session.commit()
    return jsonify(novo_paciente.to_json()), 201

@pacientes_bp.route('/pacientes', methods=['GET'])
def get_pacientes():
    # Support optional query parameters: ?cpf=... to filter by CPF, ?q=... to search by nome or cpf
    cpf = request.args.get('cpf')
    q = request.args.get('q')
    if cpf:
        paciente = Paciente.query.filter_by(cpf=cpf).first()
        return jsonify(paciente.to_json() if paciente else {} )
    if q:
        pacientes = Paciente.query.filter((Paciente.nome.contains(q)) | (Paciente.cpf.contains(q))).all()
        return jsonify([paciente.to_json() for paciente in pacientes])

    pacientes = Paciente.query.all()
    return jsonify([paciente.to_json() for paciente in pacientes])

@pacientes_bp.route('/pacientes/<int:id>', methods=['GET'])
def get_paciente(id):
    paciente = Paciente.query.get_or_404(id)
    return jsonify(paciente.to_json())

@pacientes_bp.route('/pacientes/<int:id>', methods=['PUT'])
def update_paciente(id):
    data = request.get_json()
    paciente = Paciente.query.get_or_404(id)
    paciente.nome = data['nome']
    paciente.cpf = data['cpf']
    paciente.telefone = data.get('telefone')
    db.session.commit()
    return jsonify(paciente.to_json())

@pacientes_bp.route('/pacientes/<int:id>', methods=['DELETE'])
def delete_paciente(id):
    paciente = Paciente.query.get_or_404(id)
    db.session.delete(paciente)
    db.session.commit()
    return jsonify({'message': 'Paciente deletado com sucesso'})
