const Router = require('express-promise-router');
const countryController = require('../../controller/CountryController');


class CountryRoute {

    get router() {
        const router = new Router();

        router.get('/', this.getAll);

        return router;
    }


    async getAll(req, res, next) {

        try {

            const httpResponse = await countryController.getAll();

            if (httpResponse.headers) {
                httpResponse.headers.forEach(header => {
                    res.setHeader(header.name, header.value);
                });
            }

            res.statusCode = httpResponse.status;
            res.send(httpResponse.body);


        } catch (e) {
            next(e);
        }

    }
}


module.exports = CountryRoute;
