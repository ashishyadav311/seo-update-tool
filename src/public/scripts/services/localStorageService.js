/*
 * @author [Aditya Jha]
 */

'use strict';

define([
    "services/loggerService",
], (logger) => {
    const SERVICE_NAME = 'localStorageService';

    Box.Application.addService(SERVICE_NAME, () => {

        const RECENT_SEARCH_KEY = "recent-search";

        function setItem(key, value) {
            try{
                window.localStorage.setItem(key, JSON.stringify(value));
            }catch(e){
                logger.error('in catch of setLocalStorageKey: ',JSON.stringify(e));
            }
        }

        function getItem(key) {
            let value = window.localStorage.getItem(key);
            value = JSON.parse(value);
            return value;
        }

        function deleteItem(key) {
            return (delete window.localStorage[key]);
        }

        function setSessionItem(name, val){
            try{
                window.sessionStorage.setItem(name, JSON.stringify(val));
            }catch(e){
                logger.error('in catch of setLocalStorageKey: ',JSON.stringify(e));
            }
        }

        function getSessionItem(name) {
            let value;
            try{
                value = window.sessionStorage.getItem(name);
                value = JSON.parse(value);
            }catch(e){
                value = {};
            }
            return value;
        }

        function getRecentSearches(n, category) {
            category = category ? category.toLowerCase() : null;
            var obj = this.getItem(RECENT_SEARCH_KEY),
                itemArray = [];
            if (!(obj && category && obj[category])) {
                return;
            }
            for (let i in obj[category]) {
                itemArray.push(obj[category][i]);
            }
            return itemArray.sort(function(i, j) {
                return j.timestamp - i.timestamp;
            }).slice(0, n);
        }

        function setRecentSearches(searchItem, category) {
            category = category ? category.toLowerCase() : null;
            var obj = this.getItem(RECENT_SEARCH_KEY) || {},
                categoryObj = obj[category] || {};
            searchItem.timestamp = new Date().valueOf();
            categoryObj[searchItem.id] = searchItem;
            obj[category] = categoryObj;
            this.setItem(RECENT_SEARCH_KEY, obj);
            return obj;
        }

        return {
            setItem,
            getItem,
            deleteItem,
            getSessionItem,
            setSessionItem,
            getRecentSearches,
            setRecentSearches
        };
    });

    return Box.Application.getService(SERVICE_NAME);
});
