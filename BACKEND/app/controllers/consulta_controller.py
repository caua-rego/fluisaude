from ..models.consulta import Consulta
from .. import db # type: ignore
from datetime import datetime

class ConsultaController:
    @staticmethod
    def listar():
        consultas = Consulta.query.all()
        return [c.to_dict() for c in consultas]

    @staticmethod
    def criar(data):
        if 'data_agendamento' in data and isinstance(data['data_agendamento'], str):
            data['data_agendamento'] = datetime.fromisoformat(data['data_agendamento'].replace('Z', '+00:00'))

        nova_consulta = Consulta(**data)
        db.session.add(nova_consulta)
        db.session.commit()
        return nova_consulta.to_dict()

    @staticmethod
    def atualizar(id, data):
        consulta = Consulta.query.get(id)
        if not consulta:
            return None
        for key, value in data.items():
            setattr(consulta, key, value)
        db.session.commit()
        return consulta.to_dict()

    @staticmethod
    def deletar(id):
        consulta = Consulta.query.get(id)
        if not consulta:
            return None
        db.session.delete(consulta)
        db.session.commit()
        return True