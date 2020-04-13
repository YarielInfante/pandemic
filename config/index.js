require('dotenv').config();

const fs = require('fs');
const path = require('path');

const ENV = process.env.NODE_ENV || 'development';

const envConfig = require(path.join(__dirname, 'environments', ENV));
const dbConfig = loadDbConfig();
const i18n = require('./i18n.config');


// wired up 
const config = Object.assign({
    [ENV]: true,
    env: ENV,
    db: dbConfig,
    i18n,
}, envConfig);

module.exports = config;

function loadDbConfig() {

    if (fs.existsSync(path.join(__dirname, './database.js'))) {
        return require('./database')[ENV];
    }
}
