# FluiSaúde

## Descrição do Projeto

O **FluiSaúde** é um sistema de gerenciamento para Unidades Básicas de Saúde (UBS), desenvolvido como parte de um desafio acadêmico. O objetivo é otimizar e facilitar o agendamento de consultas e o gerenciamento de informações, melhorando o fluxo de atendimento e a organização da unidade.

## Prazo de Entrega

- **Data:** 29/10/2025

## Desafio Escolhido

- **Tema:** UBS - Unidade Básica de Saúde

## Componentes do Grupo

- Cauã Rego Tavares Leite Duarte
- Matheus Rodrigues Laré
- Guilherme Alves
- Fernando Andrade
- João Pedro Cavalcanti de Souza
- Gabriel Brito Ferreira Dias
- Luis Felipe Farias Nunes
- Renato Santos Chong

### Líder do Grupo

- Cauã Rego Tavares Leite Duarte

## Repositório do Projeto

O código-fonte e o acompanhamento do desenvolvimento estão disponíveis no GitHub:
[github.com/caua-rego/fluisaude](https://github.com/caua-rego/fluisaude)

---

## Tecnologias Utilizadas (Backend)

O backend do projeto é desenvolvido com as seguintes tecnologias:

- **Python:** Linguagem de programação principal para toda a lógica de negócio e construção do servidor.
- **Flask:** Um micro-framework web para Python, utilizado para construir a API RESTful que servirá os dados para o cliente.
- **PostgreSQL (Supabase):** Banco de dados relacional robusto utilizado para o armazenamento e gerenciamento dos dados da aplicação.
- **SQLAlchemy:** ORM (Object-Relational Mapping) para Python que facilita a interação com o banco de dados.
- **Flask-SQLAlchemy:** Extensão do Flask que integra SQLAlchemy com a aplicação.
- **psycopg2-binary:** Driver para conexão Python com PostgreSQL.
- **python-dotenv:** Biblioteca para gerenciamento de variáveis de ambiente através de arquivo .env.

---

## Arquitetura do Projeto

O projeto segue uma **Clean Architecture simples** com separação clara de responsabilidades:

<img width="965" height="774" alt="image" src="https://github.com/user-attachments/assets/c804432f-c33d-414a-b9da-b0bcbe356570" />

---

```
fluisaude/
├── models/              # Modelos de dados (entidades do banco)
│   ├── __init__.py
│   └── consulta_model.py
├── controllers/         # Lógica de negócio (CRUDs)
│   ├── __init__.py
│   └── consulta_controller.py
├── routes/              # Rotas da API (endpoints)
│   ├── __init__.py
│   └── consulta_routes.py
├── database.py          # Configuração de conexão com o banco
├── app.py              # Factory da aplicação Flask
├── main.py             # Ponto de entrada da aplicação
├── requirements.txt    # Dependências do projeto
├── .env               # Variáveis de ambiente (não versionado)
└── README.md          # Documentação do projeto
```

### Explicação das Camadas:

- **Models:** Definem as estruturas de dados que representam as tabelas do banco de dados.
- **Controllers:** Contêm a lógica de negócio para operações CRUD (Create, Read, Update, Delete).
- **Routes:** Definem os endpoints da API RESTful que recebem as requisições HTTP.
- **Database:** Configuração de conexão com o banco de dados PostgreSQL.
- **App:** Factory pattern para criação e configuração da aplicação Flask.
- **Main:** Arquivo inicial que executa a aplicação.


1.  **CRUD de Pacientes:** Gerenciamento completo dos dados dos pacientes.
2.  **CRUD de Médicos:** Gerenciamento de profissionais de saúde e suas especialidades.
3.  **CRUD de Consultas:** Agendamento, visualização, atualização e cancelamento de consultas.
4.  **CRUD de Especialidades:** Cadastro e gerenciamento das especialidades médicas disponíveis. (Matheus Laré; Luís Nunes)

---

## Padrões de Código (Python)

### Nomenclatura de Classes: `PascalCase`

Para manter a consistência e a legibilidade do código, adotamos o padrão **PascalCase** para a nomeação de classes em Python.

**O que é PascalCase?**
PascalCase (também conhecido como UpperCamelCase) é uma convenção de nomenclatura onde a primeira letra de cada palavra em um nome composto é capitalizada, sem espaços ou pontuações.

**Aplicação:**
Todas as classes declaradas no projeto devem seguir este padrão.

**Exemplos Corretos:**
- `PacienteModel`
- `ConsultaController`
- `AgendamentoService`
- `MedicoModel`
- `EspecialidadeModel`

**Exemplos Incorretos:**
- `paciente_model` (snake_case)
- `Pacientemodel` (sem separação)
- `paciente-controller` (hífen)
- `PACIENTEMODEL` (todos maiúsculos)

```python
# Correto - Usando PascalCase para o nome da classe
class ConsultaController:
    def __init__(self):
        pass

    def criar_consulta(self, dados):
        # Lógica para criar consulta
        pass

# Incorreto
class consulta_controller:
    def __init__(self):
        pass
```

---

## Funcionalidades (CRUDs)

O escopo inicial do projeto prevê a implementação de 4 operações de CRUD (Create, Read, Update, Delete) para as seguintes entidades do sistema:

### 1. CRUD de Consultas
Gerenciamento completo das consultas médicas.
- **Create:** Criar nova consulta com paciente, médico, especialidade, data e hora.
- **Read:** Listar todas as consultas ou buscar consulta específica por ID.
- **Update:** Atualizar informações de uma consulta existente.
- **Delete:** Cancelar/excluir uma consulta.

### 2. CRUD de Pacientes (Planejado)
Gerenciamento completo dos dados dos pacientes.
- **Create:** Cadastrar novo paciente com informações pessoais.
- **Read:** Listar todos os pacientes ou buscar paciente específico.
- **Update:** Atualizar dados cadastrais do paciente.
- **Delete:** Remover paciente do sistema.

### 3. CRUD de Médicos (Planejado)
Gerenciamento de profissionais de saúde e suas informações.
- **Create:** Cadastrar novo médico com especialidades.
- **Read:** Listar todos os médicos ou buscar médico específico.
- **Update:** Atualizar informações do médico.
- **Delete:** Remover médico do sistema.

### 4. CRUD de Especialidades (Planejado)
Cadastro e gerenciamento das especialidades médicas disponíveis.
- **Create:** Adicionar nova especialidade médica.
- **Read:** Listar todas as especialidades disponíveis.
- **Update:** Atualizar descrição da especialidade.
- **Delete:** Remover especialidade do sistema.

---

## Setup do Projeto

### Pré-requisitos

- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)
- Git
- Conta no Supabase (para banco PostgreSQL)

