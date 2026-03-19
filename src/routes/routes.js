const express = require("express");
const router = express.Router();
const turmasRouter = require("./turmas-routes");
const authRouter = require("./auth-routes");
const manageUsersRouter = require("./manageUsers-routes");

router.use("/api/turmas", turmasRouter);
router.use("/auth", authRouter);
router.use("/manage-users", manageUsersRouter);

module.exports = router;
