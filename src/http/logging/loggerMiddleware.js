const morgan = require('morgan');
const LoggerStreamAdapter = require('../../../config/logging/LoggerStreamAdapter');
const logger = require('../../../config/logging/logger');

module.exports = () => {
    return morgan('dev', {
        stream: LoggerStreamAdapter.toStream(logger)
    });
};
