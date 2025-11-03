from flask import Blueprint, request, jsonify
from app.models.consulta import Consulta
from app import db
from datetime import datetime

consultas_bp = Blueprint('consultas_bp', __name__)


def parse_datetime(value):
    """Try to parse a datetime value coming from the client.
    Accepts ISO 8601 strings (with or without seconds) and returns a datetime.
    Raises ValueError if parsing fails.
    """
    if isinstance(value, datetime):
        return value
    if not value:
        raise ValueError('data_agendamento is required')
    # Some browsers/inputs send 'YYYY-MM-DDTHH:MM' (no seconds) which fromisoformat accepts
    try:
        return datetime.fromisoformat(value)
    except Exception:
        # Try a common alternative format
        try:
            return datetime.strptime(value, '%Y-%m-%dT%H:%M')
        except Exception:
            raise ValueError('Formato de data inválido')


@consultas_bp.route('/consultas', methods=['POST'])
def create_consulta():
    data = request.get_json() or {}
    try:
        paciente_id = int(data.get('paciente_id'))
        medico_id = int(data.get('medico_id'))
        data_agendamento = parse_datetime(data.get('data_agendamento'))
    except (TypeError, ValueError) as e:
        return jsonify({'error': str(e)}), 400

    nova_consulta = Consulta(
        paciente_id=paciente_id,
        medico_id=medico_id,
        data_agendamento=data_agendamento
    )
    db.session.add(nova_consulta)
    db.session.commit()
    return jsonify(nova_consulta.to_json()), 201


@consultas_bp.route('/consultas', methods=['GET'])
def get_consultas():
    consultas = Consulta.query.all()
    return jsonify([consulta.to_json() for consulta in consultas])


@consultas_bp.route('/consultas/<int:id>', methods=['GET'])
def get_consulta(id):
    consulta = Consulta.query.get_or_404(id)
    return jsonify(consulta.to_json())


@consultas_bp.route('/consultas/<int:id>', methods=['PUT'])
def update_consulta(id):
    data = request.get_json() or {}
    consulta = Consulta.query.get_or_404(id)
    try:
        consulta.paciente_id = int(data.get('paciente_id', consulta.paciente_id))
        consulta.medico_id = int(data.get('medico_id', consulta.medico_id))
        if 'data_agendamento' in data and data.get('data_agendamento'):
            consulta.data_agendamento = parse_datetime(data.get('data_agendamento'))
        consulta.status = data.get('status', consulta.status)
    except (TypeError, ValueError) as e:
        return jsonify({'error': str(e)}), 400

    db.session.commit()
    return jsonify(consulta.to_json())


@consultas_bp.route('/consultas/<int:id>', methods=['DELETE'])
def delete_consulta(id):
    consulta = Consulta.query.get_or_404(id)
    db.session.delete(consulta)
    db.session.commit()
    return jsonify({'message': 'Consulta deletada com sucesso'})
