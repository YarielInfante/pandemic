const Router = require('express-promise-router');
const config = require('../../../config');
const statusMonitor = require('express-status-monitor');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const controllerRoute = require('../util/createControllerRoutes');
const loggerMiddleware = require('../logging/loggerMiddleware');


const router = new Router();

if (config.env === 'development') {
    router.use(statusMonitor());
}

if (config.env !== 'test') {
    router.use(loggerMiddleware());
}

const apiRouter = Router();

apiRouter
    .use(cors())
    .use(compression())
    .use(bodyParser.json());


/*
 * Add your API routes here
 *
 * You can use the `route's controllers` helper like this:
 * apiRouter.use('/users', controllerRoute(routeFileName))
 *
 * The `controllerRoute` is relative to the `src/routes` folder
 */

apiRouter.use('/country', controllerRoute('CountryRoute'));

router.use('/api/v1', apiRouter);

router.get('/api', (req, res) => res.send('working!'));

module.exports = router;
