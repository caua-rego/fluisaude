from flask import Blueprint, jsonify, request

from app.controllers.especialidades_controller import (
    create_especialidade,
    delete_especialidade,
    get_all_especialidades,
    get_especialidade_by_id,
    update_especialidade,
)

especialidades_bp = Blueprint("especialidades", __name__)


@especialidades_bp.route("/", methods=["POST"])
def create():
    """Cria uma nova especialidade."""
    try:
        especialidade = create_especialidade(request.get_json() or {})
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    return jsonify(especialidade.to_json()), 201


@especialidades_bp.route("/", methods=["GET"])
def list_all():
    """Lista todas as especialidades."""
    especialidades = get_all_especialidades()
    return jsonify([especialidade.to_json() for especialidade in especialidades])


@especialidades_bp.route("/<int:especialidade_id>", methods=["GET"])
def get_by_id(especialidade_id: int):
    """Obtém uma especialidade pelo ID."""
    especialidade = get_especialidade_by_id(especialidade_id)
    if not especialidade:
        return jsonify({"error": "Especialidade não encontrada"}), 404
    return jsonify(especialidade.to_json())


@especialidades_bp.route("/<int:especialidade_id>", methods=["PUT"])
def update(especialidade_id: int):
    """Atualiza uma especialidade."""
    try:
        especialidade = update_especialidade(especialidade_id, request.get_json() or {})
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    if not especialidade:
        return jsonify({"error": "Especialidade não encontrada"}), 404
    return jsonify(especialidade.to_json())


@especialidades_bp.route("/<int:especialidade_id>", methods=["DELETE"])
def delete(especialidade_id: int):
    """Deleta uma especialidade."""
    try:
        delete_especialidade(especialidade_id)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    return "", 204
