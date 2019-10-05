"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    PORT: process.env.PORT,
    ENV: process.env.NODE_ENV,
    LOGS: process.env.LOGS,
    DATEFORMAT: 'YYYY-MM-DD HH:mm:ss',
    fileSizeMax: 25,
    database: {
        database: process.env.DATABASE,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        port: 5432,
        dialect: 'postgres',
        timezone: 'America/Mexico_City',
        pool: {
            max: 40,
            min: 1,
            idle: 10000
        },
        logging: false
    },
    STORAGE: 'C:/Apache24/htdocs/sidie.pre.gob/storage/informacion/'
};
