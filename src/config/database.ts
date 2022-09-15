import { Sequelize } from "sequelize"
import database from "./configDB";

export const db = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        dialect: "mysql"
    }
)