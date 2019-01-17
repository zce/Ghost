var should = require('should'),
    sinon = require('sinon'),

    // Thing we are testing
    redirectAdminUrls = require('../../../../server/web/admin/middleware')[0],

    sandbox = sinon.sandbox.create();

describe('Admin App', function () {
    afterEach(function () {
        sandbox.restore();
    });

    describe('middleware', function () {
        describe('redirectAdminUrls', function () {
            var req, res, next;
            // Input: req.originalUrl
            // Output: either next or res.redirect are called
            beforeEach(function () {
                req = {};
                res = {};
                next = sandbox.stub();
                res.redirect = sandbox.stub();
            });

            it('should redirect a url which starts with reborn', function () {
                req.originalUrl = '/reborn/x';

                redirectAdminUrls(req, res, next);

                next.called.should.be.false();
                res.redirect.called.should.be.true();
                res.redirect.calledWith('/reborn/#/x').should.be.true();
            });

            it('should not redirect /reborn/ on its owh', function () {
                req.originalUrl = '/reborn/';

                redirectAdminUrls(req, res, next);

                next.called.should.be.true();
                res.redirect.called.should.be.false();
            });

            it('should not redirect url that has no slash', function () {
                req.originalUrl = 'reborn/x';

                redirectAdminUrls(req, res, next);

                next.called.should.be.true();
                res.redirect.called.should.be.false();
            });

            it('should not redirect url that starts with something other than /reborn/', function () {
                req.originalUrl = 'x/reborn/x';

                redirectAdminUrls(req, res, next);

                next.called.should.be.true();
                res.redirect.called.should.be.false();
            });
        });
    });
});
