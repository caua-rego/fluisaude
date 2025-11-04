# FluiSaúde

## Descrição do Projeto

O **FluiSaúde** é um sistema de gerenciamento para Unidades Básicas de Saúde (UBS), desenvolvido como parte de um desafio acadêmico. O objetivo é otimizar e facilitar o agendamento de consultas e o gerenciamento de informações, melhorando o fluxo de atendimento e a organização da unidade.

## Prazo de Entrega

-   **Data:** 29/10/2025

## Desafio Escolhido

-   **Tema:** UBS - Unidade Básica de Saúde

## Componentes do Grupo
````markdown
# FluiSaúde

## Descrição do Projeto

O **FluiSaúde** é um sistema de gerenciamento para Unidades Básicas de Saúde (UBS), desenvolvido como parte de um desafio acadêmico. O objetivo é otimizar e facilitar o agendamento de consultas e o gerenciamento de informações, melhorando o fluxo de atendimento e a organização da unidade.

## Prazo de Entrega

-   **Data:** 29/10/2025

## Desafio Escolhido

-   **Tema:** UBS - Unidade Básica de Saúde

## Componentes do Grupo

-   Cauã Rego Tavares Leite Duarte
-   Matheus Rodrigues Laré
-   Guilherme Alves
-   Fernando Andrade
-   João Pedro Cavalcanti de Souza
-   Gabriel Brito Ferreira Dias
-   Luis Felipe Farias Nunes
-   Renato Santos Chong

### Líder do Grupo

-   Cauã Rego Tavares Leite Duarte

## Repositório do Projeto

