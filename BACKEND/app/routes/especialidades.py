from flask import Blueprint, jsonify, request

from app.controllers.especialidades_controller import (
    create_especialidade as create_especialidade_use_case,
    delete_especialidade as delete_especialidade_use_case,
    get_especialidade_by_id,
    list_especialidades,
    update_especialidade as update_especialidade_use_case,
)
especialidades_bp = Blueprint("especialidades", __name__)


@especialidades_bp.route('/especialidades',methods=['POST'])
def create_especialidade():
    try:
        especialidade = create_especialidade_use_case(request.get_json() or {})
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400
    return jsonify(especialidade.to_json()), 201 

@especialidades_bp.route('/especialidades', methods=['GET'])
def get_especialidades():
    especialidades = list_especialidades()
    return jsonify([especialidade.to_json() for especialidade in especialidades]), 200

@especialidades_bp.route('/especialidades/<int:id>', methods=['GET'])
def get_especialidade(id: int):
    especialidade = get_especialidade_by_id(id)
    return jsonify(especialidade.to_json())

@especialidades_bp.route('/especialidades/<int:id>', methods=['PUT'])
def update_especialidade(id: int):
    try:
        especialidade = update_especialidade_use_case(id, request.get_json() or {})
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400
    return jsonify(especialidade.to_json())

@especialidades_bp.route('/especialidades/<int:id>', methods=['DELETE'])
def delete_especialidade(id: int):
    delete_especialidade_use_case(id)
    return jsonify({'message': 'Especialidade deletada com sucesso.'})

