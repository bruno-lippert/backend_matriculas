require("dotenv").config();
const users = require("../models/users-model");

module.exports = {
  // GET /manage-users/users
  getAll: (req, res) => {
    res.json(users.findAll());
  },

  // POST /manage-users/users
  create: (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      throw new HttpError(401, "All fields are required");
    }

    const allowedRoles = new Set(["admin", "aluno"]);
    if (!allowedRoles.has(role)) {
      throw new HttpError(401, "Role must be 'admin' or 'aluno'");
    }

    const userAlreadyExists = users.findByEmail(email);
    if (userAlreadyExists) {
      throw new HttpError(400, "User already exists");
    }

    const user = users.createByAdmin({ name, email, password, role });
    res.status(201).json(user);
  },
};
