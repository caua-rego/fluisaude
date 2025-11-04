from flask import Blueprint, jsonify, request

from app.controllers import especialidades_controller

especialidades_bp = Blueprint("especialidades", __name__)


@especialidades_bp.route("/especialidades", methods=["POST"])
def create_especialidade():
    try:
        especialidade = especialidades_controller.create_especialidade(request.get_json() or {})
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    return jsonify(especialidade.to_dict()), 201


@especialidades_bp.route("/especialidades", methods=["GET"])
def list_especialidades():
    especialidades = especialidades_controller.list_especialidades()
    return jsonify([item.to_dict() for item in especialidades])


@especialidades_bp.route("/especialidades/<int:especialidade_id>", methods=["GET"])
def get_especialidade(especialidade_id: int):
    especialidade = especialidades_controller.get_especialidade_by_id(especialidade_id)
    return jsonify(especialidade.to_dict())


@especialidades_bp.route("/especialidades/<int:especialidade_id>", methods=["PUT"])
def update_especialidade(especialidade_id: int):
    try:
        especialidade = especialidades_controller.update_especialidade(especialidade_id, request.get_json() or {})
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    return jsonify(especialidade.to_dict())


@especialidades_bp.route("/especialidades/<int:especialidade_id>", methods=["DELETE"])
def delete_especialidade(especialidade_id: int):
    especialidades_controller.delete_especialidade(especialidade_id)
    return jsonify({"message": "Especialidade deletada com sucesso"})
