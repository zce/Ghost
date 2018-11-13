var path = require('path'),
    helpers = require('../../helpers/register'),
    common = require('../../lib/common'),
    themeHelpers;

module.exports = function registerThemeHelpers(themePath) {
    try {
        themeHelpers = require(path.join(themePath, 'helpers.js'));
        themeHelpers({
            register: helpers.registerThemeHelper.bind(helpers),
            registerAsync: helpers.registerAsyncThemeHelper.bind(helpers)
        });
    } catch (err) {
        console.log(err)
        // theme helpers not found
        if (err.code === 'MODULE_NOT_FOUND') return false;
        // theme helpers is invalid
        throw new common.errors.ThemeValidationError({
            message: common.i18n.t('errors.api.themes.invalidTheme'),
            errorDetails: err,
            context: registerThemeHelpers
        });
    }
}
