const jwt = require("jsonwebtoken");
const users = require("../models/users-model");
const turmasModel = require("../models/turmas-model");
const HttpError = require("../errors/HttpError");

module.exports = {
  // GET /api/turmas
  getAll: (req, res) => {
    res.json(turmasModel.findAll());
  },

  // POST /api/turmas
  create: (req, res) => {
    const { disciplina, turno, professor } = req.body;

    const turnos = [
      "11",
      "12",
      "13",
      "21",
      "22",
      "23",
      "31",
      "32",
      "33",
      "41",
      "42",
      "43",
      "51",
      "52",
      "53",
      "61",
      "62",
      "63",
      "71",
      "72",
      "73",
    ];

    if (!turnos.includes(turno)) {
      throw new HttpError(400, "Turno inválido");
    }

    if (
      typeof disciplina !== "string" ||
      typeof turno !== "string" ||
      typeof professor !== "string"
    ) {
      throw new HttpError(400, "Dados inválidos");
    }

    const turma = turmasModel.create({ disciplina, turno, professor });
    res.status(201).json(turma);
  },

  // POST /api/turmas/:idTurma/add-aluno
  addAluno: (req, res) => {
    const { idTurma } = req.params;
    const user = req.user;

    if (users.findById(user.id).role !== "aluno") {
      throw new HttpError(403, "User must be a Student");
    }

    const turma = turmasModel.findById(idTurma);
    if (!turma) {
      throw new HttpError(404, "Class not found");
    }

    // valida se aluno ja esta na turma
    if (turma.alunos.includes(user.id)) {
      throw new HttpError(400, "Student is already enrolled in this class");
    }

    turmasModel.addAluno(turma, user.id);
    res.status(200).json(turma);
  },
};
