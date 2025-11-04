from flask import Blueprint, request, jsonify

from app.controllers import pacientes_controller

pacientes_bp = Blueprint("pacientes", __name__)

@pacientes_bp.route("/pacientes", methods=['GET'])
def get_pacientes():
    pacientes = pacientes_controller.get_all_pacientes()
    return jsonify([paciente.to_json() for paciente in pacientes])

@pacientes_bp.route("/pacientes/<int:paciente_id>", methods=['GET'])
def get_paciente(paciente_id):
    paciente = pacientes_controller.get_paciente_by_id(paciente_id)
    return jsonify(paciente.to_json())

@pacientes_bp.route("/pacientes", methods=['POST'])
def create_paciente():
    data = request.get_json()
    try:
        paciente = pacientes_controller.create_paciente(data)
        return jsonify(paciente.to_json()), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@pacientes_bp.route("/pacientes/<int:paciente_id>", methods=['PUT'])
def update_paciente(paciente_id):
    data = request.get_json()
    paciente = pacientes_controller.update_paciente(paciente_id, data)
    return jsonify(paciente.to_json())

@pacientes_bp.route("/pacientes/<int:paciente_id>", methods=['DELETE'])
def delete_paciente(paciente_id):
    pacientes_controller.delete_paciente(paciente_id)
    return '', 204
