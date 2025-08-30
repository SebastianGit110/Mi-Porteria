import express from "express";
import cors from "cors";
import dataRoutes from "./routes/data.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json()); // Permite procesar los datos json del cliente
app.use(cors());
app.use(dataRoutes);

app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});
