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
      return res.status(401).json({ message: "All fields are required" });
    }

    const allowedRoles = new Set(["admin", "aluno"]);
    if (!allowedRoles.has(role)) {
      return res
        .status(401)
        .json({ message: "Role must be 'admin' or 'aluno'" });
    }

    const userAlreadyExists = users.findByEmail(email);
    if (userAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = users.createByAdmin({ name, email, password, role });
    res.status(201).json(user);
  },
};
