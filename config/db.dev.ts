import { ISequelizeConfig } from "sequelize-typescript";
import moment from 'moment-timezone';
const timezone = 'America/Mexico_City';
const momentTz = moment.tz.setDefault(timezone);

export const _CONFIG: ISequelizeConfig = {
    database: 'simplenote',
    username: 'postgres',
    password: '123456789',
    host: 'localhost',
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