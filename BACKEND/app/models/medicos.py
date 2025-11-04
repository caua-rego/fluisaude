from app import db


class Medico(db.Model):
    __tablename__ = "medicos"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    crm = db.Column(db.String(20), unique=True, nullable=False)
    especialidade_id = db.Column(db.Integer, db.ForeignKey("especialidades.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "crm": self.crm,
            "especialidade_id": self.especialidade_id,
        }
