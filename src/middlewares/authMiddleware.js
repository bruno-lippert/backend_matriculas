require("dotenv").config();
const jwt = require("jsonwebtoken");
const users = require("../models/users-model");

module.exports = {
  ensureAuth: (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token not provided" });
    }
    const token = authHeader.split(" ")[1];

    try {
      const { id } = jwt.verify(token, process.env.JWT_KEY);
      const user = users.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  },

  ensureAdmin: (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token not provided" });
    }
    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    const user = users.findById(decodedToken.id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.role !== "admin") {
      res.status(403).json({ message: "Unauthorized" });
      res.redirect("/");
    }

    next();
  },
};
