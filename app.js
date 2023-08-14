import express from "express";
import morgan from "morgan";
import cors from "cors";

// імпорт роутів для роботи з маршрутами
import { router as contactsRouter } from "./routes/api/contacts.js";
import { authRouter } from "./routes/api/auth.js";

const logger = morgan;

// створення веб-серверу
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

app.use("/api/auth", authRouter);

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
