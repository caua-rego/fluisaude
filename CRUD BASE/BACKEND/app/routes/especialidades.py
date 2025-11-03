from flask import Blueprint, jsonify, request

from app.controllers.especialidade_controller import (
    create_especialidade as create_especialidade_use_case,
    delete_especialidade as delete_especialidade_use_case,
    get_especialidade_by_id,
    list_especialidades,
    update_especialidade as update_especialidade_use_case,
)

especialidades_bp = Blueprint('especialidades_bp', __name__)


@especialidades_bp.route('/especialidades', methods=['POST'])
def create_especialidade():
    """
    Cria uma especialidade.
    ---
    tags:
      - Especialidades
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required:
            - nome
          properties:
            nome:
              type: string
    responses:
      201:
        description: Especialidade criada
      400:
        description: Erro de validacao
    """
    try:
        especialidade = create_especialidade_use_case(request.get_json() or {})
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400
    return jsonify(especialidade.to_json()), 201


@especialidades_bp.route('/especialidades', methods=['GET'])
def get_especialidades():
    """
    Lista todas as especialidades.
    ---
    tags:
      - Especialidades
    responses:
      200:
        description: Lista de especialidades
    """
    especialidades = list_especialidades()
    return jsonify([especialidade.to_json() for especialidade in especialidades])


@especialidades_bp.route('/especialidades/<int:id>', methods=['GET'])
def get_especialidade(id: int):
    """
    Busca uma especialidade pelo ID.
    ---
    tags:
      - Especialidades
    parameters:
      - in: path
        name: id
        type: integer
        required: true
    responses:
      200:
        description: Especialidade retornada
    """
    especialidade = get_especialidade_by_id(id)
    return jsonify(especialidade.to_json())


@especialidades_bp.route('/especialidades/<int:id>', methods=['PUT'])
def update_especialidade(id: int):
    """
    Atualiza uma especialidade existente.
    ---
    tags:
      - Especialidades
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
            nome:
              type: string
    responses:
      200:
        description: Especialidade atualizada
      400:
        description: Erro de validacao
    """
    try:
        especialidade = update_especialidade_use_case(id, request.get_json() or {})
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400
    return jsonify(especialidade.to_json())


@especialidades_bp.route('/especialidades/<int:id>', methods=['DELETE'])
def delete_especialidade(id: int):
    """
    Remove uma especialidade.
    ---
    tags:
      - Especialidades
    parameters:
      - in: path
        name: id
        type: integer
        required: true
    responses:
      200:
        description: Especialidade removida
    """
    delete_especialidade_use_case(id)
    return jsonify({'message': 'Especialidade deletada com sucesso'})
