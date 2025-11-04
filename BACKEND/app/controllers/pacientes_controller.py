from datetime import datetime

from app import db
from app.models.pacientes import Paciente

def get_all_pacientes():
    return Paciente.query.all()

def get_paciente_by_id(paciente_id):
    return Paciente.query.get_or_404(paciente_id)

def create_paciente(data):
    nome = data.get('nome')
    cpf = data.get('cpf')
    if not nome or not cpf:
        raise ValueError("Nome e CPF são obrigatórios")

    new_paciente = Paciente(
        nome=nome,
        cpf=cpf,
        telefone=data.get('telefone'),
        endereco=data.get('endereco')
    )
    
    data_nascimento_str = data.get('data_nascimento')
    if data_nascimento_str:
        new_paciente.data_nascimento = datetime.strptime(data_nascimento_str, '%Y-%m-%d').date()

    db.session.add(new_paciente)
    db.session.commit()
    return new_paciente

def update_paciente(paciente_id, data):
    paciente = get_paciente_by_id(paciente_id)
    
    paciente.nome = data.get('nome', paciente.nome)
    paciente.cpf = data.get('cpf', paciente.cpf)
    paciente.telefone = data.get('telefone', paciente.telefone)
    paciente.endereco = data.get('endereco', paciente.endereco)
    
    data_nascimento_str = data.get('data_nascimento')
    if data_nascimento_str:
        paciente.data_nascimento = datetime.strptime(data_nascimento_str, '%Y-%m-%d').date()
    
    db.session.commit()
    return paciente

def delete_paciente(paciente_id):
    paciente = get_paciente_by_id(paciente_id)
    db.session.delete(paciente)
    db.session.commit()
