import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

const PORT = 8080;

app.use(express.json());

app.use(cors());

app.listen(PORT, () => {
  console.log(`Wappiorder is now running at: ${PORT}`);
});

app.use("/auth", authRouter);

app.use(errorMiddleware);
