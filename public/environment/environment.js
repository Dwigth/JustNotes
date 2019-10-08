"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    PORT: process.env.PORT | 3000,
    ENV: process.env.NODE_ENV,
    LOGS: process.env.LOGS,
    DATEFORMAT: 'YYYY-MM-DD HH:mm:ss',
    fileSizeMax: 25,
    database: {
        database: 'simplenote',
        username: 'postgres',
        password: '123456789',
        host: '127.0.0.1',
        port: 5432,
        dialect: 'postgres',
        timezone: 'America/Mexico_City',
        pool: {
            max: 40,
            min: 1,
            idle: 10000
        },
        logging: false
    }
};
