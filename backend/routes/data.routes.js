import { Router } from "express";
import multer from "multer";
import fs from "node:fs";
import {
  getAllHouses,
  getResidentsByHouseId,
  createHouse,
  createResident,
  deleteHouseByNumber,
  deleteResidentById,
  updateHouseById,
  updateResidentById,
  getAllParkings,
  createParking,
  deleteParkingById,
  updateParkingById,
  getAllVisits,
} from "../controllers/data.controllers.js";

const router = Router();

const upload = multer({ dest: "uploads/" });

// Casas
router.get("/getAllHouses", getAllHouses);
router.post("/createHouse", createHouse);
router.delete("/deleteHouseByNumber", deleteHouseByNumber);
router.put("/updateHouseById", updateHouseById);

// Residentes
router.get("/getResidentsByHouseId/:house_id", getResidentsByHouseId);
router.post("/createResident", createResident);
router.delete("/deleteResidentById", deleteResidentById);
router.put("/updateResidentById", updateResidentById);

// Parqueadero
router.get("/getAllParkings", getAllParkings);
router.post("/createParking", createParking);
router.delete("/deleteParkingById/:id", deleteParkingById);
router.put("/updateParkingById", updateParkingById);

// Visitantes
router.get("/getAllVisits", getAllVisits);

// Imagenes
router.post("/images/single", upload.single("photo"), (req, res) => {
  try {
    console.log(req.file);
    const newPath = saveImage(req.file);

    console.log("NEWPATH", newPath);
    res.send("Termina");
  } catch (error) {
    console.log;
  }
});

const saveImage = (file) => {
  const newPath = `./uploads/${file.originalname}`;

  console.log(newPath);
  fs.renameSync(file.path, newPath);
  return newPath;
};

export default router;
