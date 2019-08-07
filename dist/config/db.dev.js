"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const timezone = 'America/Mexico_City';
const momentTz = moment_timezone_1.default.tz.setDefault(timezone);
exports._CONFIG = {
    database: 'simplenote' || process.env.DATABASE,
    username: 'postgres' || process.env.USERNAME,
    password: '123456789' || process.env.PASSWORD,
    host: 'localhost' || process.env.HOST,
    port: 5432,
    dialect: 'postgres',
    timezone: timezone,
    pool: {
        max: 40,
        min: 1,
        idle: 10000
    },
    logging: false
};
