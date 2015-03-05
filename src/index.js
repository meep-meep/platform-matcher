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
    'ie': function(ua) {
        return ua.isIE;
    },
    'windows': function(ua) {
        return ua.isWindows;
    },
    'linux': function(ua) {
        return ua.isLinux;
    }
};


module.exports = function(constraints, ua) {
    return constraints.every(function(constraint) {
        return matchers[constraint.toLowerCase()](ua);
    });
};
