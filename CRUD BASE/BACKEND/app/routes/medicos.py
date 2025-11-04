from flask import Blueprint, jsonify, request

from app.controllers.medico_controller import (
    create_medico as create_medico_use_case,
    delete_medico as delete_medico_use_case,
    get_medico_by_id,
    list_medicos,
    update_medico as update_medico_use_case,
)

medicos_bp = Blueprint('medicos_bp', __name__)


@medicos_bp.route('/medicos', methods=['POST'])
def create_medico():
    try:
        medico = create_medico_use_case(request.get_json() or {})
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400
    return jsonify(medico.to_json()), 201


@medicos_bp.route('/medicos', methods=['GET'])
def get_medicos():
    medicos = list_medicos()
    return jsonify([medico.to_json() for medico in medicos])


@medicos_bp.route('/medicos/<int:id>', methods=['GET'])
def get_medico(id: int):
    medico = get_medico_by_id(id)
    return jsonify(medico.to_json())


@medicos_bp.route('/medicos/<int:id>', methods=['PUT'])
def update_medico(id: int):
    try:
        medico = update_medico_use_case(id, request.get_json() or {})
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400
    return jsonify(medico.to_json())


@medicos_bp.route('/medicos/<int:id>', methods=['DELETE'])
def delete_medico(id: int):
    delete_medico_use_case(id)
    return jsonify({'message': 'Medico deletado com sucesso'})
