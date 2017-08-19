define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var RollbarAppender = function () {
        function RollbarAppender() {
            _classCallCheck(this, RollbarAppender);
        }

        RollbarAppender.prototype.debug = function debug(logger) {
            for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                rest[_key - 1] = arguments[_key];
            }

            var mainArgs = rest[0];
            this.getRollbar().debug('DEBUG [' + logger.id + ']: ' + mainArgs, this._formatRest(rest));
        };

        RollbarAppender.prototype.info = function info(logger) {
            for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                rest[_key2 - 1] = arguments[_key2];
            }

            var mainArgs = rest[0];
            this.getRollbar().info('INFO [' + logger.id + ']  ' + mainArgs, this._formatRest(rest));
        };

        RollbarAppender.prototype.warn = function warn(logger) {
            for (var _len3 = arguments.length, rest = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                rest[_key3 - 1] = arguments[_key3];
            }

            var mainArgs = rest[0];
            this.getRollbar().warning('WARN [' + logger.id + '] ' + mainArgs, this._formatRest(rest));
        };

        RollbarAppender.prototype.error = function error(logger) {
            for (var _len4 = arguments.length, rest = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                rest[_key4 - 1] = arguments[_key4];
            }

            var mainArgs = rest[0];
            this.getRollbar().error('ERROR [' + logger.id + ']  ' + mainArgs, this._formatRest(rest));
        };

        RollbarAppender.prototype._formatRest = function _formatRest(rest) {
            try {
                return JSON.stingify({ extra: rest.slice(1) });
            } catch (e) {
                return undefined;
            }
        };

        RollbarAppender.prototype.getRollbar = function getRollbar() {
            if (!window.Rollbar) {
                if (console.warn) {
                    console.warn('Rollbar is not defined');
                }

                return {
                    debug: function debug() {},
                    info: function info() {},
                    warning: function warning() {},
                    error: function error() {}
                };
            }

            return window.Rollbar;
        };

        return RollbarAppender;
    }();

    exports.default = RollbarAppender;
});