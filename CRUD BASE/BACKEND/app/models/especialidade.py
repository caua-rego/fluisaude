from app import db

class Especialidade(db.Model):
    __tablename__ = 'especialidades'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), unique=True, nullable=False)
    medicos = db.relationship('Medico', backref='especialidade', lazy=True)

    def to_json(self):
        return {
            'id': self.id,
            'nome': self.nome
        }
