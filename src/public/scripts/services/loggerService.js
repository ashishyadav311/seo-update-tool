"use strict";
define([], () => {
    const SERVICE_NAME = 'Logger';
    Box.Application.addService(SERVICE_NAME, () => {
        let aps = Array.prototype.slice,
            console = window.console,
            Logger_debug = {},
            Logger_callback,
            Logger_force_callback,
            Logger_level = 2,
            Logger_methods = ['error', 'warn', 'info', 'debug', 'log'],
            Logger_pass_methods = 'assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace'.split(' '),
            idx = Logger_pass_methods.length,
            Logger_logs = [];

        while (--idx >= 0) {
            (function(method) {
                Logger_debug[method] = function() {
                    Logger_level !== 0 && console && console[method] && console[method].apply(console, arguments);
                };
            })(Logger_pass_methods[idx]);
        }
        idx = Logger_methods.length;
        while (--idx >= 0) {
            (function(idx, level) {
                Logger_debug[level] = function() {
                    var args = aps.call(arguments),
                        logs = [level].concat(args);

                    Logger_logs.push(logs);
                    exec_callback(logs);

                    if (!console || !is_level(idx)) {
                        return;
                    }
                    console[level] ? console[level](args) : console.log(args);
                };
            })(idx, Logger_methods[idx]);
        }

        function exec_callback(args) {
            if (Logger_callback && (Logger_force_callback || !console || !console.log)) {
                Logger_callback.apply(window, args);
            }
        }

        function is_level(level) {
            return Logger_level > 0 ? Logger_level > level : Logger_methods.length + Logger_level <= level;
        }

        Logger_debug.setLevel = function(level) {
            Logger_level = typeof level === 'number' ? level : 9;
        };

        // Usage:
        //
        //  debug.setCallback( callback [, force ] [, limit ] )
        //
        // Arguments:
        //
        //  callback - (Function) The aforementioned callback function. The first
        //    argument is the logging level, and all subsequent arguments are those
        //    passed to the initial debug logging method.
        //  force - (Boolean) If false, log to console.log if available, otherwise
        //    callback. If true, log to both console.log and callback.
        //  limit - (Number) If specified, number of lines to limit initial scrollback
        //    to.

        Logger_debug.setCallback = function() {
            var args = aps.call(arguments),
                max = Logger_logs.length,
                i = max;

            Logger_callback = args.shift() || null;
            Logger_force_callback = typeof args[0] === 'boolean' ? args.shift() : false;

            i -= typeof args[0] === 'number' ? args.shift() : max;

            while (i < max) {
                exec_callback(Logger_logs[i++]);
            }
        };
        return Logger_debug;
    });

    return Box.Application.getService(SERVICE_NAME);
});
