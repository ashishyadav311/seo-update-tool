define([], function() {
    'use strict';

    const SERVICE_NAME = 'ConfigService';

    Box.Application.addService(SERVICE_NAME, () => {
        const config = {
            hideClass: 'hide',
            selectedClass: 'selected',
            focusClass: 'focus',
            activeClass: 'active',
            openClass: 'open',
            disabledClass: 'disabled',
            getFeedbackDuration: 2*3600
        };

        const ajaxifyConfig = {
            /* basic config parameters */
            selector: "a:not(.no-ajaxy)", //Selector for elements to ajaxify - without being swapped - e.g. a selection of links
            forms: "form:not(.no-ajaxy)", // jQuery selection for ajaxifying forms - set to "false" to disable
            canonical: false, // Fetch current URL from "canonical" link if given, updating the History API.  In case of a re-direct...

            /* visual effects settings */
            requestDelay: 0, //in msec - Delay of Pronto request
            aniTime: 0, //in msec - must be set for animations to work
            aniParams: false, //Animation parameters - see below.  Default = off
            previewoff: true, // Plugin previews prefetched pages - set to "false" to enable or provide a jQuery selection to selectively disable
            scrolltop: false, // Always scroll to top of page
            idleTime: 0, //in msec - master switch for slideshow / carousel - default "off"
            slideTime: 0, //in msec - time between slides
            menu: false, //Selector for links in the menu
            addclass: "jqhover", //Class that gets added dynamically to the highlighted element in the slideshow
            toggleSlide: false, //Toggle slide parameters - see below.  Default = off

            /* script and style handling settings, prefetch */
            deltas: true, // true = deltas loaded, false = all scripts loaded
            inline: true, // true = all inline scripts loaded, false = only specific inline scripts are loaded
            inlinehints: false, // strings - separated by ", " - if matched in any inline scripts - only these are executed - set "inline" to false beforehand
            inlineskip: "adsbygoogle, GoogleAnalyticsObject, registerServiceWorker", // strings - separated by ", " - if matched in any inline scripts - these are NOT are executed - set "inline" to true beforehand
            inlineappend: true, // append scripts to the main content div, instead of "eval"-ing them
            style: false, // true = all style tags in the head loaded, false = style tags on target page ignored
            prefetch: false, // Plugin pre-fetches pages on hoverIntent or touchstart

            /* debugging & advanced settings*/
            verbosity: 0, //Debugging level to console: 1 = medium, 2 = verbose
            memoryoff: false, // strings - separated by ", " - if matched in any URLs - only these are NOT executed - set to "true" to disable memory completely
            cb: null, // callback handler on completion of each Ajax request - default null
            pluginon: true // Plugin set "on" or "off" (==false) manually
        };


        function loadGlobalConfig() {
            window.config = config;
        }

        return {
            loadGlobalConfig,
            ajaxifyConfig,
        };
    });

    return Box.Application.getService(SERVICE_NAME);
});
