const express = require('express');
const { web, mapConfig, imageConfig } = require('../../config');
const routes = require('./routes');
const errorHandler = require('./errors/errorHandler');
const logger = require('../../config/logging/logger');

class Server {

    constructor() {
        this.express = express();
        this.express.disable('x-powered-by');
        this.express.use(routes);
        this.express.use(errorHandler);
    }

    start() {

        this.express.get('/', (req, res) => res.send('Pandemic API'));

        return new Promise((resolve) => {
            const http = this.express
                .listen(web.port, () => {
                    const { port } = http.address();
                    logger.info(`[p ${process.pid}] Listening at port ${port}`);
                    resolve();
                });
        });
    }
}

module.exports = Server;
