from flask import Blueprint, request, jsonify
from ..controllers.consulta_controller import ConsultaController # type: ignore

consulta_bp = Blueprint("consultas", __name__)

@consulta_bp.route("/", methods=["GET"])
def listar_consultas():
    return jsonify(ConsultaController.listar())

@consulta_bp.route("/", methods=["POST"])
def criar_consulta():
    data = request.get_json()
    consulta = ConsultaController.criar(data)
    return jsonify(consulta), 201

@consulta_bp.route("/<int:id>", methods=["PUT"])
def atualizar_consulta(id):
    data = request.get_json()
    consulta = ConsultaController.atualizar(id, data)
    if not consulta:
        return jsonify({"error": "Consulta não encontrada"}), 404
    return jsonify(consulta)

@consulta_bp.route("/<int:id>", methods=["DELETE"])
def deletar_consulta(id):
    sucesso = ConsultaController.deletar(id)
    if not sucesso:
        return jsonify({"error": "Consulta não encontrada"}), 404
    return jsonify({"message": "Consulta excluída com sucesso"})