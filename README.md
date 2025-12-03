# FluiSaúde

<div align="center">
**Sistema de Gerenciamento para Unidades Básicas de Saúde**

[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.0+-green.svg)](https://flask.palletsprojects.com)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Objetivos](#objetivos)
- [Equipe](#equipe)
- [Funcionalidades](#funcionalidades)
- [Stack Tecnológico](#stack-tecnológico)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Executar](#como-executar)
- [Documentação da API](#documentação-da-api)
- [Padrões de Código](#padrões-de-código)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Licença](#licença)

## Sobre o Projeto

O **FluiSaúde** é um sistema completo de gerenciamento para Unidades Básicas de Saúde (UBS), desenvolvido como parte de um desafio acadêmico. A plataforma foi projetada para otimizar e facilitar o agendamento de consultas e o gerenciamento de informações, melhorando significativamente o fluxo de atendimento e a organização da unidade.

### Motivação

Unidades Básicas de Saúde enfrentam diariamente o desafio de gerenciar grande volume de pacientes, consultas e profissionais de saúde. Processos manuais e sistemas desatualizados geram:
- Filas desnecessárias
- Agendamentos ineficientes
- Dificuldade na gestão de informações
- Falta de integração entre diferentes setores

O FluiSaúde surge como solução moderna e integrada para estes problemas.

## Objetivos

- [X] **Otimizar** o fluxo de agendamento de consultas
- [X] **Digitalizar** o gerenciamento de pacientes e profissionais
- [X] **Facilitar** o acesso a informações em tempo real
- [X] **Reduzir** o tempo de espera dos pacientes
- [X] **Melhorar** a organização dos recursos da UBS

## Equipe

| Nome | Função | Responsabilidade |
|------|--------|------------------|
| **Cauã Rego Tavares Leite Duarte** | Líder do Grupo | Tech Lead & Coordenação Geral |
| Matheus Rodrigues Laré | Desenvolvedor | CRUD de Especialidades |
| Guilherme Alves | Desenvolvedor | CRUD de Consultas |
| Fernando Andrade | Desenvolvedor | CRUD de Médicos |
| João Pedro Cavalcanti de Souza | Desenvolvedor | CRUD de Consultas |
| Gabriel Brito Ferreira Dias | Desenvolvedor | CRUD de Médicos |
| Luis Felipe Farias Nunes | Desenvolvedor | CRUD de Especialidades |
| Renato Santos Chong | Desenvolvedor | CRUD de Pacientes |

## Funcionalidades

O sistema oferece um conjunto completo de funcionalidades para gestão de UBS:

### CRUDs Implementados

1. **Gestão de Pacientes**
   - Cadastro completo com dados pessoais
   - Busca por CPF ou nome
   - Histórico de consultas
   - Atualização de informações

2. **Gestão de Médicos**
   - Cadastro com especialidades
   - Agenda disponível
   - Status de disponibilidade
   - Vinculação com especialidades

3. **Gestão de Consultas**
   - Agendamento inteligente
   - Confirmação automática
   - Cancelamento com reagendamento
   - Histórico completo

4. **Gestão de Especialidades**
   - Cadastro de especialidades médicas
   - Associação com médicos
   - Configuração de duração padrão

### Funcionalidades Adicionais

- **Dashboard Administrativo**: Visualização em tempo real
- **Notificações**: Lembretes de consultas
- **Relatórios**: Estatísticas e métricas
- **Busca Avançada**: Filtros múltiplos
- **Interface Responsiva**: Acesso em qualquer dispositivo

## Stack Tecnológico

### Backend
<div align="center">

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-313131?style=for-the-badge&logo=sqlalchemy&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

</div>

- **Python 3.11+**: Linguagem principal para lógica de negócio
- **Flask**: Micro-framework web para construção da API RESTful
- **SQLAlchemy**: ORM para manipulação do banco de dados
- **SQLite**: Banco de dados relacional leve para desenvolvimento

### Frontend
<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

- **React 18**: Biblioteca para construção de interfaces
- **TypeScript**: Tipagem estática para maior robustez
- **Vite**: Build tool rápido e moderno
- **TailwindCSS**: Framework CSS para estilização

## Estrutura do Projeto

```
fluisaude/
├── BACKEND/                 # API Flask
│   ├── app/
│   │   ├── models/         # Modelos de dados
│   │   ├── routes/         # Rotas da API
│   │   ├── services/       # Lógica de negócio
│   │   ├── static/         # Arquivos estáticos
│   │   └── templates/      # Templates HTML
│   ├── instance/           # Banco de dados SQLite
│   ├── requirements.txt    # Dependências Python
│   └── run.py             # Ponto de entrada
├── FRONTEND/               # Aplicação React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── services/      # Comunicação com API
│   │   └── utils/         # Utilitários
│   ├── public/            # Arquivos públicos
│   ├── package.json       # Dependências Node.js
│   └── vite.config.ts     # Configuração do Vite
├── docs/                  # Documentação
└── README.md             # Este arquivo
```

## Como Executar

### Pré-requisitos

- **Python 3.11+**
- **Node.js 18+**
- **npm 9+**
- **Git**

### 1. Clone o Repositório

```bash
git clone https://github.com/caua-rego/fluisaude.git
cd fluisaude
```

### 2. Configuração do Backend

```bash
# Acesse a pasta do backend
cd BACKEND

# Crie e ative o ambiente virtual
python3 -m venv .venv
source .venv/bin/activate  # Linux/Mac
# ou
.venv\Scripts\activate     # Windows

# Instale as dependências
pip install --upgrade pip
pip install -r requirements.txt

# Inicie o servidor
python run.py
```

O backend estará disponível em `http://localhost:5001`

### 3. Configuração do Frontend

```bash
# Abra um novo terminal
cd FRONTEND

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

### 4. Execução Integrada (Recomendado)

Para rodar frontend e backend no mesmo servidor:

```bash
# 1. Build do frontend
cd FRONTEND
npm install
npm run build

# 2. Copie para o backend
mkdir -p ../BACKEND/app/static/app
cp -r dist/* ../BACKEND/app/static/app/

# 3. Inicie o backend
cd ../BACKEND
source .venv/bin/activate
python run.py
```

Acesse `http://localhost:5001/` para ver a aplicação completa.

## Documentação da API

### Base URL
```
http://localhost:5001/api
```

### Autenticação
Atualmente, a API não utiliza autenticação, mas está planejada para implementação futura.

### Endpoints Principais

#### Pacientes
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/pacientes/` | Lista todos os pacientes |
| POST | `/pacientes/` | Cria um novo paciente |
| GET | `/pacientes/<id>` | Busca paciente por ID |
| PUT | `/pacientes/<id>` | Atualiza dados do paciente |
| DELETE | `/pacientes/<id>` | Remove paciente |

**Exemplo de criação:**
```bash
curl -X POST http://localhost:5001/api/pacientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "cpf": "12345678901",
    "telefone": "(11)99999-9999",
    "email": "joao@email.com",
    "data_nascimento": "1990-01-01"
  }'
```

#### Médicos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/medicos/` | Lista todos os médicos |
| POST | `/medicos/` | Cadastra novo médico |
| GET | `/medicos/<id>` | Busca médico por ID |
| PUT | `/medicos/<id>` | Atualiza dados do médico |
| DELETE | `/medicos/<id>` | Remove médico |

#### Consultas
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/consultas/` | Lista todas as consultas |
| POST | `/consultas/` | Agenda nova consulta |
| GET | `/consultas/<id>` | Busca consulta por ID |
| PUT | `/consultas/<id>` | Atualiza consulta |
| DELETE | `/consultas/<id>` | Cancela consulta |

**Exemplo de agendamento:**
```bash
curl -X POST http://localhost:5001/api/consultas \
  -H "Content-Type: application/json" \
  -d '{
    "paciente_id": 1,
    "medico_id": 1,
    "data_agendamento": "2025-12-15T14:30:00",
    "status": "agendada"
  }'
```

#### Especialidades
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/especialidades/` | Lista especialidades |
| POST | `/especialidades/` | Cria especialidade |
| GET | `/especialidades/<id>` | Busca por ID |
| PUT | `/especialidades/<id>` | Atualiza especialidade |
| DELETE | `/especialidades/<id>` | Remove especialidade |

## Padrões de Código

### Python Backend

#### Nomenclatura de Classes: PascalCase

Adotamos o padrão **PascalCase** para manter consistência e legibilidade:

```python
# Correto
class PacienteController:
    def __init__(self, nome, cpf):
        self.nome = nome
        self.cpf = cpf

    def salvar_paciente(self):
        # Lógica para salvar
        pass

# Incorreto
class paciente_controller:
    pass
```

#### Convenções Adotadas

- **Variáveis e funções**: `snake_case`
- **Constantes**: `UPPER_SNAKE_CASE`
- **Privados**: prefixo `_` (ex: `_metodo_privado`)
- **Métodos especiais**: dunder methods (ex: `__init__`)

### TypeScript Frontend

#### Componentes React

```typescript
// Correto
interface PacienteProps {
  paciente: Paciente;
  onEdit: (id: number) => void;
}

const PacienteCard: React.FC<PacienteProps> = ({ paciente, onEdit }) => {
  return (
    <div className="card">
      <h3>{paciente.nome}</h3>
    </div>
  );
};

export default PacienteCard;
```

## Troubleshooting

### Problemas Comuns

#### 1. Porta em Uso
```bash
# Verifique qual processo está usando a porta
lsof -iTCP:5001 -sTCP:LISTEN -n -P

# Encerre o processo
kill -9 <PID>
```

#### 2. Erro de Módulo Python
```bash
# Verifique se está no ambiente virtual
which python

# Reinstale as dependências
pip install -r requirements.txt
```

#### 3. Erro de Build no Frontend
```bash
# Limpe o cache do npm
npm cache clean --force

# Delete node_modules e reinstale
rm -rf node_modules
npm install
```

#### 4. Banco de Dados Não Encontrado
```bash
# Verifique se a pasta instance existe
mkdir -p instance/

# Verifique permissões
chmod 755 instance/
```

### Logs de Depuração

Ative o modo debug do Flask:

```python
# Em run.py
app.run(debug=True, port=5001)
```

## Roadmap

### Versão 1.0 (Atual)
- [X] CRUDs básicos
- [X] API RESTful
- [X] Frontend React
- [X] Dashboard simples

### Versão 1.1 (Planejado)
- [ ] Autenticação JWT
- [ ] Perfis de usuário (admin, médico, paciente)
- [ ] Envio de emails de confirmação
- [ ] Relatórios PDF

### Versão 2.0 (Futuro)
- [ ] Aplicativo mobile (React Native)
- [ ] Integração com sistemas de saúde públicos
- [ ] Telemedicina
- [ ] Prontuário eletrônico completo

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Contribuições

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## Contato

- **Líder do Projeto**: Cauã Rego - crtld@cesar.school
- **Repositório**: [github.com/caua-rego/fluisaude](https://github.com/caua-rego/fluisaude)

---

<div align="center">
  <p style="font-size: 1.1em; color: #666;">
    <strong>Projeto desenvolvido pela equipe FluiSaúde</strong><br>
    <span style="color: #888;">Fundamentos de Programação - CESAR School 2025.2</span><br>
    <span style="color: #999; font-style: italic;">Orientação: Profª. Aêda Monalliza Cunha de Sousa</span>
  </p>
</div>
