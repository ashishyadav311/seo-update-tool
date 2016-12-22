"use strict";
define(['services/utils'], (Utils) => {
    const SERVICE_NAME = 'CommonService';

    Box.Application.addService(SERVICE_NAME, (application) => {

        let loadedModuleMap = {},
            modulesBindedOnLoad = {},
            openedPopupCount = 0;

        const MODULE_LOADTIME_SELECTOR = 'data-loadOn',
            $ = application.getGlobal('jQuery'),
            Application = Box.Application;
        /**
         * Retrieve the names of modules that are present in DOM
         * @param {boolean} flag for getting lazy modules or normal modules, if true is passed returns array of lazy modules path.
         * @returns {array} Array of modules path.
         */
        function getModulesPath(lazyload, container = document) {
            const MODULE_SELECTOR = lazyload ? "data-lazyModule" : "data-module";
            let moduleElements = Box.DOM.queryAll(container, "[" + MODULE_SELECTOR + "]"),
                modulesPaths = [],
                moduleName, path;
            for (let i = 0; i < moduleElements.length; i++) {
                moduleName = moduleElements[i].getAttribute(MODULE_SELECTOR);
                path = 'modules/' + moduleName + '/scripts/index';
                if (path && lazyload) {
                    modulesPaths.push({
                        'loadOn': moduleElements[i].getAttribute(MODULE_LOADTIME_SELECTOR),
                        'name': moduleName
                    });
                } else if (path && !lazyload) {
                    modulesPaths.push(path);
                }
            }
            return modulesPaths;
        }

        function loadModule(data, type, container = document) {
            let dependencies = [],
                names = [],
                path;

            if (!Utils.isArray(data) && checkLazyModuleExist(data.name)) {
                dependencies.push('modules/' + data.name + '/scripts/index');
                names.push({
                    'name': data.name,
                    'loadId': data.loadId
                });
            } else {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].parent) {
                        path = 'modules/' + data[i].parent + '/submodules/' + data[i].name;
                    } else {
                        path = 'modules/' + data[i].name + '/scripts/index';
                    }
                    if (checkLazyModuleExist(data[i].name)) {
                        names.push({
                            'name': data[i].name,
                            'loadId': data[i].loadId
                        });
                        dependencies.push(path);
                    }
                }

            }
            require(dependencies, function() {
                const MODULE_SELECTOR = 'data-lazyModule';
                let modules, selector;
                for (let i = 0; i < names.length; i++) {
                    if (type == "event" && !names[i].loadId) {
                        selector = '[' + MODULE_SELECTOR + '=' + names[i].name + '][data-loadOn="event"]';
                    } else if (type == "event" && names[i].loadId) {
                        selector = '[' + MODULE_SELECTOR + '=' + names[i].name + '][data-loadOn="event"][id=' + names[i].loadId + ']';
                    } else {
                        selector = '[' + MODULE_SELECTOR + '=' + names[i].name + ']:not([data-loadOn="event"])';
                    }
                    modules = Box.DOM.queryAll(container, selector);
                    modules = modules ? modules : [];
                    let length = modules.length;
                    for (let j = 0; j < length; j++) {
                        $(modules[j]).attr('data-module', names[i].name);
                        Application.start(modules[j]);
                    }
                }
            });
        }

        function loadLazyModules(container = document) {
            let modulesDetails = getModulesPath(true, container);
            for (let i = 0; i < modulesDetails.length; i++) {
                if (modulesDetails[i].loadOn !== 'event') {
                    loadModule(modulesDetails[i], null, container);
                }
            }
        }

        function checkModuleLoaded(moduleName, id) {
            let keys, length;
            if (!loadedModuleMap[moduleName]) {
                return false;
            }
            if (id) {
                return loadedModuleMap[moduleName][id] ? true : false;
            }
            keys = Object.keys(loadedModuleMap[moduleName]);
            length = keys.length;
            if (length === 0) {
                return false;
            }
            for (let i = 0; i < length; i++) {
                if (!loadedModuleMap[moduleName][keys[i]]) {
                    return false;
                }
            }
            return true;
        }

        function setModuleLoaded(moduleName, id) {
            loadedModuleMap[moduleName] = loadedModuleMap[moduleName] ? loadedModuleMap[moduleName] : {};
            loadedModuleMap[moduleName][id] = true;
        }

        function getAllModules(includeLazyModule, el = document) {
            let modules = [],
                moduleElements = Box.DOM.queryAll(el, '[data-module]')

            moduleElements = includeLazyModule ? moduleElements.concat(Box.DOM.queryAll(el, '[data-lazyModule]')) : moduleElements;

            for (let i = 0; moduleElements && i < moduleElements.length; i++) {
                var name = moduleElements[i].getAttribute('data-module');
                if (!name && includeLazyModule) {
                    name = moduleElements[i].getAttribute('data-lazyModule');
                }
                if (name) {
                    modules.push(name);
                }
            }
            return modules;
        }

        function checkLazyModuleExist(name) {
            let el = Box.DOM.query(document, "[data-lazyModule='" + name + "']");
            return el ? true : false;
        }

        function initializeCallbacks(data) {
            data = data && data.data;
            let eventData = data.messageData;
            if (data.message == 'moduleLoaded') {
                if (!checkModuleLoaded(eventData.name, eventData.id)) {
                    setModuleLoaded(eventData.name, eventData.id);
                    if (typeof(modulesBindedOnLoad[eventData.name]) == 'function') {
                        modulesBindedOnLoad[eventData.name](eventData.id);
                    }
                }
            } else if (data.message == 'loadModule') {
                if (typeof eventData === "object" && !Utils.isArray(eventData) && eventData.loadAll && eventData.el) {
                    let el = Box.DOM.query(document, eventData.el);
                    startAllModules(el);
                    if (eventData.loadLazy) {
                        loadLazyModules(el);
                    }
                } else {
                    loadModule(eventData, 'event');
                }
            } else if (data.message == 'loadImages') {
                loadLazyImages(eventData.selector);
            }
        }

        function bindOnModuleLoad(moduleName, callback, ids) {
            modulesBindedOnLoad[moduleName] = callback;
            if (Utils.isArray(ids)) {
                let length = ids.length;
                for (let i = 0; i < length; i++) {
                    if (checkModuleLoaded(moduleName, ids[i])) {
                        callback(ids[i]);
                    }
                }
            } else {
                if (checkModuleLoaded(moduleName)) {
                    callback();
                }
            }
        }

        function loadLazyImages(container = document) {
            let selector = '[data-src]',
                backgroundImageSelector = '.dummy-heroshot, .dummy-taxonomy, .dummy-agent-bground, .dummy-builder-bground, .dummy-locality-bground, .dummy-lifestyle, .dummy-similar-img, .dummy-placeholder, .dummy-bg',
                images = Box.DOM.queryAll(container, selector),
                dummyBackgroundElements = Box.DOM.queryAll(container, backgroundImageSelector);
            for (let i = 0, length=images.length; i < length; i++) {
                let src = images[i].getAttribute('data-src');
                src && images[i].setAttribute('src', src);
            }
            for (let i=0,length=dummyBackgroundElements.length;i<length;i++){
                let currentElement = dummyBackgroundElements[i];
                $(currentElement).removeClass(backgroundImageSelector.replace(/[.,]/g,''))
            }
        }

        function startAllModules(el = document, extra = [], beforeInitCallback, afterInitCallback) {
            let dependencies = getModulesPath(false, el);
            dependencies = dependencies.concat(extra);
            if (dependencies.length > 0) {
                require(dependencies, () => {
                    if (beforeInitCallback && typeof beforeInitCallback === 'function') {
                        beforeInitCallback();
                    }
                    // Logger.log('Starting All Modules Inside ', el, '...');
                    if (el === document) {
                        Application.init({
                            debug: true
                        });
                    } else {
                        Application.startAll(el);
                    }
                    // Logger.log('All Modules Inside ', el, ' Started...');
                    if (afterInitCallback && typeof afterInitCallback === 'function') {
                        afterInitCallback();
                    }
                });
            }
        }

        function stopAllModules(el = document) {
            // Logger.log('Stopping All Modules Inside ', el, '...');
            let allModules = getAllModules(true, el);
            $.each(allModules, (k, v) => {
                if (loadedModuleMap[v]) {
                    delete loadedModuleMap[v];
                }
                if (modulesBindedOnLoad[v]) {
                    delete modulesBindedOnLoad[v];
                }
            });
            Application.stopAll(el);
            // Logger.log('All Modules Inside ', el, 'Stopped...');
        }

        function stopModule(el = document) {
            let moduleName = el.getAttribute('data-module');
            if (moduleName) {
                if (loadedModuleMap[moduleName]) {
                    delete loadedModuleMap[moduleName];
                }
                if (modulesBindedOnLoad[moduleName]) {
                    delete modulesBindedOnLoad[moduleName];
                }
            }
            Application.stop(el);
        }

        function removePageModule() {
            let PageModuleElement = Box.DOM.query(document, "[data-controller]");
            if (PageModuleElement) {
                PageModuleElement.removeAttribute('data-module');
            }
        }

        function getPageModule() {
            let PageModuleElement = Box.DOM.query(document, "[data-controller]"),
                controllerName = PageModuleElement ? PageModuleElement.getAttribute("data-controller") : null,
                controllerPath = controllerName ? 'scripts/pageModules/' + controllerName : null;
            return {
                "name": controllerName,
                "path": controllerPath,
                "el": PageModuleElement
            };
        }

        function loadJarvis() {
            Box.Application.broadcast("loadModule", {
                name: 'jarvisWrapper'
            });
        }

        function loadMpAnalytics() {
            Box.Application.broadcast("loadModule", {
                name: 'mpAnalytics'
            });
        }

        function getAllPageDependencies(pageModule) {
            let pageDependencies = [],
                dependency = [pageModule.path].concat(pageDependencies);
            return dependency;
        }


        function bindOnLoad(cb){
            if (document.readyState.toLowerCase() === 'complete') {
                cb();
            } else {
                $(window).load(cb);
            }
        }

        function bindOnApplicationClose(cb){
            $(window).on("unload",cb);
        }

        function bindOnLoadPromise(){
            var defer = $.Deferred();
            if (document.readyState.toLowerCase() === 'complete') {
                defer.resolve();
            } else {
                $(window).load(defer.resolve);
            }
            return defer.promise();
        }

        function popupClosed() {
            --openedPopupCount;
        }

        function popupOpened() {
            ++openedPopupCount;
        }

        function getOpenedPopupCount() {
            return openedPopupCount;
        }

        function resetPopupCount() {
            openedPopupCount = 0;
        }

        return {
            getModulesPath,
            loadLazyModules,
            checkModuleLoaded,
            getAllModules,
            bindOnModuleLoad,
            initializeCallbacks,
            loadLazyImages,
            startAllModules,
            stopAllModules,
            stopModule,
            removePageModule,
            getPageModule,
            loadJarvis,
            loadMpAnalytics,
            getAllPageDependencies,
            isEmail: Utils.isEmail,
            isValidValue: Utils.isValidValue,
            bindOnApplicationClose,
            bindOnLoadPromise,
            popupClosed,
            popupOpened,
            getOpenedPopupCount,
            bindOnLoad,
            resetPopupCount
        };
    });
    return Box.Application.getService(SERVICE_NAME);
});
