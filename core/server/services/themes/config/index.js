var _ = require('lodash'),
    defaultConfig = require('./defaults');

module.exports.create = function configLoader(packageJson) {
    var config = _.cloneDeep(defaultConfig);

    if (packageJson && packageJson.hasOwnProperty('config')) {
        config = _.assign(config, packageJson.config);
    }

    return config;
};