O código-fonte e o acompanhamento do desenvolvimento estão disponíveis no GitHub:
[github.com/caua-rego/fluisaude](https://github.com/caua-rego/fluisaude)

---

## Tecnologias Utilizadas (Backend)

O backend do projeto será desenvolvido com as seguintes tecnologias:

-   **Python:** Linguagem de programação principal para toda a lógica de negócio e construção do servidor.
-   **Flask:** Um micro-framework web para Python, utilizado para construir a API RESTful que servirá os dados para o cliente.
-   **SQLALCHEMY:** Um banco de dados relacional leve e baseado em arquivo, utilizado para o armazenamento e gerenciamento dos dados da aplicação.

---

## Funcionalidades (CRUDs)

O escopo inicial do projeto prevê a implementação de 4 operações de CRUD (Create, Read, Update, Delete) para as seguintes entidades do sistema:

1.  **CRUD de Pacientes:** Gerenciamento completo dos dados dos pacientes. (Renato Santos Chong; Fernando Andrade)
2.  **CRUD de Médicos:** Gerenciamento de profissionais de saúde e suas especialidades. (Gabriel Brito; Cauã Rêgo)
3.  **CRUD de Consultas:** Agendamento, visualização, atualização e cancelamento de consultas. (Gui Alves; João Pedro)
4.  **CRUD de Especialidades:** Cadastro e gerenciamento das especialidades médicas disponíveis. (Matheus Larré; Luís Nunes)

## Como rodar o projeto integrado (backend + frontend)

Se você quer servir o frontend junto com o backend (mesmo servidor), siga estes passos rápidos:

1. Construa o frontend (na pasta `FRONTEND`):

```bash
cd FRONTEND
npm install
npm run build
```

2. Copie os arquivos gerados (`dist/`) para o backend (exemplo):

```bash
mkdir -p "CRUD BASE/BACKEND/app/static/app"
rsync -a --delete FRONTEND/dist/ "CRUD BASE/BACKEND/app/static/app/"
```

3. Inicie o backend (use o virtualenv):

```bash
cd "CRUD BASE/BACKEND"
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python run.py  # por padrão o projeto usa 5001 para evitar conflitos locais
```

4. Abra `http://localhost:5001/` para ver o frontend servido pelo Flask. O dashboard simples também está disponível em `/dashboard`.

Observação: o cliente já foi atualizado para usar chamadas relativas à API (`/api`) para que o build funcione quando servido pelo mesmo host.

---

## Padrões de Código (Python)

### Nomenclatura de Classes: `PascalCase`

Para manter a consistência e a legibilidade do código, adotamos o padrão **PascalCase** para a nomeação de classes em Python.

**O que é PascalCase?**
PascalCase (também conhecido como UpperCamelCase) é uma convenção de nomenclatura onde a primeira letra de cada palavra em um nome composto é capitalizada, sem espaços ou pontuações.

**Aplicação:**
Todas as classes declaradas no projeto devem seguir este padrão.

-   **Exemplos:** `PacienteModel`, `ConsultaController`, `AgendamentoService`.

```python
# Correto - Usando PascalCase para o nome da classe
class PacienteController:
    def __init__(self, nome, cpf):
        self.nome = nome
        self.cpf = cpf

    def salvar_paciente(self):
        # Lógica para salvar o paciente
        pass

# Incorreto
class paciente_controller:
    def __init__(self, nome, cpf):
        pass

````

---

### Seção técnica (comandos, variáveis, formatos e debugging)

Essas instruções são complementares ao conteúdo já existente. Elas foram adicionadas para ajudar desenvolvedores a rodar e integrar os componentes localmente.

Prerequisitos
- Python 3.11+ recomendado
- Node.js 18+ e npm 9+

Ambientes (venv) e instalação de dependências
```bash
# Exemplo no diretório do backend funcional (CRUD BASE/BACKEND)
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Frontend (na pasta FRONTEND)
npm install
```

Variáveis de ambiente úteis
- FLASK_APP=run.py (ou main.py)
- FLASK_ENV=development
- FLASK_RUN_PORT=5001
- DATABASE_URL (para produção, ex.: postgres)
- SECRET_KEY (substituir a chave padrão em produção)

Exemplos de execução
```bash
# rodar o backend de referência (CRUD BASE)
cd "CRUD BASE/BACKEND"
source .venv/bin/activate
python run.py

# rodar o frontend em dev
cd FRONTEND
npm run dev
```

API — formatos e exemplos
- Os endpoints estão sob `/api` (ex.: `/api/pacientes`). Use JSON e `Content-Type: application/json` para POST/PUT.
- `cpf` é uma string de 11 dígitos (apenas números). Ex.: `"12345678901"`.
- `data_agendamento`: `YYYY-MM-DDTHH:MM` ou ISO-8601 com segundos.

Curl rápidos
```bash
# criar paciente
curl -X POST http://127.0.0.1:5001/api/pacientes \
  -H "Content-Type: application/json" \
  -d '{"nome":"Fulano","cpf":"12345678901","telefone":"(11)99999-9999"}'

# criar consulta
curl -X POST http://127.0.0.1:5001/api/consultas \
  -H "Content-Type: application/json" \
  -d '{"paciente_id":1,"medico_id":1,"data_agendamento":"2025-10-31T14:30"}'
```

Resolução de problemas comuns
- `ModuleNotFoundError: No module named 'flask'`: ative seu venv e rode `pip install -r requirements.txt`.
- `Port 5001 is in use`: identifique o processo com `lsof -iTCP:5001 -sTCP:LISTEN -n -P` e encerre o PID.
- Banco SQLite ausente: confirme que a pasta `instance/` existe e tem permissão de escrita.

Integração frontend/backend (modo single-server)
1. No `FRONTEND`: `npm run build`
2. Copiar `dist/` para `CRUD BASE/BACKEND/app/static/app/`
3. Rodar `python run.py` em `CRUD BASE/BACKEND` e abrir `http://127.0.0.1:5001/`

Melhorias recomendadas
- Adicionar Dockerfile + docker-compose para padronizar execução em dev/CI.
- Adicionar Flask-Migrate para migrações de banco.
- Criar testes automatizados (pytest) para rotas principais e modelos.
