from app import db # type: ignore

class ConsultaModel(db.Model):
    __tablename__ = "consultas"

    id = db.Column(db.Integer, primary_key=True)
    paciente_nome = db.Column(db.String(100), nullable=False)
    medico_nome = db.Column(db.String(100), nullable=False)
    especialidade = db.Column(db.String(100), nullable=False)
    data = db.Column(db.Date, nullable=False)
    hora = db.Column(db.Time, nullable=False)
    status = db.Column(db.String(20), default="Agendada")

    def to_dict(self):
        return {
            "id": self.id,
            "paciente_nome": self.paciente_nome,
            "medico_nome": self.medico_nome,
            "especialidade": self.especialidade,
            "data": self.data.isoformat(),
            "hora": self.hora.strftime("%H:%M:%S"),
            "status": self.status
        }

    def __repr__(self):
        return f"<Consulta {self.id} - {self.paciente_nome} com {self.medico_nome}>"
