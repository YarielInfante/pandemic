/* eslint-disable no-console */
const pm2 = require('pm2');

const instances = process.env.WEB_CONCURRENCY || -1;
const maxMemory = process.env.WEB_MEMORY || 512;

pm2.connect(() => {
    pm2.start({
        name: 'CND_API',
        script: 'index.js',
        instances: instances,
        max_memory_restart: `${maxMemory}M`,
        env: {
            NODE_ENV: 'production',
            NODE_PATH: '.'
        },
    }, (err) => {
        if (err) {
            return console.error('Error while launching applications', err.stack || err);
        }

        console.log('PM2 and application has been succesfully started');

    });
});
