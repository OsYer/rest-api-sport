import { config } from "dotenv";
config();

export default {
  port: process.env.PORT || 3001,
  dbUser: process.env.DB_USER || "sport_admin",
  dbPassword: process.env.DB_PASSWORD || "Du3oUnSSoViOjsL",
  dbServer: process.env.DB_SERVER || "sportgymcenterserver.database.windows.net",
  dbDatabase: process.env.DB_DATABASE || "SportGYM",
};
