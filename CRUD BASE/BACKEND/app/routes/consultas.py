from datetime import datetime

from flask import Blueprint, request, jsonify
from app import db
from app.models.consulta import Consulta

consultas_bp = Blueprint('consultas_bp', __name__, url_prefix='/consultas')


def parse_datetime(datetime_value: str) -> datetime:
    if isinstance(datetime_value, datetime):
        return datetime_value

    if not datetime_value:
        raise ValueError('Data e hora do agendamento são obrigatórias')

    try:
        return datetime.fromisoformat(datetime_value)
    except ValueError:
        try:
            return datetime.strptime(datetime_value, '%Y-%m-%dT%H:%M')
        except ValueError:
            raise ValueError('Formato de data inválido. Use ISO 8601 (YYYY-MM-DDTHH:MM:SS)')


@consultas_bp.route('/', methods=['POST'])
def criar_consulta():
    dados_request = request.get_json()

    if not dados_request:
        return jsonify({'erro': 'Dados da consulta são obrigatórios'}), 400

    campos_obrigatorios = ['paciente_id', 'medico_id', 'data_agendamento']
    campos_faltantes = [campo for campo in campos_obrigatorios if not dados_request.get(campo)]

    if campos_faltantes:
        return jsonify({
            'erro': 'Campos obrigatórios faltando',
            'campos': campos_faltantes
        }), 400

    try:
        paciente_id = int(dados_request['paciente_id'])
        medico_id = int(dados_request['medico_id'])
        data_agendamento = parse_datetime(dados_request['data_agendamento'])

        if paciente_id <= 0 or medico_id <= 0:
            return jsonify({'erro': 'IDs de paciente e médico devem ser números positivos'}), 400

        if data_agendamento <= datetime.now():
            return jsonify({'erro': 'Data do agendamento deve ser no futuro'}), 400

    except (TypeError, ValueError) as erro:
        return jsonify({'erro': str(erro)}), 400

    nova_consulta = Consulta(
        paciente_id=paciente_id,
        medico_id=medico_id,
        data_agendamento=data_agendamento,
        status=dados_request.get('status', 'agendada')
    )

    try:
        db.session.add(nova_consulta)
        db.session.commit()
    except Exception as erro_bd:
        db.session.rollback()
        return jsonify({'erro': 'Erro ao criar consulta no banco de dados'}), 500

    return jsonify(nova_consulta.to_json()), 201


@consultas_bp.route('/', methods=['GET'])
def listar_consultas():
    try:
        todas_consultas = Consulta.query.all()
        return jsonify([consulta.to_json() for consulta in todas_consultas])
    except Exception:
        return jsonify({'erro': 'Erro ao buscar consultas no banco de dados'}), 500


@consultas_bp.route('/<int:consulta_id>', methods=['GET'])
def obter_consulta(consulta_id):
    try:
        consulta = Consulta.query.get_or_404(consulta_id)
        return jsonify(consulta.to_json())
    except Exception:
        return jsonify({'erro': 'Erro ao buscar consulta no banco de dados'}), 500


@consultas_bp.route('/<int:consulta_id>', methods=['PUT'])
def atualizar_consulta(consulta_id):
    dados_request = request.get_json() or {}

    try:
        consulta = Consulta.query.get_or_404(consulta_id)
    except Exception:
        return jsonify({'erro': 'Consulta não encontrada'}), 404

    try:
        if 'paciente_id' in dados_request:
            paciente_id = int(dados_request['paciente_id'])
            if paciente_id <= 0:
                return jsonify({'erro': 'ID do paciente deve ser um número positivo'}), 400
            consulta.paciente_id = paciente_id

        if 'medico_id' in dados_request:
            medico_id = int(dados_request['medico_id'])
            if medico_id <= 0:
                return jsonify({'erro': 'ID do médico deve ser um número positivo'}), 400
            consulta.medico_id = medico_id

        if 'data_agendamento' in dados_request and dados_request['data_agendamento']:
            data_agendamento = parse_datetime(dados_request['data_agendamento'])
            if data_agendamento <= datetime.now():
                return jsonify({'erro': 'Data do agendamento deve ser no futuro'}), 400
            consulta.data_agendamento = data_agendamento

        if 'status' in dados_request:
            consulta.status = dados_request['status']

    except (TypeError, ValueError) as erro:
        return jsonify({'erro': str(erro)}), 400

    try:
        db.session.commit()
        return jsonify(consulta.to_json())
    except Exception:
        db.session.rollback()
        return jsonify({'erro': 'Erro ao atualizar consulta no banco de dados'}), 500


@consultas_bp.route('/<int:consulta_id>', methods=['DELETE'])
def deletar_consulta(consulta_id):
    consulta = Consulta.query.get_or_404(consulta_id)
    db.session.delete(consulta)
    db.session.commit()
    return jsonify({'mensagem': 'Consulta removida com sucesso'})
