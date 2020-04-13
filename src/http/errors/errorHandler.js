const Status = require('http-status');
const logger = require('../../../config/logging/logger');

/* istanbul ignore next */
module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars

    logger.error(err);

    const status = err.status || Status.INTERNAL_SERVER_ERROR;
    const msg = err.message || 'The server failed to handle this request';


    res.status(status).json({
        msg,
        data: {}
    });
};
