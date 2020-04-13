const localeService = require('../services/LocaleService');

/*
* Http response model for helping with controller's responses.
*
* @author yinfante
*/
class BaseController {

    static responseOK({ headers, body }) {
        return { status: 200, headers, body };
    }

    static responseNotAuthorized() {
        return {
            status: 401, headers: null, body: { msg: localeService.translate('NOT_AUTH'), data: {} }
        };
    }

    static responseInternalError() {
        return {
            status: 500, headers: null, body: { msg: localeService.translate('SERVER_ERROR'), data: {} }
        };
    }

    static responseBadRequest() {
        return {
            status: 409, headers: null, body: { msg: 'Conflict', data: {} }
        };
    }

}

module.exports = BaseController;
