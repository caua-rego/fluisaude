from app import db

class Especialidade(db.Model):
    __tablename__ = 'especialidades'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), unique=True, nullable=False)
    descricao = db.Column(db.String(500), nullable=True)
    medicos = db.relationship('Medico', backref='especialidade', lazy=True)

    def to_json(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'descricao': self.descricao
        }