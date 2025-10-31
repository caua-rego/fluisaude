# Importa as classes e funções necessárias do Flask e de outras bibliotecas.
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Cria uma instância da aplicação Flask.
app = Flask(__name__)

# Habilita o CORS para permitir que a API seja acessada por um frontend de origem diferente.
CORS(app)

# Configura o caminho para o banco de dados SQLite.
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///banco_de_dados.db'

# Cria uma instância do SQLAlchemy para interagir com o banco de dados.
db = SQLAlchemy(app)


# Define o modelo de dados para a tabela 'Paciente'.
# Cada atributo da classe corresponde a uma coluna na tabela do banco de dados.
class Paciente(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Chave primária: identificador único para cada paciente.
    nome = db.Column(db.String(120), nullable=False)  # Nome do paciente, não pode ser nulo.
    cpf = db.Column(db.String(11), unique=True, nullable=False)  # CPF do paciente, deve ser único e não pode ser nulo.
    telefone = db.Column(db.String(20), nullable=True)  # Telefone do paciente, pode ser nulo.


# Rota para adicionar um novo paciente ao banco de dados.
# Aceita requisições POST no endpoint /api/pacientes/add.
@app.route('/api/pacientes/add', methods=['POST'])
def add_paciente():
    data = request.json  # Obtém os dados enviados no corpo da requisição em formato JSON.
    # Verifica se os campos 'nome' e 'cpf' estão presentes nos dados recebidos.
    if 'nome' in data and 'cpf' in data:
        # Cria uma nova instância do modelo Paciente com os dados fornecidos.
        paciente = Paciente(
            nome=data['nome'],
            cpf=data['cpf'],
            telefone=data.get('telefone', '')  # O telefone é opcional.
        )
        db.session.add(paciente)  # Adiciona o novo paciente à sessão do banco de dados.
        db.session.commit()  # Confirma a transação, salvando o paciente no banco de dados.
        return jsonify({'message': 'Paciente adicionado com sucesso'}), 201  # Retorna uma mensagem de sucesso.
    else:
        return jsonify({'message': 'Dados inválidos para o paciente'}), 400  # Retorna um erro se os dados forem inválidos.


# Rota para deletar um paciente específico pelo seu ID.
# Aceita requisições DELETE no endpoint /api/pacientes/delete/<int:paciente_id>.
@app.route('/api/pacientes/delete/<int:paciente_id>', methods=['DELETE'])
def delete_paciente(paciente_id):
    paciente = Paciente.query.get(paciente_id)  # Busca o paciente no banco de dados pelo ID.
    if paciente:
        db.session.delete(paciente)  # Deleta o paciente da sessão do banco de dados.
        db.session.commit()  # Confirma a transação.
        return jsonify({'message': 'Paciente deletado com sucesso'}), 200  # Retorna uma mensagem de sucesso.
    else:
        return jsonify({'message': 'Paciente não encontrado'}), 404  # Retorna um erro se o paciente não for encontrado.


# Rota para obter os detalhes de um paciente específico pelo seu ID.
# Aceita requisições GET no endpoint /api/pacientes/<int:paciente_id>.
@app.route('/api/pacientes/<int:paciente_id>', methods=['GET'])
def get_paciente_details(paciente_id):
    paciente = Paciente.query.get(paciente_id)  # Busca o paciente pelo ID.
    if paciente:
        # Retorna os dados do paciente em formato JSON.
        return jsonify({
            'id': paciente.id,
            'nome': paciente.nome,
            'cpf': paciente.cpf,
            'telefone': paciente.telefone
        })
    else:
        return jsonify({'message': 'Paciente não encontrado'}), 404  # Retorna um erro se o paciente não for encontrado.


# Rota para atualizar os dados de um paciente específico pelo seu ID.
# Aceita requisições PUT no endpoint /api/pacientes/update/<int:paciente_id>.
@app.route('/api/pacientes/update/<int:paciente_id>', methods=['PUT'])
def update_paciente(paciente_id):
    paciente = Paciente.query.get(paciente_id)  # Busca o paciente pelo ID.
    if not paciente:
        return jsonify({"message": "Paciente não encontrado"}), 404  # Retorna um erro se o paciente não for encontrado.
    else:
        data = request.json  # Obtém os novos dados da requisição.
        # Atualiza os campos do paciente se os novos dados estiverem presentes na requisição.
        if 'nome' in data:
            paciente.nome = data['nome']
        if 'cpf' in data:
            paciente.cpf = data['cpf']
        if 'telefone' in data:
            paciente.telefone = data['telefone']
        
        db.session.commit()  # Confirma as alterações no banco de dados.
        return jsonify({'message': 'Paciente atualizado com sucesso'})  # Retorna uma mensagem de sucesso.


# Rota para obter a lista de todos os pacientes.
# Aceita requisições GET no endpoint /api/pacientes.
@app.route('/api/pacientes', methods=['GET'])
def get_pacientes():
    pacientes = Paciente.query.all()  # Obtém todos os registros da tabela de pacientes.
    paciente_list = []
    # Itera sobre cada paciente e cria uma lista de dicionários com seus dados.
    for paciente in pacientes:
        paciente_list.append({
            'id': paciente.id,
            'nome': paciente.nome,
            'cpf': paciente.cpf,
            'telefone': paciente.telefone
        })
    return jsonify(paciente_list)  # Retorna a lista de pacientes em formato JSON.


# Bloco de código que é executado quando o script é rodado diretamente.
if __name__ == '__main__':
    # Cria todas as tabelas definidas nos modelos do SQLAlchemy.
    # O app.app_context() garante que a aplicação esteja configurada corretamente.
    with app.app_context():
        db.create_all()
    # Inicia o servidor de desenvolvimento do Flask.
    # O debug=True ativa o modo de depuração, que mostra erros detalhados no navegador.
    app.run(debug=True)