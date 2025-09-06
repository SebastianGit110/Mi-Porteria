import { Router } from "express";
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

export default router;
