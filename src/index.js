// import app from "./app";

// app.listen(app.get("port"));

// console.log("Server on port", app.get("port"));

import app from "./app";

const PORT = process.env.PORT || 3001; // Puerto por defecto 3001

app.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT}`);
});
