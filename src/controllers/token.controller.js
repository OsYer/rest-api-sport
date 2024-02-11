import { getConnection, sql } from "../database";
import { querysToken } from "../database/querys";

export const createNewUserToken = async (req, res) => {
  const { Id, recovery_code } = req.body;

  if (recovery_code == null || recovery_code === '') {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    const existingToken = await getUserTokenById(Id);

    if (existingToken && existingToken.CodigoRecuperacion) {
      console.log(existingToken)
      console.log('existingToken ', existingToken.CodigoRecuperacion)
      console.log('newToken ', recovery_code)
      await updateTokenById(Id, recovery_code);
    } else {
      await pool
        .request()
        .input("IdUser", sql.Int, Id)
        .input("recovery_code", sql.VarChar, recovery_code)
        .query(querysToken.addNewUserToken);
        console.log('newToken ', recovery_code)
    }

    res.json({ Id, recovery_code});
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


export const validateToken = async (req, res) => {
  const { id, token } = req.body;

  try {
    const user = await getUserTokenById(id);
    if (!user || user.CodigoRecuperacion !== token) {
      return res.status(401).json({ msg: 'Token inválido' });
    }

    await deleteTokenById(id);

    res.status(200).json({ msg: 'Token válido y registro eliminado' });

  } catch (error) {
    console.log("500")
    res.status(500).json({ msg: 'Error al validar el token', error: error.message });
  }
};


export const getUserTokenById = async (id) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdUser", id)
      .query(querysToken.getUserToken);

    if (result.recordset && result.recordset.length > 0) {
      return result.recordset[0];
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};


export const updateTokenById = async (Id, token) => {
  if (Id == null || token == null || Id === '' || token === '') {
    throw new Error("Bad Request. Please provide valid ID and token");
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("IdUser", Id)
      .input("recovery_code", sql.VarChar, token)
      .query(querysToken.updateTokenById);

    console.log("Update successful");
  } catch (error) {
    console.error("Error updating token:", error.message);
    throw error;
  }
};

export const deleteTokenById = async (id) => {

  if (id == null || id === '') {
    return res.status(400).json({ msg: "Bad Request. Please provide a user ID" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("IdUser", sql.Int, id)
      .query(querysToken.deleteTokenById);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Token not found for the provided user ID" });
    }
    console.log("Token deleted successfully");
  } catch (error) {
    console.error("Error deleting token:", error.message);
    throw error;
  }
};
