# Sistema de Matrícula — Backend

> 🇧🇷 Versão em Português abaixo | 🇺🇸 English version below

---

## 🇧🇷 Português (PT-BR)

### Sobre o Projeto

Este é um sistema simples de **matrícula em turmas**, desenvolvido como trabalho universitário. O backend é uma API REST construída com **Node.js** e **Express**, que permite o gerenciamento de turmas e usuários, com autenticação via **JWT** e controle de acesso por papéis (`admin` e `aluno`).

---

### 🛠️ Tecnologias Utilizadas

| Pacote | Versão | Descrição |
|---|---|---|
| [express](https://expressjs.com/) | ^5.2.1 | Framework web para Node.js |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | ^9.0.3 | Autenticação via JWT |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | ^6.0.0 | Hash seguro de senhas |
| [dotenv](https://github.com/motdotla/dotenv) | ^17.3.1 | Gerenciamento de variáveis de ambiente |
| [cors](https://github.com/expressjs/cors) | ^2.8.6 | Controle de CORS |
| [uuid](https://github.com/uuidjs/uuid) | ^13.0.0 | Geração de IDs únicos |
| [nodemon](https://nodemon.io/) *(dev)* | ^3.1.14 | Reinicialização automática em desenvolvimento |

---

### ⚙️ Pré-requisitos

- **[Node.js](https://nodejs.org/)** v18 ou superior instalado na máquina.
- Gerenciador de pacotes **npm** (já incluso com o Node.js).

---

### 🚀 Como Rodar o Projeto

#### 1. Clone ou baixe o repositório

```bash
git clone <url-do-repositorio>
cd backend
```

#### 2. Instale as dependências

```bash
npm install
```

#### 3. Configure o arquivo `.env`

Crie um arquivo chamado `.env` na raiz do projeto (pasta `backend/`). Use o arquivo `.env.example` como base:

```bash
# Copie o exemplo
copy .env.example .env
```

Edite o `.env` com seus valores:

```env
PORT=3000
JWT_KEY=sua_chave_secreta_aqui
CORS_ORIGIN=http://localhost:5173

NAME_USER_ADMIN=admin
EMAIL_USER_ADMIN=admin@exemplo.com
PASSWORD_USER_ADMIN=senhaSegura123
```

> **⚠️ Importante:** O usuário admin definido no `.env` é criado automaticamente ao iniciar o servidor e é a única forma de ter acesso administrativo inicial ao sistema.

#### 4. Inicie o servidor

**Modo desenvolvimento** (com hot-reload via nodemon):
```bash
npm run dev
```

**Modo produção:**
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000` (ou a porta definida no `.env`).

---

### 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── controllers/       # Lógica de negócio das rotas
│   ├── middlewares/       # Autenticação e autorização
│   ├── models/            # Modelos de dados (em memória)
│   ├── routes/            # Definição das rotas da API
│   └── server.js          # Ponto de entrada da aplicação
├── .env                   # Variáveis de ambiente (não versionar!)
├── .env.example           # Exemplo de variáveis de ambiente
├── package.json
└── README.md
```

---

### 📄 Documentação das Rotas

Consulte o arquivo [API_DOCS.md](./API_DOCS.md) para ver a documentação completa de todas as rotas da API.

---
---

## 🇺🇸 English

### About the Project

This is a simple **class enrollment system**, developed as a university assignment. The backend is a REST API built with **Node.js** and **Express**, which allows managing classes and users, with **JWT** authentication and role-based access control (`admin` and `student`/`aluno`).

---

### 🛠️ Technologies Used

| Package | Version | Description |
|---|---|---|
| [express](https://expressjs.com/) | ^5.2.1 | Web framework for Node.js |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | ^9.0.3 | JWT-based authentication |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | ^6.0.0 | Secure password hashing |
| [dotenv](https://github.com/motdotla/dotenv) | ^17.3.1 | Environment variable management |
| [cors](https://github.com/expressjs/cors) | ^2.8.6 | CORS control |
| [uuid](https://github.com/uuidjs/uuid) | ^13.0.0 | Unique ID generation |
| [nodemon](https://nodemon.io/) *(dev)* | ^3.1.14 | Auto-restart in development |

---

### ⚙️ Prerequisites

- **[Node.js](https://nodejs.org/)** v18 or higher installed on your machine.
- **npm** package manager (already bundled with Node.js).

---

### 🚀 How to Run the Project

#### 1. Clone or download the repository

```bash
git clone <repository-url>
cd backend
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Configure the `.env` file

Create a file named `.env` in the project root (`backend/` folder). Use the `.env.example` file as a reference:

```bash
# Copy the example (Windows)
copy .env.example .env
# Or on Mac/Linux
cp .env.example .env
```

Edit the `.env` with your values:

```env
PORT=3000
JWT_KEY=your_secret_key_here
CORS_ORIGIN=http://localhost:5173

NAME_USER_ADMIN=admin
EMAIL_USER_ADMIN=admin@example.com
PASSWORD_USER_ADMIN=securePassword123
```

> **⚠️ Important:** The admin user defined in the `.env` is created automatically when the server starts. It is the only way to have initial administrative access to the system.

#### 4. Start the server

**Development mode** (with hot-reload via nodemon):
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will be available at `http://localhost:3000` (or the port set in `.env`).

---

### 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/       # Route business logic
│   ├── middlewares/       # Authentication and authorization
│   ├── models/            # Data models (in-memory)
│   ├── routes/            # API route definitions
│   └── server.js          # Application entry point
├── .env                   # Environment variables (do NOT commit!)
├── .env.example           # Environment variables example
├── package.json
└── README.md
```

---

### 📄 API Route Documentation

See [API_DOCS.md](./API_DOCS.md) for the complete documentation of all API routes.
