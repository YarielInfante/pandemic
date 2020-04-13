const path = require('path');
const logPath = path.join(__dirname, '../../logs/production.log');

module.exports = {
    web: {
        port: process.env.PORT
    },
    logging: {
        appenders:
        {
            pandemic: { type: 'file', filename: logPath },
            pandemic_console: { type: 'console' }
        },
        categories: { default: { appenders: ['pandemic', 'pandemic_console'], level: 'debug' } }

    }
};
