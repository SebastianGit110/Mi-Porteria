import express from "express";
import multer from "multer";
import fs from "node:fs";
import cors from "cors";

const PORT = 4000;
const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

// Este endpoint funciona solo para una imagen a la vez y upload.single("photo") es el mideware e indica de donde se va a cargar la img e del campo "photo"
app.post("/images/single", upload.single("photo"), (req, res) => {
  try {
    console.log(req.file);
    saveImage(req.file);
    res.send("Termina");
  } catch (error) {
    console.log;
  }
});

// Este endpoint funciona para multiples imagenes, upload.array("photos", maxCantidadDeFotos)
app.post("/images/multi", upload.array("photos", 3), (req, res) => {
  req.files.map(saveImage); // Manda el file de cada elemento automaticamente a saveImage como si fuera .map(file => saveImage(file))
  res.send("Termina");
});

const saveImage = (file) => {
  // Esta sirve para ponerle un nombre personalizado desde el frontend
  // const newPath = `./uploads/${file.originalname}`; // Renombra la imagen creando el nuevo path

  // Le pone el nombre con el que viene y le agrega .png
  const newPath = `${file.path}.png`
  console.log(newPath)
  fs.renameSync(file.path, newPath); // Cambia de ubicacion la imagen
  return newPath;
};

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
