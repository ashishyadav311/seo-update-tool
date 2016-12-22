'use strict'
define('infra',[
    'jquery',
    't3',
    'promise',
    'bootstrap'
], function($,Box, es6Promise) {
	window.Box = Box;
    window.Promise = es6Promise.Promise;
});
