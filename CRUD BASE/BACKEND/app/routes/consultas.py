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
    """
    Cria uma consulta medica.
    ---
    tags:
      - Consultas
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required:
            - paciente_id
            - medico_id
            - data_agendamento
          properties:
            paciente_id:
              type: integer
            medico_id:
              type: integer
            data_agendamento:
              type: string
              format: date-time
            status:
              type: string
    responses:
      201:
        description: Consulta criada
      400:
        description: Erro de validacao
    """
    try:
        consulta = create_consulta_use_case(request.get_json() or {})
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400
    return jsonify(consulta.to_json()), 201


@consultas_bp.route('/consultas', methods=['GET'])
def get_consultas():
    """
    Lista todas as consultas.
    ---
    tags:
      - Consultas
    responses:
      200:
        description: Lista de consultas
    """
    consultas = list_consultas()
    return jsonify([consulta.to_json() for consulta in consultas])


@consultas_bp.route('/consultas/<int:id>', methods=['GET'])
def get_consulta(id: int):
    """
    Busca uma consulta pelo ID.
    ---
    tags:
      - Consultas
    parameters:
      - in: path
        name: id
        type: integer
        required: true
    responses:
      200:
        description: Consulta retornada
    """
    consulta = get_consulta_by_id(id)
    return jsonify(consulta.to_json())


@consultas_bp.route('/consultas/<int:id>', methods=['PUT'])
def update_consulta(id: int):
    """
    Atualiza os dados de uma consulta.
    ---
    tags:
      - Consultas
    parameters:
      - in: path
        name: id
        type: integer
        required: true
      - in: body
        name: body
        schema:
          type: object
          properties:
            paciente_id:
              type: integer
            medico_id:
              type: integer
            data_agendamento:
              type: string
              format: date-time
            status:
              type: string
    responses:
      200:
        description: Consulta atualizada
      400:
        description: Erro de validacao
    """
    try:
        consulta = update_consulta_use_case(id, request.get_json() or {})
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400
    return jsonify(consulta.to_json())


@consultas_bp.route('/consultas/<int:id>', methods=['DELETE'])
def delete_consulta(id: int):
    """
    Remove uma consulta.
    ---
    tags:
      - Consultas
    parameters:
      - in: path
        name: id
        type: integer
        required: true
    responses:
      200:
        description: Consulta removida
    """
    delete_consulta_use_case(id)
    return jsonify({'message': 'Consulta deletada com sucesso'})
