'use strict';
const Server = require('./http/Server');
const { database } = require('./database/models');

class Application {
    constructor() {
        this.server = new Server();
    }

    async start() {

        if (database) {
            await database.authenticate();
        }
        await this.server.start();
    }
}

module.exports = Application;
