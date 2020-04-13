const path = require('path');
const logPath = path.join(__dirname, '../../logs/test.log');


module.exports = {
    web: {
        port: process.env.PORT || 3000
    },
    logging: {
        appenders:
        {
            cnd: { type: 'file', filename: logPath },
            cnd_console: { type: 'console' }
        },
        categories: { default: { appenders: ['cnd' ,'cnd_console'], level: 'debug' } }

    },
    SECRET_KEY: 'gbh',
    imageConfig: {
        imageStorePath: '/Users/yariel/cnd-api/images/',
        imageBaseUrl: 'http://localhost:3000/images/'
    },
    mapConfig: {
        mapImagesPath: '/Users/yariel/Downloads/map/',
        mapImagesBaseUrl: 'http://localhost:5000',
        mapVersion: '1',
        tileSize: 256,
        zoomLevel: 16,
        tileImageFormat: '.png',
    }
};
