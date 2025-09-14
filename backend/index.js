import express from "express";
import cors from "cors";
import dataRoutes from "./routes/data.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json()); // Permite procesar los datos json del cliente
app.use(cors());
app.use(dataRoutes);

console.log("Estoy en ", __dirname);
console.log("ESTOY EN 2:", path.join(__dirname, "..", "..", "..", "uploads"));
console.log("ESTOY EN 3:", path.join(__dirname, "..", "uploads"));

// Prod
// app.use(
//   "/uploads",
//   express.static(path.join(__dirname, "..", "..", "..", "uploads"))
// );

// Dev
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});
