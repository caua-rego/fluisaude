from .. import db
from datetime import datetime

class Consulta(db.Model):
    __tablename__ = 'consultas'
    id = db.Column(db.Integer, primary_key=True)
    paciente_id = db.Column(db.Integer, nullable=False)
    medico_id = db.Column(db.Integer, nullable=False)
    data_agendamento = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    status = db.Column(db.String(50), nullable=False, default='agendada')

    def to_dict(self):
        return {
            'id': self.id,
            'paciente_id': self.paciente_id,
            'medico_id': self.medico_id,
            'data_agendamento': self.data_agendamento.isoformat(),
            'status': self.status
        }
