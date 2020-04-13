const Log4js = require('log4js');
const { logging } = require('../../config');


Log4js.configure(logging);

const logger = Log4js.getLogger('pandemic');


module.exports = logger;
