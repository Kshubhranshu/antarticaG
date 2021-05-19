const config = require('../common/appConfig');
const { Pool } = require('pg');

const db = new Pool({
    user: config.DB_USER,
    host: config.DB_HOST,
    database: config.DB_DATABASE,
    password: config.DB_PASSWORD,
    port: config.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

db.on('error', (err, client) => {
    console.error(new Date(), 'Unexpected DB error on idle client --->>> ', err, client);
});

module.exports = {
    db
}