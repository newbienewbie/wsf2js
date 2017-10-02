
/**
 * ajax 
 */
var ajax = {};


/**
 * create XMLHttpRequest object using MSXML.XMLHttp
 */
ajax.createXHR = function createXHR() {
    var versions = [
        "MSXML2.XMLHttp.6.0",
        "MSXML2.XMLHttp.3.0",
        "MSXML2.XMLHttp"
    ];
    var VERSION = null;
    var temp = null;
    for (var i = 0; i < versions.length; i++) {
        try {
            VERSION = versions[i];
            temp = new ActiveXObject(VERSION);
            break;
        } catch (err) {
            // pass
        }
    }
    temp = null;
    return new ActiveXObject(VERSION);
}

/**
 * add headers for xhr obj 
 * @private
 * @static
 */
ajax._setRequestHeader = function (xhr, headers) {
    var keys = Object.keys(headers);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = headers[key];
        xhr.setRequestHeader(key, value);
    }
};

/**
 * create a then function that accepts resolve and reject
 */
ajax._createThen=function(xhr){
    return function(resolve,reject){
        reject = reject ? reject : function () { };
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            resolve(xhr);
        } else {
            reject(xhr);
        }
    };
};


ajax.get = function (url, opts, data) {
    var xhr = ajax.createXHR();
    xhr.open("get", url, false);
    ajax._setRequestHeader(xhr, opts.headers);
    xhr.send(null);
    return {
        then: ajax._createThen(xhr)
    };
};


ajax.post = function (url, opts, data) {
    var xhr = ajax.createXHR();
    xhr.open("post", url, false);
    ajax._setRequestHeader(xhr, opts.headers);
    xhr.send(data);
    return {
        then:ajax._createThen(xhr)
    };
};

