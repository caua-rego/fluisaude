from flask import Blueprint, jsonify, request

from app.controllers.paciente_controller import (
    create_paciente as create_paciente_use_case,
    delete_paciente as delete_paciente_use_case,
    get_paciente_by_cpf,
    get_paciente_by_id,
    list_pacientes as list_pacientes_use_case,
    search_pacientes,
    update_paciente as update_paciente_use_case,
)

pacientes_bp = Blueprint('pacientes_bp', __name__)


@pacientes_bp.route('/pacientes', methods=['POST'])
def create_paciente():
    """
    Cria um paciente.
    ---
    tags:
      - Pacientes
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required:
            - nome
            - cpf
          properties:
            nome:
              type: string
            cpf:
              type: string
            telefone:
              type: string
    responses:
      201:
        description: Paciente criado com sucesso
      400:
        description: Erro de validacao
    """
    try:
        paciente = create_paciente_use_case(request.get_json() or {})
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400
    return jsonify(paciente.to_json()), 201


@pacientes_bp.route('/pacientes', methods=['GET'])
def get_pacientes():
    """
    Lista pacientes com filtros opcionais.
    ---
    tags:
      - Pacientes
    parameters:
      - in: query
        name: cpf
        type: string
        required: false
  description: Filtra por um CPF especifico.
      - in: query
        name: q
        type: string
        required: false
        description: Termo para busca por nome ou CPF.
    responses:
      200:
        description: Lista de pacientes
    """
    cpf = request.args.get('cpf')
    search_term = request.args.get('q')

    if cpf:
        paciente = get_paciente_by_cpf(cpf)
        return jsonify(paciente.to_json() if paciente else {})

    if search_term:
        pacientes = search_pacientes(search_term)
        return jsonify([paciente.to_json() for paciente in pacientes])

    pacientes = list_pacientes_use_case()
    return jsonify([paciente.to_json() for paciente in pacientes])


@pacientes_bp.route('/pacientes/<int:id>', methods=['GET'])
def get_paciente(id: int):
    """
  Obtem paciente pelo ID.
    ---
    tags:
      - Pacientes
    parameters:
      - in: path
        name: id
        type: integer
        required: true
        description: Identificador do paciente.
    responses:
      200:
  description: Paciente retornado com sucesso
    """
    paciente = get_paciente_by_id(id)
    return jsonify(paciente.to_json())


@pacientes_bp.route('/pacientes/<int:id>', methods=['PUT'])
def update_paciente(id: int):
    """
  Atualiza dados de um paciente.
    ---
    tags:
      - Pacientes
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
            cpf:
              type: string
            telefone:
              type: string
    responses:
      200:
        description: Paciente atualizado
      400:
        description: Erro de validacao
    """
    try:
        paciente = update_paciente_use_case(id, request.get_json() or {})
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400
    return jsonify(paciente.to_json())


@pacientes_bp.route('/pacientes/<int:id>', methods=['DELETE'])
def delete_paciente(id: int):
    """
    Remove um paciente.
    ---
    tags:
      - Pacientes
    parameters:
      - in: path
        name: id
        type: integer
        required: true
    responses:
      200:
        description: Paciente removido
    """
    delete_paciente_use_case(id)
    return jsonify({'message': 'Paciente deletado com sucesso'})
