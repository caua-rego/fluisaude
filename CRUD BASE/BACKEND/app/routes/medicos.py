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
    """
  Cria um medico.
    ---
    tags:
  - Medicos
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required:
            - nome
            - crm
            - especialidade_id
          properties:
            nome:
              type: string
            crm:
              type: string
            especialidade_id:
              type: integer
    responses:
      201:
  description: Medico criado
      400:
        description: Erro de validação
    """
    try:
        medico = create_medico_use_case(request.get_json() or {})
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400
    return jsonify(medico.to_json()), 201


@medicos_bp.route('/medicos', methods=['GET'])
def get_medicos():
    """
  Lista todos os medicos.
    ---
    tags:
  - Medicos
    responses:
      200:
  description: Lista de medicos
    """
    medicos = list_medicos()
    return jsonify([medico.to_json() for medico in medicos])


@medicos_bp.route('/medicos/<int:id>', methods=['GET'])
def get_medico(id: int):
    """
  Obtem um medico por ID.
    ---
    tags:
  - Medicos
    parameters:
      - in: path
        name: id
        type: integer
        required: true
    responses:
      200:
  description: Medico retornado
    """
    medico = get_medico_by_id(id)
    return jsonify(medico.to_json())


@medicos_bp.route('/medicos/<int:id>', methods=['PUT'])
def update_medico(id: int):
    """
  Atualiza um medico existente.
    ---
    tags:
  - Medicos
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
            crm:
              type: string
            especialidade_id:
              type: integer
    responses:
      200:
  description: Medico atualizado
      400:
        description: Erro de validação
    """
    try:
        medico = update_medico_use_case(id, request.get_json() or {})
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400
    return jsonify(medico.to_json())


@medicos_bp.route('/medicos/<int:id>', methods=['DELETE'])
def delete_medico(id: int):
    """
  Remove um medico.
    ---
    tags:
  - Medicos
    parameters:
      - in: path
        name: id
        type: integer
        required: true
    responses:
      200:
  description: Medico removido
    """
    delete_medico_use_case(id)
    return jsonify({'message': 'Medico deletado com sucesso'})
