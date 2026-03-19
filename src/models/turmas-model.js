const turmas = [
  {
    id: "1",
    disciplina: "Matemática",
    turno: "33",
    professor: "Prof. João",
    alunos: [],
  },
];

module.exports = {
  findAll: () => turmas,

  findById: (id) => {
    return turmas.find((turma) => turma.id === id);
  },

  create: (turma) => {
    const novaTurma = {
      id: crypto.randomUUID(),
      disciplina: turma.disciplina,
      turno: turma.turno,
      professor: turma.professor,
      alunos: [],
    };

    turmas.push(novaTurma);

    return novaTurma;
  },

  addAluno: (turma, alunoId) => {
    turma.alunos.push(alunoId);
    return turma;
  },
};
