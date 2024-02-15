export const querys = {
  getAllProducts: "SELECT * FROM Productos",
  getProductById: "SELECT * FROM Productos WHERE ID_producto = @IdProducto",
  addNewProduct: "INSERT INTO Productos (nombre, descripcion, precio, precioDescuento, existencias, ID_categoria, ID_subcategoria, ID_marca) VALUES (@nombre, @descripcion, @precio, @precioDescuento, @existencias, @ID_categoria, @ID_subcategoria, @ID_marca)",
  deleteProduct: "DELETE FROM Productos WHERE ID_producto = @IdProducto",
  getTotalProducts: "SELECT COUNT(*) FROM Productos",
  updateProductById: "UPDATE Productos SET nombre = @nombre, descripcion = @descripcion, precio = @precio, precioDescuento = @precioDescuento, existencias = @existencias, ID_categoria = @ID_categoria, ID_subcategoria = @ID_subcategoria, ID_marca = @ID_marca WHERE ID_producto = @IdProducto",
  getAllProductsWithRelations: `
  SELECT 
  P.ID_producto,
  P.nombre,
  P.descripcion,
  P.precio,
  P.precioDescuento,
  p.existencias,
  C.ID_categoria,
  C.nombre AS nombreCategoria,
  SC.ID_subcategoria,
  SC.nombre AS nombreSubcategoria,
  M.ID_marca,
  M.nombre AS nombreMarca
  FROM 
  Productos P
  INNER JOIN 
    CategoriasProductos C ON P.ID_categoria = C.ID_categoria
  INNER JOIN 
    SubcategoriasProductos SC ON P.ID_subcategoria = SC.ID_subcategoria
  INNER JOIN 
    Marcas M ON P.ID_marca = M.ID_marca
  `
};


export const querysUsers = {
  getAllUsers: "SELECT * FROM Usuarios",
  getUserById: "SELECT * FROM Usuarios WHERE ID_usuario = @IdUsuario",
  addNewUser: "INSERT INTO Usuarios (nombre, primerApellido, segundoApellido, direccion, correoElectronico, contraseña, telefono, fechaNacimiento, genero) VALUES (@nombre, @primerApellido, @segundoApellido, @direccion, @correoElectronico, @contraseña, @telefono, @fechaNacimiento, @genero);",
  deleteUser: "DELETE FROM Usuarios WHERE ID_usuario = @IdUsuario",
  getTotalUsers: "SELECT COUNT(*) FROM Usuarios",
  updateUserById: "UPDATE Usuarios SET nombre = @nombre, primerApellido = @primerApellido, segundoApellido = @segundoApellido, direccion = @direccion, correoElectronico = @correoElectronico, contraseña = @contraseña, telefono = @telefono, fechaNacimiento = @fechaNacimiento, genero = @genero WHERE ID_usuario = @IdUsuario",
  getUserByEmail: "SELECT * FROM Usuarios WHERE correoElectronico = @correoElectronico;",
  getUserByTelephone: "SELECT * FROM Usuarios WHERE telefono = @telefono;",
  updatePasswordById: "UPDATE Usuarios SET contraseña = @contraseña WHERE ID_usuario = @IdUsuario;",
  login: "SELECT * FROM Usuarios WHERE correoElectronico = @correoElectronico AND contraseña = @contraseña;",
};


export const querysToken = {
  addNewUserToken: "INSERT INTO Tokens (ID_usuario, token, expiracionToken) VALUES (@IdUser, @token, DATEADD(MINUTE, 30, GETDATE()));",
  getUserToken: "SELECT * FROM Tokens WHERE ID_usuario = @IdUser;",
  updateTokenById: "UPDATE Tokens SET token = @token, expiracionToken = DATEADD(MINUTE, 30, GETDATE()) WHERE ID_usuario = @IdUser;",
  deleteTokenById: "DELETE FROM Tokens WHERE ID_usuario = @IdUser;"
};


export const querysCategoriasProductos = {
  getAllCategoriasProductos: "SELECT * FROM CategoriasProductos",
  getCategoriaProductoById: "SELECT * FROM CategoriasProductos WHERE ID_categoria = @IdCategoria",
  addNewCategoriaProducto: "INSERT INTO CategoriasProductos (nombre) VALUES (@nombre);",
  deleteCategoriaProducto: "DELETE FROM CategoriasProductos WHERE ID_categoria = @IdCategoria",
  getTotalCategoriasProductos: "SELECT COUNT(*) FROM CategoriasProductos",
  updateCategoriaProductoById: "UPDATE CategoriasProductos SET nombre = @nombre WHERE ID_categoria = @IdCategoria"
};

export const querysSubcategoriasProductos = {
  getAllSubcategoriasProductos: "SELECT * FROM SubcategoriasProductos",
  getSubcategoriaProductoById: "SELECT * FROM SubcategoriasProductos WHERE ID_subcategoria = @IdSubcategoria",
  addNewSubcategoriaProducto: "INSERT INTO SubcategoriasProductos (nombre, ID_categoria) VALUES (@nombre, @IdCategoria);",
  deleteSubcategoriaProducto: "DELETE FROM SubcategoriasProductos WHERE ID_subcategoria = @IdSubcategoria",
  getTotalSubcategoriasProductos: "SELECT COUNT(*) FROM SubcategoriasProductos",
  updateSubcategoriaProductoById: "UPDATE SubcategoriasProductos SET nombre = @nombre, ID_categoria = @IdCategoria WHERE ID_subcategoria = @IdSubcategoria",
  getCategoriasByID_categoria: "SELECT * FROM SubcategoriasProductos WHERE ID_categoria = @IdCategoria"
};

export const querysMarcas = {
  getAllMarcas: "SELECT * FROM Marcas",
  getMarcaById: "SELECT * FROM Marcas WHERE ID_marca = @IdMarca",
  addNewMarca: "INSERT INTO Marcas (nombre, ID_categoria) VALUES (@nombre, @IdCategoria);",
  deleteMarca: "DELETE FROM Marcas WHERE ID_marca = @IdMarca",
  getTotalMarcas: "SELECT COUNT(*) FROM Marcas",
  updateMarcaById: "UPDATE Marcas SET nombre = @nombre, ID_categoria = @IdCategoria WHERE ID_marca = @IdMarca",
  getMarcasByID_marca:"SELECT * FROM Marcas WHERE ID_categoria = @IdCategoria"
};
