export const environment = {
    PORT: <any>process.env.PORT | 2405,
    ENV: <string>process.env.NODE_ENV,
    LOGS: <string>process.env.LOGS,
    DATEFORMAT: 'YYYY-MM-DD HH:mm:ss',
    fileSizeMax: 25,
    database: {
        database: <string>process.env.DATABASE,
        username: <string>process.env.USERNAME,
        password: <string>process.env.PASSWORD,
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
}