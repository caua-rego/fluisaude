from flask import Blueprint, jsonify, request

from app.controllers.consulta_controller import (
    create_consulta as create_consulta_use_case,
    delete_consulta as delete_consulta_use_case,
    get_consulta_by_id,
    list_consultas,
    update_consulta as update_consulta_use_case,
)

consultas_bp = Blueprint('consultas_bp', __name__)


@consultas_bp.route('/consultas', methods=['POST'])
def create_consulta():
    try:
        consulta = create_consulta_use_case(request.get_json() or {})
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400
    return jsonify(consulta.to_json()), 201


@consultas_bp.route('/consultas', methods=['GET'])
def get_consultas():
    consultas = list_consultas()
    return jsonify([consulta.to_json() for consulta in consultas])


@consultas_bp.route('/consultas/<int:id>', methods=['GET'])
def get_consulta(id: int):
    consulta = get_consulta_by_id(id)
    return jsonify(consulta.to_json())


@consultas_bp.route('/consultas/<int:id>', methods=['PUT'])
def update_consulta(id: int):
    try:
        consulta = update_consulta_use_case(id, request.get_json() or {})
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400
    return jsonify(consulta.to_json())


@consultas_bp.route('/consultas/<int:id>', methods=['DELETE'])
def delete_consulta(id: int):
    delete_consulta_use_case(id)
    return jsonify({'message': 'Consulta deletada com sucesso'})
