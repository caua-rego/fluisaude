from flask import Blueprint, jsonify, request

from app.controllers import medicos_controller

medicos_bp = Blueprint("medicos", __name__)


@medicos_bp.route("/medicos", methods=["Post"])
def create_medico():
    try:
        medico = medicos_controller.create_medico(request.get_json() or {})
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    return jsonify(medico.to_dict()), 201


@medicos_bp.route("/medicos", methods=["Get"])
def list_medicos():
    medicos = medicos_controller.list_medicos()
    return jsonify([medico.to_dict() for medico in medicos])


@medicos_bp.route("/medicos/<int:medico_id>", methods=["Get"])
def get_medico(medico_id: int):
    medico = medicos_controller.get_medico_by_id(medico_id)
    return jsonify(medico.to_dict()), 201

@medicos_bp.route("/medicos/<int:medico_id>", methods=["Put"])
def update_medico(medico_id: int):
    try:
        medico = medicos_controller.update_medico(medico_id, request.get_json() or {})
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    return jsonify(medico.to_dict()) 

@medicos_bp.route("/medicos/<int:medico_id>", methods=["Delete"])
def delete_medico(medico_id: int):
    medicos_controller.delete_medico(medico_id)
    return jsonify({"message": "Medico deletado com sucesso"})