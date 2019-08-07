import { ISequelizeConfig } from "sequelize-typescript";
import moment from 'moment-timezone';
const timezone = 'America/Mexico_City';
const momentTz = moment.tz.setDefault(timezone);

export const _CONFIG: ISequelizeConfig = {
    database: <string>process.env.DATABASE,
    username: <string>process.env.USERNAME,
    password: <string>process.env.PASSWORD,
    host: process.env.HOST,
    port: 5432,
    dialect: 'postgres',
    timezone: timezone,
    pool: {
        max: 40,
        min: 1,
        idle: 10000
    },
    logging: false
}