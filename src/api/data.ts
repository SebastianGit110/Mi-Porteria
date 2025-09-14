import axios from "axios";
import { IParqueaderoF, IVisitantesF } from "../types/Person";

// Casas

export const getAllHouses = async () =>
  await axios.get("http://localhost:3000/getAllHouses");

export const createHouse = async (data: {
  house_num: number | undefined;
  isStore: number | undefined;
  block: number | undefined;
}) =>
  await axios.post(`http://localhost:3000/createHouse`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const deleteHouseByNumber = async (data: { id: string }) =>
  await axios.delete(`http://localhost:3000/deleteHouseByNumber`, {
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const updateHouseById = async (data: {
  id: string | undefined;
  isStore: boolean | number | undefined;
  block: number | undefined;
}) =>
  await axios.put(`http://localhost:3000/updateHouseById`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

// Residentes

export const getResidentsByHouseId = async (house_id: string | undefined) =>
  await axios.get(`http://localhost:3000/getResidentsByHouseId/${house_id}`);

export const createResident = async (data: {
  house_id: string | undefined;
  name: string | undefined;
  last_name: string | undefined;
  phone: number | undefined;
  mail: string | undefined;
  resident_type: string | undefined;
}) =>
  await axios.post(`http://localhost:3000/createResident`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const deleteResidentById = async (data: { id: string }) =>
  await axios.delete(`http://localhost:3000/deleteResidentById`, {
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const updateResidentById = async (data: {
  id: string;
  name: string;
  last_name: string;
  phone: number;
  mail: string;
  resident_type: string;
}) =>
  await axios.put(`http://localhost:3000/updateResidentById`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

// Parqueadero

export const getAllParkings = async () =>
  await axios.get(`http://localhost:3000/getAllParkings`);

export const createParking = async (
  data: Omit<IParqueaderoF, "id" | "actions">
) =>
  await axios.post(`http://localhost:3000/createParking`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const deleteParkingById = async (id: string) =>
  await axios.delete(`http://localhost:3000/deleteParkingById/${id}`);

export const updateParkingById = async (
  data: Omit<IParqueaderoF, "actions" | "house_num">
) =>
  await axios.put(`http://localhost:3000/updateParkingById`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

// Visitantes

export const getAllVisits = async () =>
  await axios.get(`http://localhost:3000/getAllVisits`);

export const createVisits = async (data: Omit<IVisitantesF, "id">) =>
  await axios.post(`http://localhost:3000/createVisits`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const deleteVisitById = async (data: {
  id: string;
  photo: string | null;
}) =>
  await axios.delete(
    `http://localhost:3000/deleteVisitById/${data.id}/${data.photo}`
  );

export const updateVisitById = async (data: IVisitantesF) =>
  await axios.put(`http://localhost:3000/updateVisitById`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
