const express = require("express");
const turmasRouter = express.Router();
const turmasController = require("../controllers/turmas-controller");
const authMiddleware = require("../middlewares/authMiddleware");

turmasRouter.get("/", turmasController.getAll);
turmasRouter.post(
  "/",
  authMiddleware.ensureAuth,
  authMiddleware.ensureAdmin,
  turmasController.create,
);
turmasRouter.post(
  "/:idTurma/add-aluno",
  authMiddleware.ensureAuth,
  turmasController.addAluno,
);

module.exports = turmasRouter;
