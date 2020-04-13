const Application = require('./src/Application');
const logger = require('./config/logging/logger');

new Application()
    .start()
    .catch((error) => {
        logger.error(error);
        process.exit();
    });
