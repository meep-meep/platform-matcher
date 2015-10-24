var useragent = require('express-useragent');


var matchers = {
    'android': function(ua) {
        return ua.isAndroid;
    },
    'chrome': function(ua) {
        return ua.isChrome;
    },
    'osx': function(ua) {
        return ua.isMac;
    },
    'desktop': function(ua) {
        return ua.isDesktop;
    },
    'mobile': function(ua) {
        return ua.isMobile;
    },
    'phone': function(ua) {
        return ua.isPhone;
    },
    'tablet': function(ua) {
        return ua.isTablet;
    },
    'safari': function(ua) {
        return ua.isSafari;
    },
    'ios': function(ua) {
        return ua.isiPhone || ua.isiPad || ua.isiPod;
    },
    'firefox': function(ua) {
        return ua.isFirefox;
    },
    'webkit': function(ua) {
        return ua.isChrome || ua.isSafari;
    },
    'ie8': function(ua) {
        return ua.isIE;
    },
    'ie9': function(ua) {
        return ua.isIE;
    },
    'ie': function(ua) {
        return ua.isIE;
    },
    'windows': function(ua) {
        return ua.isWindows;
    },
    'linux': function(ua) {
        return ua.isLinux;
    },
    'any': function() {
        return true;
    }
};


module.exports = {
    match: function(constraints, ua) {
        var parsedUa = useragent.parse(ua);
        return constraints.every(function(constraint) {
            constraint = constraint.toLowerCase();
            if(!matchers[constraint]) {
                return false;
            }
            return matchers[constraint](parsedUa);
        });
    },

    isAKnownPlatform: function(constraints) {
        return constraints.every(function(constraint) {
            return matchers[constraint.toLowerCase()];
        });
    },

    getPlatformTags: function() {
        return Object.keys(matchers);
    }
};
