import express from "express";
import cors from "cors";
import models from "./models/index.js";
import mysql from "mysql2/promise";
import upload from "./routes/upload.js";

const app = express();
app.use(cors("*"));
app.use(express.json());
const port = 8091;

// Routes
app.use("/users", upload);
// Create database if doesn't exist
const connection = await mysql.createConnection({
  user: "root",
  password: "root",
});
await connection.query("CREATE DATABASE IF NOT EXISTS uploader");

// Listener
models.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Up and Running 🚀🚀 at http://localhost:${port}`);
  });
});
