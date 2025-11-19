from flask import Blueprint, jsonify, request

from app.controllers import pacientes_controller

pacientes_bp = Blueprint("pacientes", __name__)


@pacientes_bp.route("/", methods=["GET"])
def get_pacientes():
    cpf = request.args.get("cpf")
    term = request.args.get("q")

    if cpf:
        paciente = pacientes_controller.get_paciente_by_cpf(cpf)
        if paciente:
            return jsonify(paciente.to_json())
        return jsonify({}), 404

    if term:
        pacientes = pacientes_controller.search_pacientes(term)
        return jsonify([paciente.to_json() for paciente in pacientes])

    pacientes = pacientes_controller.get_all_pacientes()
    return jsonify([paciente.to_json() for paciente in pacientes])


@pacientes_bp.route("/<int:paciente_id>", methods=["GET"])
def get_paciente(paciente_id: int):
    paciente = pacientes_controller.get_paciente_by_id(paciente_id)
    return jsonify(paciente.to_json()), 200


@pacientes_bp.route("/", methods=["POST"])
def create_paciente():
    data = request.get_json() or {}
    try:
        paciente = pacientes_controller.create_paciente(data)
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    return jsonify(paciente.to_json()), 201


@pacientes_bp.route("/<int:paciente_id>", methods=["PUT"])
def update_paciente(paciente_id: int):
    data = request.get_json() or {}
    paciente = pacientes_controller.update_paciente(paciente_id, data)
    return jsonify(paciente.to_json())


@pacientes_bp.route("/<int:paciente_id>", methods=["DELETE"])
def delete_paciente(paciente_id: int):
    pacientes_controller.delete_paciente(paciente_id)
    return "", 204
