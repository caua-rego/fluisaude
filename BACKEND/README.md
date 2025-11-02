# Backend do FluiSaúde

Este diretório contém o backend da aplicação FluiSaúde, uma API RESTful desenvolvida com Flask para gerenciar pacientes, médicos, especialidades e consultass.

## Arquitetura

A aplicação segue uma arquitetura modular, utilizando Blueprints do Flask para separar as responsabilidades de cada entidade do sistema.

```
/BACKEND/
├───run.py                 # Ponto de entrada da aplicação
├───main.py               # Script para criar tabelas do banco
├───requirements.txt      # Dependências do projeto
├───database.db          # Banco SQLite (criado automaticamente)
├───database/
│   └───connection.py    # Configuração do banco de dados
└───app/
    ├───__init__.py      # Factory function da aplicação Flask
    ├───models/          # Models SQLAlchemy (tabelas)
    │   ├───consulta.py  # Model de consultas (implementado)
    │   ├───paciente.py  # Model de pacientes (vazio)
    │   ├───medico.py    # Model de médicos (vazio)
    │   └───especialidade.py # Model de especialidades (vazio)
    └───routes/          # Rotas da API (endpoints)
        ├───consultas.py # Rotas de consultas (POST implementado)
        ├───pacientes.py # Rotas de pacientes (vazio)
        ├───medicos.py   # Rotas de médicos (vazio)
        └───especialidades.py # Rotas de especialidades (vazio)
```

## Configuração do Ambiente

1. **Ativar o ambiente virtual:**
   ```bash
   source venv/bin/activate
   ```

2. **Instalar dependências (se necessário):**
   ```bash
   pip install -r requirements.txt
   ```

## Como Executar

### 1. Criar as tabelas do banco:
```bash
python main.py
```
Este comando cria as tabelas no arquivo `database.db`.

### 2. Iniciar o servidor:
```bash
python run.py
```
O servidor será iniciado em `http://localhost:5001`.

## Implementação por CRUD

Cada dupla deve implementar seus respectivos CRUDs nos arquivos designados:

### Dupla de Consultas (já implementado como exemplo):
- **Model:** `app/models/consulta.py` - OK
- **Routes:** `app/routes/consultas.py` - POST implementado
- **Rotas disponíveis:** `POST http://localhost:5001/consultas/`

Exemplo de uso:
```bash
curl -X POST http://localhost:5001/consultas/ \
  -H "Content-Type: application/json" \
  -d '{
    "paciente_nome": "João Silva",
    "medico_nome": "Dr. Pedro",
    "especialidade": "Cardiologia",
    "horario": "2024-01-15 14:30"
  }'
```

### Dupla de Pacientes:
- **Model:** `app/models/paciente.py` - IMPLEMENTAR
- **Routes:** `app/routes/pacientes.py` - IMPLEMENTAR
- **Registrar em `app/__init__.py`** quando pronto

### Dupla de Médicos:
- **Model:** `app/models/medico.py` - IMPLEMENTAR
- **Routes:** `app/routes/medicos.py` - IMPLEMENTAR
- **Registrar em `app/__init__.py`** quando pronto

### Dupla de Especialidades:
- **Model:** `app/models/especialidade.py` - IMPLEMENTAR
- **Routes:** `app/routes/especialidades.py` - IMPLEMENTAR
- **Registrar em `app/__init__.py`** quando pronto

## Passos para Implementação de Novos CRUDs

1. **Criar o Model:**
   - Definir a classe SQLAlchemy em `app/models/[entidade].py`
   - Herdar de `Base` (importado de `database.connection`)
   - Definir colunas com os tipos apropriados

2. **Implementar as Rotas:**
   - Criar blueprint em `app/routes/[entidade].py`
   - Implementar métodos HTTP (GET, POST, PUT, DELETE)
   - Usar `SessionLocal()` para conexão com banco

3. **Registrar as Rotas:**
   - Adicionar import em `app/__init__.py`
   - Registrar blueprint com `app.register_blueprint()`

4. **Atualizar `main.py`:**
   - Importar o novo model no `main.py`
   - Rodar `python main.py` para criar a tabela

## Estrutura de Exemplo (Consultas)

Para referência, use a implementação existente de consultas como base para os outros CRUDs.

## Banco de Dados

- **Tipo:** SQLite
- **Arquivo:** `database.db`
- **ORM:** SQLAlchemy
- **Conexão:** `database/connection.py`

## Troubleshooting

- **ModuleNotFoundError:** Ative o venv com `source venv/bin/activate`
- **Porta ocupada:** Verifique se outra instância está rodando em 5001
- **Tabelas não encontradas:** Execute `python main.py` para criar as tabelas