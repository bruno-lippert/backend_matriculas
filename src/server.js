require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

app.use(router);

app.use((err, _, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Erro interno do backend";

  res.status(status).json({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
