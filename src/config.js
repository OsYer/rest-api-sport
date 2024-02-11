import { config } from "dotenv";
config();

export default {
  port: process.env.PORT || 3001,
  dbUser: process.env.DB_USER || "carlos",
  dbPassword: process.env.DB_PASSWORD || "carlos",
  dbServer: process.env.DB_SERVER || "localhost",
  dbDatabase: process.env.DB_DATABASE || "SportGYM",
};
