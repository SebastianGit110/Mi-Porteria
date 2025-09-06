import { pool } from "../db.js";

// Casas

// Retorna todas las casas existentes
export const getAllHouses = async (_, res) => {
  const [response] = await pool.query("SELECT * FROM casa");

  console.log(response);

  res.json(response);
};

// Crea una casa
export const createHouse = async (req, res) => {
  const { house_num, isStore, block } = req.body;

  try {
    const [existing] = await pool.query(
      "SELECT * FROM casa WHERE house_num = ?",
      [house_num]
    );

    console.log(existing);

    if (existing.length > 0) {
      return res.status(400).json({ message: "Número de casa ya existe" });
    }

    const [response] = await pool.query(
      `
      INSERT INTO casa (id, house_num, isStore, block)
      VALUES (UUID(), ?, ?, ?)`,
      [house_num, isStore, block]
    );

    res.json({
      message: "Casa creada exitosamente",
      success: true,
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "No se pudo registrar la casa",
      success: false,
      error: "Error al crear la casa",
    });
  }
};

// Elimina una casa por id
export const deleteHouseByNumber = async (req, res) => {
  try {
    const { id } = req.body;

    const [result] = await pool.query("DELETE FROM casa WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Casa no encontrada" });
    }

    return res.status(200).json({ message: "Casa eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la casa:", error);
    return res.status(500).json({ message: "Error al eliminar la casa" });
  }
};

// Actualizar una casa por su id
export const updateHouseById = async (req, res) => {
  const { id, isStore, block } = req.body;

  try {
    const [existing] = await pool.query("SELECT * FROM casa WHERE id = ?", [
      id,
    ]);
    if (existing.length === 0) {
      return res.status(404).json({ message: "Casa no encontrada" });
    }

    // No hay necesidad de hacer la consulta que busca si ya existe un numero de casa con el nuevo porque tenemos la restriccion UNIQUE en house_num de la casa

    await pool.query("UPDATE casa SET isStore = ?, block = ? WHERE id = ?", [
      isStore,
      block,
      id,
    ]);

    res.json({ message: "Casa actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error actualizando la casa" });
  }
};

// Residentes

// Retorna todos los residentes por id de la casa
export const getResidentsByHouseId = async (req, res) => {
  const { house_id } = req.params;
  console.log(house_id);

  const [response] = await pool.query(`
    SELECT co.id, c.house_num, co.name, co.last_name, co.phone, co.mail, co.resident_type
    FROM residentes co
    JOIN casa c ON co.house_id = c.id
    WHERE c.id = '${house_id}'`);

  console.log(response);

  res.json(response);
};

// Crea un residente en la casa con su id
export const createResident = async (req, res) => {
  const { house_id, name, last_name, phone, mail, resident_type } = req.body;

  try {
    // Verificar si ya existe un residente con mismo nombre, apellido y casa
    const [existing] = await pool.query(
      `SELECT * FROM residentes WHERE house_id = ? AND name = ? AND last_name = ?`,
      [house_id, name, last_name]
    );

    console.log(existing);

    if (existing.length > 0) {
      return res
        .status(409)
        .json({ message: "El residente ya existe en esta casa" });
    }

    // Insertar nuevo residente
    await pool.query(
      `INSERT INTO residentes (id, house_id, name, last_name, phone, mail, resident_type)
      VALUES (UUID(), ?, ?, ?, ?, ?, ?)`,
      [house_id, name, last_name, phone, mail, resident_type]
    );

    res.status(201).json({ message: "Residente registrado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar residente" });
  }
};

// Elimina un residente por su id
export const deleteResidentById = async (req, res) => {
  try {
    const { id } = req.body;

    const [result] = await pool.query("DELETE FROM residentes WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Residente no encontrado" });
    }

    return res
      .status(200)
      .json({ message: "Residente eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el residente:", error);
    return res.status(500).json({ message: "Error al eliminar el residente" });
  }
};

// Actualizar un residente por su id
export const updateResidentById = async (req, res) => {
  const { id, name, last_name, phone, mail, resident_type } = req.body;

  try {
    const [existing] = await pool.query(
      "SELECT * FROM residentes WHERE id = ?",
      [id]
    );
    if (existing.length === 0) {
      return res.status(404).json({ message: "Residente no encontrado" });
    }

    await pool.query(
      "UPDATE residentes SET name = ?, last_name = ?, phone = ?, mail = ?, resident_type = ? WHERE id = ?",
      [name, last_name, phone, mail, resident_type, id]
    );

    res.json({ message: "Residente actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error actualizando residente" });
  }
};

// Parqueadero

// Obtiene todos los parqueaderos
export const getAllParkings = async (req, res) => {
  try {
    const [response] = await pool.query(`
      SELECT 
        co.id, 
        p.house_num, 
        co.type, 
        co.license, 
        co.state
      FROM parqueadero co
      JOIN casa p ON co.house_id = p.id
    `);

    console.log(response);
    res.json(response);
  } catch (error) {
    console.error("Error al obtener los parqueaderos:", error);
    res.status(500).json({ error: "Error al obtener los parqueaderos" });
  }
};

// Registra un nuevo parqueadero
export const createParking = async (req, res) => {
  try {
    const { house_num, type, license, state } = req.body;

    // Verifica si la casa existe
    const [existing] = await pool.query(
      "SELECT * FROM casa WHERE house_num = ?",
      [house_num]
    );

    if (existing.length === 0) {
      res.status(401).json({ message: "La casa no está registrada" });
    }

    await pool.query(
      `
      INSERT INTO parqueadero (id, house_id, type, license, state)
      VALUES (
        UUID(),
        (SELECT id FROM casa WHERE house_num = ?),
        ?, ?, ?
      );
    `,
      [house_num, type, license, state]
    );

    res.status(201).json({ message: "Parqueadero creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el parqueadero" });
  }
};

// Elimina un parqueadero por su id
export const deleteParkingById = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM parqueadero WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Parqueadero no encontrado" });
    }

    return res
      .status(200)
      .json({ message: "Parqueadero eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el prqueadero:", error);
    return res.status(500).json({ message: "Error al eliminar el prqueadero" });
  }
};

// Actualizar un residente por su id
export const updateParkingById = async (req, res) => {
  const { id, type, license, state } = req.body;

  try {
    const [existing] = await pool.query(
      "SELECT * FROM parqueadero WHERE id = ?",
      [id]
    );
    if (existing.length === 0) {
      return res.status(404).json({ message: "Parqueadero no encontrado" });
    }

    await pool.query(
      "UPDATE parqueadero SET type = ?, license = ?, state = ? WHERE id = ?",
      [type, license, state, id]
    );

    res.json({ message: "Parqueadero actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error actualizando parqueadero" });
  }
};

// Visitantes

// Obtiene todos los registros de las visitas
export const getAllVisits = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        vi.id,
        vi.state,
        vi.vehicle,
        vi.photo,
        vi.description,
        c.house_num
      FROM visitantes vi
      JOIN casa c ON vi.house_id = c.id
    `);

    const result = rows.map((row) => ({
      ...row,
      state: row.state ? JSON.parse(row.state) : null,
      vehicle: row.vehicle ? JSON.parse(row.vehicle) : null,
    }));

    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las visitas" });
  }
};