### 1. Clonar o Repositório

```bash
git clone https://github.com/caua-rego/fluisaude.git
cd fluisaude
```

### 2. Criar e Ativar Ambiente Virtual

**Linux/macOS:**
```bash
# Criar ambiente virtual
python3 -m venv .venv

# Ativar ambiente virtual
source .venv/bin/activate
```

**Windows:**
```bash
# Criar ambiente virtual
python -m venv .venv

# Ativar ambiente virtual
.venv\Scripts\activate
```

### 3. Instalar Dependências

```bash
pip install -r requirements.txt
```

### 4. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
user=seu_usuario_supabase
password=sua_senha_supabase
host=seu_host_supabase.supabase.co
port=5432
dbname=postgres
```

**Importante:** O arquivo `.env` **não** deve ser commitado no repositório. Já está incluído no `.gitignore`.

### 5. Executar a Aplicação

```bash
python main.py
```

A aplicação estará disponível em `http://localhost:5000`

---

## Lista de Dependências

As seguintes bibliotecas são necessárias para rodar o projeto:

- **Flask==3.0.0:** Micro-framework web para criar a API.
- **Flask-SQLAlchemy==3.1.1:** Integração do SQLAlchemy com Flask.
- **SQLAlchemy==2.0.0:** ORM para interação com banco de dados.
- **psycopg2-binary==2.9.9:** Driver PostgreSQL para Python.
- **python-dotenv==1.0.0:** Carregamento de variáveis de ambiente do arquivo .env.

---

## Exemplo de Uso

### Criar uma Nova Consulta

Para criar uma nova consulta, envie uma requisição POST para o endpoint `/consultas/`:

```bash
curl -X POST http://localhost:5000/consultas/ \
  -H "Content-Type: application/json" \
  -d '{
    "paciente_nome": "João Silva",
    "medico_nome": "Dr. Carlos Alberto",
    "especialidade": "Clínico Geral",
    "data": "2024-01-15",
    "hora": "14:30:00"
  }'
```

**Resposta Esperada (Status 201):**
```json
{
  "id": 1,
  "paciente_nome": "João Silva",
  "medico_nome": "Dr. Carlos Alberto",
  "especialidade": "Clínico Geral",
  "data": "2024-01-15",
  "hora": "14:30:00",
  "status": "Agendada"
}
```

### Listar Todas as Consultas

```bash
curl -X GET http://localhost:5000/consultas/
```

**Resposta Esperada:**
```json
[
  {
    "id": 1,
    "paciente_nome": "João Silva",
    "medico_nome": "Dr. Carlos Alberto",
    "especialidade": "Clínico Geral",
    "data": "2024-01-15",
    "hora": "14:30:00",
    "status": "Agendada"
  }
]
```

### Atualizar uma Consulta

```bash
curl -X PUT http://localhost:5000/consultas/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Cancelada"
  }'
```

### Excluir uma Consulta

```bash
curl -X DELETE http://localhost:5000/consultas/1
```

---

## Notas Adicionais

### Boas Práticas

1. **Estrutura de Diretórios:** Mantenha a organização das pastas conforme a Clean Architecture estabelecida.
2. **Nomenclatura:** Siga rigorosamente o padrão PascalCase para classes.
3. **Variáveis de Ambiente:** Nunca commit dados sensíveis como senhas e chaves de API.
4. **Commits:** Faça commits descritivos e frequentes para facilitar o acompanhamento das mudanças.

### Arquivo .env

O arquivo `.env` é essencial para o funcionamento da aplicação e deve conter:

```env
# Configurações do Supabase
user=seu_usuario
password=sua_senha
host=seu_host.supabase.co
port=5432
dbname=postgres
```

**Dica:** Você pode obter essas informações no painel do Supabase em Settings > Database.

### Organização do Projeto

- Cada entidade (Paciente, Médico, Consulta, Especialidade) deve ter seus próprios arquivos em `models/`, `controllers/` e `routes/`.
- Mantenha a separação de responsabilidades clara entre as camadas.
- Use os métodos `to_dict()` nos models para facilitar a serialização JSON.
- Trate adequadamente os erros e retorne códigos HTTP apropriados.

### Extensões Futuras

O projeto está estruturado para facilitar a adição de novas funcionalidades como:
- Autenticação de usuários
- Sistema de notificações
- Relatórios e estatísticas
- Integração com calendários externos
