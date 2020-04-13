const { i18n: i18nProvider } = require('../../config');

/**
 * LocaleService
 */
class LocaleService {


    /**
     *
     * @returns {string} The current locale code
     */
    static getCurrentLocale() {
        return i18nProvider.getLocale();
    }

    /**
     *
     * @returns string[] The list of available locale codes
     */
    static getLocales() {
        return i18nProvider.getLocales();
    }

    /**
     *
     * @param locale The locale to set. Must be from the list of available locales.
     */
    static setLocale(locale) {
        if (this.getLocales().indexOf(locale) !== -1) {
            i18nProvider.setLocale(locale);
        }
    }

    /**
     *
     * @param string String to translate
     * @param args Extra parameters
     * @returns {string} Translated string
     */
    static translate(string, args = undefined) {
        return i18nProvider.__(string, args);
    }

    /**
     *
     * @param phrase Object to translate
     * @param count The plural number
     * @returns {string} Translated string
     */
    static translatePlurals(phrase, count) {
        return i18nProvider.__n(phrase, count);
    }
}

module.exports = LocaleService;