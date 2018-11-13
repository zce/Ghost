var should = require('should'),
    sinon = require('sinon'),
    path = require('path'),

    registerThemeHelpers = require('../../../../server/services/themes/helpers'),

    sandbox = sinon.sandbox.create();

describe('Themes', function () {
    afterEach(function () {
        sandbox.restore();
    });

    describe('Helpers', function () {
        it('handles no helpers', function () {
            registerThemeHelpers(path.join('/fake/path')).should.be.false();
        });
    });
});
