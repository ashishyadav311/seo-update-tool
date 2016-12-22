"use strict";
(function() {
    var global,
        setUpCookies = function() {
            let c = document.cookie.split('; '),
                cc, $cookies = {};
            for (let i = c.length - 1; i >= 0; i--) {
                cc = c[i].split('=');
                $cookies[cc[0]] = cc[1];
            }
            return $cookies;
        },

        getCookie = function(name) {
            let $cookies = setUpCookies();
            return $cookies[name];
        },

        deleteCookie = function (name) {
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        },

        setCookie = function(name, value, options) {
            if (!name) {
                return "";
            }

            if (name) {
                if (options) {
                    let str = "";
                    for (let k in options) {
                        str += ";" + k + "=" + options[k];
                    }
                    document.cookie = name + "=" + value + str;
                } else {
                    document.cookie = name + "=" + value;
                }

            }
        },

        addLeadingZeros = function(n, length) {
            var str = (n > 0 ? n : -n) + "";
            var zeros = "";
            for (let i = length - str.length; i > 0; i--) {
                zeros += "0";
            }
            zeros += str;
            return n >= 0 ? zeros : "-" + zeros;
        },

        getReadableNumber = function(price) {
            if ((price !== 0 && !price) || isNaN(price)) {
                return '';
            }
            var rem = +(price % 1000).toFixed(2);
            price = Math.floor(price / 1000);
            var readablePrice = (price === 0) ? rem : addLeadingZeros(rem, 3);
            while (price > 0) {
                rem = price % 100;
                price = Math.floor(price / 100);
                var prefix = (price === 0) ? rem : addLeadingZeros(rem, 2);
                readablePrice = prefix + "," + readablePrice;
            }
            return readablePrice;
        },

        getReadablePriceInWord = function(price = '', precision = 1, returnSeperate = false) {
            var priceObj = {};
            if (precision < 0) {
                precision = 1;
            }
            var p = Math.pow(10, precision);

            if (price / 10000000 >= 1) {
                priceObj = {
                    val: Math.floor(price * p / 10000000) / p,
                    unit: 'Cr'
                };
            } else if (price / 100000 >= 1) {
                priceObj = {
                    val: Math.floor(price * p / 100000) / p,
                    unit: 'L'
                };
            } else if (price / 1000 >= 1) {
                // priceObj = {
                //     val: Math.floor(price / 1000 * p) / p,
                //     unit: 'K'
                // };
                priceObj = {
                    val: this.getReadableNumber(price),
                    unit: ''
                };

            } else {
                priceObj = {
                    val: price,
                    unit: ''
                };
            }
            if (returnSeperate) {
                return priceObj;
            } else {
                return priceObj.val + ' ' + priceObj.unit;
            }
        },

        getDisplayPrice = function(price = '', precision = 2) {
            if (price < 100000) {
                return getReadableNumber(price);
            } else {
                return getReadablePriceInWord(price, precision);
            }
        },

        isMobileRequest = function(req) {
            var ua = req.header('user-agent');
            if (/mobile/i.test(ua)) {
                return true;
            }
            return false;
        },

        //To change the first letter of a word to capitals
        ucword = function(str) {
            return (str + '').replace(/^([a-z])|\s+([a-z])/g, function($1) {
                return $1.toUpperCase();
            });
        },
        _getUserAvatarColor = function(index) {
            var colors = [
                '#ff964d', '#ff424e', '#ff5a4e', '#ff754d', '#e4101d', '#ffa54f', '#ffb951', '#8f0f16'
            ];
            if(index < colors.length) {
                return colors[index];
            } else {
                return colors[0];
            }
        },
        _getNameHash = function(name) {
            let hash = 0;
            for(let i=0; i<name.length; i++) {
                hash += name.charCodeAt(name[i]);
            }
            return hash%26;
        },
        getAvatar = function(name='') {
            return {
                backgroundColor: _getUserAvatarColor(_getNameHash(name)),
                text: name.trim().toUpperCase()[0],
                textColor: '#fff'
            };
        },

        _monthMap = {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December'
        },

        _monthMapShorthand = {
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'Jun',
            6: 'Jul',
            7: 'Aug',
            8: 'Sep',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'
        },

        _dayMap = {
            0: 'Sunday',
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday',
            7: 'Sunday',
        },

        /**
         * accepts date object
         */
        _getDate = function(date) {
            return ("0" + date.getDate()).slice(-2);
        },
        //to get day in words string true
        _getDay = function(date, string) {
            var _day = date.getDay();
            if (string) {
                return _dayMap[_day];
            } else {
                return _day;
            }
        },

        /**
         * to get month in words string true
         */
        _getMonth = function(date, string, shortHand) {
            var _month = date.getMonth();
            if (string) {
                if (shortHand) {
                    return _monthMapShorthand[_month];
                } else {
                    return _monthMap[_month];
                }
            } else {
                _month++;
                return ((_month + "").length < 2) ? "0" + _month: _month;
            }
        },

        /**
         * short true, would return 2 digit date
         */
        _getYear = function(date, short) {
            var _year = date.getFullYear();
            if (short) {
                return _year.toString().substr(2, 2);
            } else {
                return _year;
            }
        },

        /**
        value - time in milliseconds
        YY - year in 4 digits
        yy - year in 2 digits
        MM - full month in String (eg. January)
        SS - shorthand month on String (eg. Jan)
        mm - month in integer
        DD - day of the week (eg. Sunday)
        dd - date
        */
        formatDate = function(value, format='SS YY') {
            if (!value) {
                return;
            }
            value = parseInt(value);
            var tempDate = new Date();
            Date.prototype.stdTimezoneOffset = function() {
                var jan = new Date(this.getFullYear(), 0, 1);
                var jul = new Date(this.getFullYear(), 6, 1);
                return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
            }
            var timezoneOffset = tempDate.stdTimezoneOffset();
            var __date = new Date(value + (timezoneOffset + 330)*60*1000);
            var keymap = {
                'YY': function(date) {
                    return _getYear(date);
                },
                'yy': function(date) {
                    return _getYear(date, true);
                },
                'MM': function(date) {
                    return _getMonth(date, true);
                },
                'SS': function(date) {
                    return _getMonth(date, true, true);
                },
                'mm': function(date) {
                    return _getMonth(date);
                },
                'DD': function(date) {
                    return _getDay(date, true);
                },
                'dd': function(date) {
                    return _getDate(date, true);
                }
            };
            for (var key in keymap) {
                if (keymap.hasOwnProperty(key)) {
                    var regex = new RegExp(key + "(?!" + key.charAt(0) + ")");
                    format = format.replace(regex, keymap[key](__date));
                }
            }
            return format;
        },

        /**
         * value - the time in milliseconds
         * diff is an object having attributes { days : no_of_days, months : no_of_months, years : no_of_years }
         * returnDate - if true returns date object else return time in milliseconds
         */
        dateAhead = function(value, diff, returnDate) {
            var currDate = new Date();
            if (value) {
                currDate = new Date(value);
            }
            if (!diff) {
                diff = {};
            }
            diff.days = diff.days ? diff.days : 0;
            diff.months = diff.months ? diff.months : 0;
            diff.years = diff.years ? diff.years : 0;
            currDate.setFullYear(currDate.getFullYear() + diff.years);
            currDate.setMonth(currDate.getMonth() + diff.months);
            currDate.setDate(currDate.getDate() + diff.days);

            if (returnDate) {
                return currDate;
            } else {
                return currDate.valueOf();
            }
        },

        timeFromDate = function(pastDate) {
            if (!pastDate) {
                return;
            }
            var now = (new Date()).getTime();
            if (now > pastDate) {
                return parseInt(formatDate(now, 'YY')) - parseInt(formatDate(pastDate, 'YY'));
            } else {
                return 0;
            }
        },

        formatPriceWithComma = function(x) {
            if(!x) return '';
            x = x.toString().split(',').join('');
            var lastThree = x.substring(x.length - 3);
            var otherNumbers = x.substring(0, x.length - 3);
            if (otherNumbers !== '') {
                lastThree = ',' + lastThree;
            }
            return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        },

        stripContent = function(text, length, wordwise, tail = '...') {
            if (!text) {
                return {};
            }
            var content = {},
                lastspace;
            if (text.length > length) {
                content.description = text.substring(0, length);
                if (wordwise) {
                    lastspace = content.description.lastIndexOf(' ');
                    if (lastspace != -1) {
                        content.description = content.description.substr(0, lastspace);
                    }
                }
                content.description += tail;
                content.contentTrimmed = true;
            } else {
                content.description = text;
                content.contentTrimmed = false;
            }
            return content;
        },

        stripHtmlContent = function(sentence, trimToLength, fromServer = false, wordwise = false, appendString = '...', withoutTags=false) {
            try {
                if (!sentence) {
                    return {description: sentence};
                }
                let  striped = sentence.replace(/<[^>]+>/g," ").replace(/\s+/g," ").replace(/&nbsp;/g, " ").trim() || '';
                return stripContent(striped,trimToLength,wordwise,appendString);
            } catch(e) {
                console.log("Error while parsing HTML content." +  e);
                return {description:"No description available",error:true};
            }

        },

        _cutKeepingTags = function(parseDiv, newParent, charCount, trimToLength, appendString, wordwise) {
            var newEle,
                res,
                lastspace,
                content,
                TEXT_NODE = 3;

            for (let j = 0; j < parseDiv.childNodes.length; j++) {
                let ele = parseDiv.childNodes[j];
                // not text node
                if (ele.nodeType !== TEXT_NODE) {
                    newEle = ele.cloneNode(true);
                    newParent.appendChild(newEle);
                    if (ele.childNodes.length === 0) {
                        continue;
                    }
                    newEle.innerHTML = '';
                    res = _cutKeepingTags(ele, newEle, charCount, trimToLength, appendString, wordwise);
                    if (res) {
                        return res;
                    } else {
                        continue;
                    }
                }


                // the limit of the char count reached
                if (ele.nodeValue.length + charCount.count >= trimToLength) {
                    newEle = ele.cloneNode(true);
                    content = ele.nodeValue.substr(0, trimToLength - charCount.count);
                    if (wordwise) {
                        lastspace = content.lastIndexOf(' ');
                        if (lastspace != -1) {
                            content = content.substr(0, lastspace);
                        }
                    }
                    newEle.nodeValue = content + appendString;
                    newParent.appendChild(newEle);
                    return true;
                }
                newEle = ele.cloneNode(true);
                newParent.appendChild(newEle);
                charCount.count += ele.nodeValue.length;
            }
            return false;
        },


        changeQueryParam = function(url, key, value) {
            if (key === "page" && value === 1) {
                var urlparts = url.split('?');
                if (urlparts.length >= 2) {

                    var prefix = encodeURIComponent(key) + '=';
                    var pars = urlparts[1].split(/[&;]/g);

                    //reverse iteration as may be destructive
                    for (var i = pars.length; i-- > 0;) {
                        //idiom for string.startsWith
                        if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                            pars.splice(i, 1);
                        }
                    }

                    url = urlparts[0] + '?' + pars.join('&');
                    return prefixToUrl(url);
                } else {
                    return prefixToUrl(url);
                }
            }
            var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
            var separator = url.indexOf('?') !== -1 ? "&" : "?";
            if (url.match(re)) {
                return prefixToUrl(url.replace(re, '$1' + key + "=" + value + '$2'));
            } else {
                return prefixToUrl(url + separator + key + "=" + value);
            }
        },

        isEmptyObject = function(obj) {
            for (var name in obj) {
                return false;
            }
            return true;
        },

        count = function(obj) {
            var count = 0;
            if (typeof(obj) == 'object') {
                return Object.keys(obj).length;
            }
            return count;
        },

        ordinalSuffix = function(i) {
            if (!isNaN(i)) {
                var j = i % 10,
                    k = i % 100;
                if (j == 1 && k != 11) {
                    return i + "<sup>st</sup>";
                }
                if (j == 2 && k != 12) {
                    return i + "<sup>nd</sup>";
                }
                if (j == 3 && k != 13) {
                    return i + "<sup>rd</sup>";
                }
                return i + "<sup>th</sup>";
            }
            return i;
        },

        deepCopy = function(p, c = {}) {
            for (let i in p) {
                if (p[i] && typeof p[i] === 'object') {
                    c[i] = (p[i].constructor === Array) ? [] : {};
                    deepCopy(p[i], c[i]);
                } else {
                    c[i] = p[i];
                    c[i] = p[i];
                }
            }
            return c;
        },
        shortLength = function(isMobile) {
            return isMobile ? 80 : 200;
        },
        getRange = function(min, max, unit = '', seperator = '-') {
            seperator = seperator ? seperator : '-';
            if (!min && !max) {
                return;
            }
            if (!min) {
                return max + ' ' + unit;
            }
            if (!max) {
                return min + ' ' + unit;
            }
            return (min !== max) ? min + ' ' + seperator + ' ' + max + ' ' + unit : min + ' ' + unit;

        },
        isMasterPlanSupported = function(city) {
            let supportedCities = [{
                name: "Bangalore",
                id: 2
            }, {
                name: "Pune",
                id: 21
            }, {
                name: "Noida",
                id: 20
            }];
            for(var i=0;i<supportedCities.length;i++) {
                if(supportedCities[i].id == city.id || supportedCities[i].name == city.name) {
                    return supportedCities[i];
                }
            }
            return false;
        },
        roundNumber = function(number, roundToPlaceCount = 2) {
            if (!number) {
                return '';
            }
            return parseFloat(number).toFixed(roundToPlaceCount);
        },
        validatePhone = function(phno, ctry) {

            var phone_re = /^\+{0,1}[0-9- ]+$/;
            if (!phone_re.test(phno)) {
                return false;
            }
            var prefix = phno[0];
            phno = phno.match(/[0-9]+?/g).join('');
            phno = phno.replace(/^[0]+/g, '');

            if (ctry.trim().toLowerCase() === 'india') {
                if (phno.length == 10 && ['7', '8', '9'].indexOf(prefix) !== -1) {
                    return phno;
                } else {
                    return false;
                }
            } else {
                if ((phno.length < 6 || phno.length > 15) && prefix == '+') {
                    return false;
                } else if (phno.length < 6 || ((phno.length > 12) && (prefix !== '+'))) {
                    return false;
                } else {
                    var validPrefixes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                    if (validPrefixes.indexOf(parseInt(prefix)) === -1) {
                        return false;
                    } else {
                        return phno;
                    }
                }
            }
        },
        isEmail = function(email) {
            var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (email && emailRegex.test(email.trim())) {
                return true;
            }
            return false;
        },
        isName = function(name) {
            var nameRegex = /^[a-zA-Z ]+$/; //  as we are already trimming
            if (name && nameRegex.test(name.trim())) {
                return true;
            }
            return false;
        },
        checkAlphanumericSpace = function(str) {
            return str.match(/^[a-zA-Z0-9\s]+$/)? true:false;
        },
        countOccurences = function(str, regex){
            return (str.match(new RegExp(regex)) || []).length;
        },
        removeConsecutiveSpace = function(str){
            return str.split(/\s+/).join(' ');
        },
        isValidCompanyName = function(name){
            name = removeConsecutiveSpace(name.trim());
            return (name.length < 36 && name.length > 2 && checkAlphanumericSpace(name) && countOccurences(name, / /g) < 6 && countOccurences(name, /\d/g) < 5) ? true : false;
        },
        parseCountries = function(cList) {
            var nList = [];
            $.each(cList, function(key, val) {
                nList.push({
                    value: val.countryId,
                    label: val.label,
                    code: val.countryCode
                });
            });
            return nList;
        },
        parseCity = function(cList) {
            var nList = [];
            $.each(cList, function(key, val) {
                nList.push({
                    value: val.id,
                    label: val.label,
                    displayPriority: val.displayPriority
                });
            });
            return nList;
        },
        listingsPropertyPathName = function() {
            return '/listings';
        },
        calculateEMI = function(principal, ratePerAnuminFraction, tenure, downpayment_percent) {
            let emi = principal*(1-downpayment_percent) * (ratePerAnuminFraction / 12) * Math.pow(1 + ratePerAnuminFraction / 12, tenure * 12) / (Math.pow(1 + ratePerAnuminFraction / 12, tenure * 12) - 1);
            return Math.round(emi);
        },
        convertToCamelCase = function(string) {
            if(!string) {
                return;
            }
            return string.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
        },
        toTitleCase = function(str)
        {
            return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        },
        randomInt = function (low, high) {
            return Math.floor(Math.random() * (high - low + 1) + low);
        },
        getRatingClass = function(rating) {
            let finalClass = 'r',
                decimalPart = rating - Math.floor(rating);

            if (Math.floor(rating)) {
                finalClass += Math.floor(rating);
            }
            if (decimalPart >= 0.5) {
                finalClass += 'half';
            }
            return finalClass;
        },
        prefixToUrl = function (url, prefix='/') {
            if (!url || url.indexOf(prefix) == 0) {
                return url;
            } else {
                return prefix + url;
            }
        },
        unique = function(array){
            var arr = [];
            for(var i = 0; i < array.length; i++) {
                if(arr.indexOf(array[i]) == -1) {
                    arr.push(array[i]);
                }
            }
            return arr;
        },
        toCamelCase = function () {
           return this.toLowerCase().replace(/_(.)/g, function(match, group1) {
               return group1.toUpperCase();
           });
        },
        trimString = function(string, limit) {
            return (string.length > limit) ? string.substr(0, limit) + "..." : string;
        },
        convertTimeToSeconds = function(hms){
            if(!hms) return null;   // your input string '02:04:33'
            var a = hms.split(':'); // split it at the colons

            // minutes are worth 60 seconds. Hours are worth 60 minutes.
            var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
            return seconds;
        },
        utils = {
            setCookie,
            getCookie,
            deleteCookie,
            getReadableNumber,
            getReadablePriceInWord,
            isMobileRequest,
            ucword,
            formatPriceWithComma,
            stripContent,
            changeQueryParam,
            formatDate,
            timeFromDate,
            dateAhead,
            isEmptyObject,
            count,
            ordinalSuffix,
            deepCopy,
            shortLength,
            stripHtmlContent,
            getDisplayPrice,
            getRange,
            roundNumber,
            isMasterPlanSupported,
            isName,
            isValidCompanyName,
            isEmail,
            validatePhone,
            parseCountries,
            listingsPropertyPathName,
            calculateEMI,
            convertToCamelCase,
            getAvatar,
            getRatingClass,
            randomInt,
            parseCity,
            toTitleCase,
            prefixToUrl,
            trimString,
            unique,
            convertTimeToSeconds
        };

        String.prototype.toCamelCase = toCamelCase;

    //to create a node module
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = utils;
    }
    //to create a amd component
    else if (typeof define === 'function' && define.amd) {
        define(function() {
            return utils;
        });
    }
    //to create a global file if both are not present
    else {
        global = (function() {
            return this || (0, eval)('this');
        }());
        global.utils = utils;
    }
}());
