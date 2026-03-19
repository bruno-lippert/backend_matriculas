require("dotenv").config();
const uuid = require("uuid").v4;
const bcrypt = require("bcrypt");

const users = [
  {
    id: "1",
    name: process.env.NAME_USER_ADMIN,
    email: process.env.EMAIL_USER_ADMIN,
    password: bcrypt.hashSync(process.env.PASSWORD_USER_ADMIN, 10),
    role: "admin",
  },
];

module.exports = {
  findAll: () =>
    users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    }),

  findById: (id) => {
    return users.find((user) => user.id === id);
  },

  findByEmail: (email) => {
    return users.find((user) => user.email === email);
  },

  register: (user) => {
    const newUser = {
      id: uuid(),
      name: user.name,
      email: user.email,
      password: bcrypt.hashSync(user.password, 10),
      role: "aluno",
    };

    users.push(newUser);

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
  },

  createByAdmin: (user) => {
    const newUser = {
      id: uuid(),
      name: user.name,
      email: user.email,
      password: bcrypt.hashSync(user.password, 10),
      role: user.role,
    };

    users.push(newUser);

    return newUser;
  },

  delete: (id) => {
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) return null;

    const [deletedUser] = users.splice(userIndex, 1);

    return deletedUser;
  },
};
