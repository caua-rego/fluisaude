from models.consulta_model import ConsultaModel
from app import db # type: ignore

class ConsultaController:
    @staticmethod
    def listar():
        consultas = ConsultaModel.query.all()
        return [c.to_dict() for c in consultas]

    @staticmethod
    def criar(data):
        nova_consulta = ConsultaModel(**data)
        db.session.add(nova_consulta)
        db.session.commit()
        return nova_consulta.to_dict()

    @staticmethod
    def atualizar(id, data):
        consulta = ConsultaModel.query.get(id)
        if not consulta:
            return None
        for key, value in data.items():
            setattr(consulta, key, value)
        db.session.commit()
        return consulta.to_dict()

    @staticmethod
    def deletar(id):
        consulta = ConsultaModel.query.get(id)
        if not consulta:
            return None
        db.session.delete(consulta)
        db.session.commit()
        return True
