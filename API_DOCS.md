# 📖 API Documentation — Sistema de Matrícula

Base URL: `http://localhost:3000`

---

## Sumário / Table of Contents

- [🔐 Autenticação — `/auth`](#-autenticação--auth)
  - [POST /auth/register](#post-authregister)
  - [POST /auth/login](#post-authlogin)
- [🏫 Turmas — `/api/turmas`](#-turmas--apiturmas)
  - [GET /api/turmas](#get-apiturmas)
  - [POST /api/turmas](#post-apiturmas)
  - [POST /api/turmas/:idTurma/add-aluno](#post-apiturmasidturmaadd-aluno)
- [👥 Gerenciar Usuários — `/manage-users`](#-gerenciar-usuários--manage-users)
  - [GET /manage-users](#get-manage-users)
  - [POST /manage-users](#post-manage-users)

---

## Notações / Notation

| Ícone | Significado                                                               |
| ----- | ------------------------------------------------------------------------- |
| 🔓    | Rota pública — não requer autenticação                                    |
| 🔑    | Requer autenticação (token JWT no header `Authorization: Bearer <token>`) |
| 👑    | Requer autenticação **e** papel `admin`                                   |

---

## 🔐 Autenticação — `/auth`

> O sistema suporta dois papéis (_roles_): **`admin`** e **`aluno`**.
>
> - Qualquer pessoa pode se registrar via `/auth/register`, mas o papel criado sempre será `aluno`.
> - Para criar um usuário com papel `admin`, é necessário usar a rota [`POST /manage-users`](#post-manage-users), que exige autenticação de admin.
> - O primeiro usuário admin é configurado pelas variáveis de ambiente no `.env`.

---

### POST /auth/register

🔓 **Acesso:** Público

Cria uma nova conta de usuário com papel `aluno`.

**Request Body:**

```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "minhasenha123"
}
```

**Respostas:**

| Status            | Descrição                               |
| ----------------- | --------------------------------------- |
| `201 Created`     | Usuário criado com sucesso              |
| `400 Bad Request` | Dados inválidos ou e-mail já cadastrado |

**Exemplo de resposta (201):**

```json
{
  "id": "uuid-gerado",
  "name": "João Silva",
  "email": "joao@example.com"
}
```

---

### POST /auth/login

🔓 **Acesso:** Público

Autentica um usuário (tanto `admin` quanto `aluno`) e retorna um token JWT.

**Request Body:**

```json
{
  "email": "joao@example.com",
  "password": "minhasenha123"
}
```

**Respostas:**

| Status             | Descrição                             |
| ------------------ | ------------------------------------- |
| `200 OK`           | Login bem-sucedido, retorna token JWT |
| `400 Bad Request`  | Campos faltando ou tipos inválidos    |
| `401 Unauthorized` | Credenciais inválidas                 |
| `404 Not Found`    | Usuário não encontrado                |

**Exemplo de resposta (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> O token expira em **1 dia**. Envie-o nas rotas protegidas no header:
>
> ```
> Authorization: Bearer <token>
> ```

---

## 🏫 Turmas — `/api/turmas`

---

### GET /api/turmas

🔓 **Acesso:** Público

Retorna a lista de todas as turmas cadastradas. **Não requer autenticação.**

**Respostas:**

| Status   | Descrição                             |
| -------- | ------------------------------------- |
| `200 OK` | Lista de turmas retornada com sucesso |

**Exemplo de resposta (200):**

```json
[
  {
    "id": "uuid-da-turma",
    "disciplina": "Programação Web",
    "turno": "11",
    "professor": "Prof. Carlos",
    "alunos": ["uuid-aluno-1", "uuid-aluno-2"]
  }
]
```

---

### POST /api/turmas

👑 **Acesso:** Requer autenticação como `admin`

Cria uma nova turma. Apenas usuários com papel `admin` podem acessar esta rota.

**Headers:**

```
Authorization: Bearer <token-admin>
```

**Request Body:**

```json
{
  "disciplina": "Programação Web",
  "turno": "11",
  "professor": "Prof. Carlos"
}
```

> **Campo `turno`:** Deve ser um dos códigos válidos:
> `11`, `12`, `13`, `21`, `22`, `23`, `31`, `32`, `33`, `41`, `42`, `43`, `51`, `52`, `53`, `61`, `62`, `63`, `71`, `72`, `73`

**Respostas:**

| Status             | Descrição                         |
| ------------------ | --------------------------------- |
| `201 Created`      | Turma criada com sucesso          |
| `400 Bad Request`  | Dados inválidos ou turno inválido |
| `401 Unauthorized` | Token ausente ou inválido         |
| `403 Forbidden`    | Usuário não é admin               |

**Exemplo de resposta (201):**

```json
{
  "id": "uuid-da-turma",
  "disciplina": "Programação Web",
  "turno": "11",
  "professor": "Prof. Carlos",
  "alunos": []
}
```

---

### POST /api/turmas/:idTurma/add-aluno

🔑 **Acesso:** Requer autenticação como `aluno`

Matricula o aluno autenticado em uma turma. O ID do aluno é extraído automaticamente do token JWT — o aluno se matricula em seu próprio nome. Apenas usuários com papel `aluno` podem usar esta rota.

**Headers:**

```
Authorization: Bearer <token-aluno>
```

**URL Params:**

| Parâmetro | Tipo            | Descrição                   |
| --------- | --------------- | --------------------------- |
| `idTurma` | `string` (UUID) | ID da turma a se matricular |

**Respostas:**

| Status             | Descrição                                                    |
| ------------------ | ------------------------------------------------------------ |
| `200 OK`           | Aluno matriculado com sucesso                                |
| `400 Bad Request`  | Aluno já está matriculado nesta turma                        |
| `401 Unauthorized` | Token ausente ou inválido                                    |
| `403 Forbidden`    | Usuário não tem papel `aluno` (admin não pode se matricular) |
| `404 Not Found`    | Turma não encontrada                                         |

**Exemplo de resposta (200):**

```json
{
  "id": "uuid-da-turma",
  "disciplina": "Programação Web",
  "turno": "11",
  "professor": "Prof. Carlos",
  "alunos": ["uuid-do-aluno"]
}
```

---

## 👥 Gerenciar Usuários — `/manage-users`

> **⚠️ Todas as rotas deste grupo exigem autenticação como `admin`.**
>
> O acesso admin inicial deve ser configurado no arquivo `.env` do projeto:
>
> ```env
> NAME_USER_ADMIN=admin
> EMAIL_USER_ADMIN=admin@example.com
> PASSWORD_USER_ADMIN=senhaSegura123
> ```
>
> Este usuário é criado automaticamente ao iniciar o servidor.

---

### GET /manage-users

👑 **Acesso:** Requer autenticação como `admin`

Retorna a lista de todos os usuários cadastrados no sistema.

**Headers:**

```
Authorization: Bearer <token-admin>
```

**Respostas:**

| Status             | Descrição                               |
| ------------------ | --------------------------------------- |
| `200 OK`           | Lista de usuários retornada com sucesso |
| `401 Unauthorized` | Token ausente ou inválido               |
| `403 Forbidden`    | Usuário não é admin                     |

**Exemplo de resposta (200):**

```json
[
  {
    "id": "uuid-do-usuario",
    "name": "João Silva",
    "email": "joao@example.com",
    "role": "aluno"
  },
  {
    "id": "uuid-do-admin",
    "name": "admin",
    "email": "admin@example.com",
    "role": "admin"
  }
]
```

---

### POST /manage-users

👑 **Acesso:** Requer autenticação como `admin`

Cria um novo usuário com papel definido — `admin` ou `aluno`. Esta é a **única forma** de criar um usuário com papel `admin` (o registro público `/auth/register` sempre cria usuários com papel `aluno`).

**Headers:**

```
Authorization: Bearer <token-admin>
```

**Request Body:**

```json
{
  "name": "Novo Admin",
  "email": "novoadmin@example.com",
  "password": "senhaSegura456",
  "role": "admin"
}
```

> **Campo `role`:** Deve ser `"admin"` ou `"aluno"`.

**Respostas:**

| Status             | Descrição                                                 |
| ------------------ | --------------------------------------------------------- |
| `201 Created`      | Usuário criado com sucesso                                |
| `400 Bad Request`  | E-mail já cadastrado                                      |
| `401 Unauthorized` | Campos faltando, role inválida, ou token ausente/inválido |
| `403 Forbidden`    | Usuário não é admin                                       |

**Exemplo de resposta (201):**

```json
{
  "id": "uuid-gerado",
  "name": "Novo Admin",
  "email": "novoadmin@example.com",
  "role": "admin"
}
```

---

## 🔄 Fluxo de Uso Resumido

```
1. Configurar .env com credenciais do admin inicial
2. Iniciar o servidor → admin é criado automaticamente
3. Admin faz login em POST /auth/login → obtém token
4. Admin cria turmas via POST /api/turmas
5. Admin pode criar outros usuários via POST /manage-users
6. Alunos se registram via POST /auth/register
7. Alunos fazem login em POST /auth/login → obtém token
8. Alunos se matriculam via POST /api/turmas/:idTurma/add-aluno
9. Qualquer um pode listar turmas via GET /api/turmas
```
