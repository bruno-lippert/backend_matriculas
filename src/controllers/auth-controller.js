require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const HttpError = require("../errors/HttpError");
const usersModel = require("../models/users-model");

module.exports = {
  // POST /auth/register
  register: (req, res) => {
    const { name, email, password } = req.body;

    // Verificar se os dados estão corretos
    if (!name || !email || !password) {
      throw new HttpError(400, "Invalid data");
    }
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({ message: "Invalid data types" });
    }

    // Verificar se o usuário já existe
    const userAlreadyExists = usersModel.findByEmail(email);
    if (userAlreadyExists) {
      throw new HttpError(400, "User already exists");
    }

    const user = usersModel.register({ name, email, password });
    res.status(201).json(user);
  },

  // POST /auth/login
  login: (req, res) => {
    const { email, password } = req.body;

    // Verificar se os dados estão corretos
    if (!email || !password) {
      throw new HttpError(400, "All fields are required");
    }
    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "Invalid data types" });
    }

    const user = usersModel.findByEmail(email);
    if (!user) {
      throw new HttpError(404, "User not found");
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      throw new HttpError(401, "Invalid credentials");
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1d" });

    return res.status(200).json({ token });
  },
};
