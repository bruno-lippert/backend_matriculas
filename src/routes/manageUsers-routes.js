const express = require("express");
const manageUsersRouter = express.Router();
const manageUsersController = require("../controllers/manageUsers-controller");
const authMiddleware = require("../middlewares/authMiddleware");

manageUsersRouter.get(
  "/",
  authMiddleware.ensureAuth,
  authMiddleware.ensureAdmin,
  manageUsersController.getAll,
);
manageUsersRouter.post(
  "/",
  authMiddleware.ensureAuth,
  authMiddleware.ensureAdmin,
  manageUsersController.create,
);

module.exports = manageUsersRouter;
