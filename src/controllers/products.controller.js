import { getConnection, querys, sql } from "../database";

export const getProducts = async (req, res) => {
  try {
    const { categoriaId, marca, precioMin, precioMax } = req.query;
    let query = "SELECT * FROM Productos";

    const pool = await getConnection();
    const request = pool.request();

    if (categoriaId || marca || precioMin || precioMax) {
      query += " WHERE";
      let conditions = [];

      if (categoriaId) {
        console.log("dato categoria", categoriaId)
        conditions.push(` ID_categoria = ${categoriaId}`);
      }
      if (marca) {
        console.log("dato marca", marca)
        conditions.push(` ID_marca = ${marca}`);
      }
      if (precioMin) {
        console.log("dato precioMin", precioMin)
        conditions.push(` precio >= ${precioMin}`);
      }
      if (precioMax) {
        console.log("dato precioMax", precioMax)
        conditions.push(` precio <= ${precioMax}`);
      }

      query += conditions.join(" AND");
    }
    console.log("query", query)
    const result = await request.query(query);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getAllProductsWithRelations = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllProductsWithRelations);
    res.json(result.recordset);
  } catch (error) {
    console.log("error", error)
    res.status(500).send(error.message);
  }
};



export const createNewProduct = async (req, res) => {
  const { nombre, descripcion, ID_categoria, ID_subcategoria, ID_marca, precio, precioDescuento } = req.body;
  const { imagenUrl } = req.body;

  if (!nombre || !descripcion || !ID_categoria || !ID_subcategoria || !ID_marca || !precio || !precioDescuento || !imagenUrl) {
    return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input('nombre', sql.NVarChar, nombre)
      .input('descripcion', sql.NVarChar, descripcion)
      .input('ID_categoria', sql.Int, ID_categoria)
      .input('ID_subcategoria', sql.Int, ID_subcategoria)
      .input('ID_marca', sql.Int, ID_marca)
      .input('precio', sql.Decimal(10, 2), precio)
      .input('precioDescuento', sql.Decimal(10, 2), precioDescuento)
      .input('imagenUrl', sql.NVarChar, imagenUrl)
      .query(querys.addNewProduct);

    res.json({ nombre, descripcion, ID_categoria, ID_subcategoria, ID_marca, precio, precioDescuento, imagenUrl });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("IdProducto", req.params.id)
      .query(querys.getProductById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("IdProducto", req.params.id)
      .query(querys.deleteProduct);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getTotalProducts = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(querys.getTotalProducts);

    res.json(result.recordset[0][""]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateProductById = async (req, res) => {
  const { nombre, descripcion, ID_categoria, ID_subcategoria, ID_marca, precio, precioDescuento } = req.body;

  if (!nombre || !descripcion || !ID_categoria || !ID_subcategoria || !ID_marca || !precio || !precioDescuento) {
    return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input('nombre', sql.NVarChar, nombre)
      .input('descripcion', sql.NVarChar, descripcion)
      .input('ID_categoria', sql.Int, ID_categoria)
      .input('ID_subcategoria', sql.Int, ID_subcategoria)
      .input('ID_marca', sql.Int, ID_marca)
      .input('precio', sql.Decimal(10, 2), precio)
      .input('precioDescuento', sql.Decimal(10, 2), precioDescuento)
      .input('IdProducto', sql.Int, req.params.id)
      .query(querys.updateProductById);

    res.json({ nombre, descripcion, ID_categoria, ID_subcategoria, ID_marca, precio, precioDescuento });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
