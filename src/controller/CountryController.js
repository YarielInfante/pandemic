const BaseController = require('./BaseController');

class CountryController extends BaseController {

    static getAll() {
        return this.responseOK({});
    }


}

module.exports = CountryController;
