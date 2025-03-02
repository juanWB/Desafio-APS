import express from "express";
import ClientRoutes from "./routes/ClientRoutes";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:3000" })); 

const port = 3001;

app.use(express.json());

app.use("/", ClientRoutes); 

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});