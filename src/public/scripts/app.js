"use strict";
define('app', ['infra'], function() {
    require([
        'common/sharedConfig',
        'services/commonService',
        'services/utils',
        'scripts/pageModules/breadcrumb'
    ], function(SharedConfig) {
        const Application = Box.Application,
            CommonService = Application.getService('CommonService'),
            Utils = Application.getService('Utils'),
            $ = Application.getGlobal('jQuery');
            
        function appInit(pageModule) {
            CommonService.startAllModules(document, pageModule.path, () => {
                if (pageModule.el) {
                    pageModule.el.setAttribute("data-module", pageModule.name);
                }
            });


            CommonService.loadLazyModules();
        }

        // Load App Start

        let pageModule = CommonService.getPageModule(),
            dependencies = CommonService.getAllPageDependencies(pageModule);

        // Listener for all modules that are loaded and also for those modules that need to be loaded
        Application.on('message', CommonService.initializeCallbacks);

        require(dependencies, () => {
            if (document.readyState.toLowerCase() === 'interactive' || document.readyState.toLowerCase() === 'complete') {
                appInit(pageModule);
            } else {
                $(document).ready(() => {
                    appInit(pageModule);
                });
            }
        });
    });
});
