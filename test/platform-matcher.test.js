var expect = require('expect.js');
var mockery = require('mockery');
var platformMatcher;

var actions;


describe('platform-matcher', function() {
    before(function() {
        mockery.enable({useCleanCache: true});
        mockery.registerAllowable('../src/index');
    });

    after(function() {
        mockery.deregisterAllowable('../src/index');
        mockery.disable();
    });

    describe('match', function() {
        before(function() {
            mockery.registerMock('express-useragent', {parse: function(ua) {
                return {
                    isAndroid: true,
                    isChrome: true
                };
            }});
            platformMatcher = require('../src/index');
        });

        after(function() {
            mockery.deregisterMock('express-useragent');
        });

        it('should match a name with uppercase characters', function() {
            expect(platformMatcher.match(
                ['AndrOid'],
                {}
            )).to.be(true);
        });

        it('should match when the contraints are empty', function() {
            expect(platformMatcher.match(
                [],
                {}
            )).to.be(true);
        });

        it('should not match when a constraint is not satisfied', function() {
            expect(platformMatcher.match(
                ['ios'],
                {}
            )).to.be(false);
        });

        it('should not match when the constraint is unknown', function() {
            expect(platformMatcher.match(
                ['unknown constraint'],
                {}
            )).to.be(false);
        });
    });

    describe('isAKnownPlatform', function() {
        before(function() {
            mockery.resetCache();
            mockery.registerMock('express-useragent', {parse: function(ua) {
                return {
                    isAndroid: true,
                    isChrome: true
                };
            }});
            platformMatcher = require('../src/index');
        });

        after(function() {
            mockery.deregisterMock('express-useragent');
        });

        it('should return true when all given platforms are known', function() {
            expect(
                platformMatcher.isAKnownPlatform(['anDroid'])
            ).to.be(true);
        });

        it('should return false when some given platforms are unknown', function() {
            expect(
                platformMatcher.isAKnownPlatform(['anDroid', 'ios', 'unknown'])
            ).to.be(false);
        });
    });

    describe('getPlatformTags', function() {
        before(function() {
            mockery.resetCache();
            platformMatcher = require('../src/index');
        });

        before(function() {
            expect(platformMatcher.getPlatformTags).to.be.an(Array);
        });
    });
});
