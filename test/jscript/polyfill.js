

/**
 * polyfill of Object.keys()
 */
Object.keys = Object.keys || function (obj) {//ecma262v5 15.2.3.14

    var DONT_ENUM = "propertyIsEnumerable,isPrototypeOf,hasOwnProperty,toLocaleString,toString,valueOf,constructor".split(",");
    var hasOwn = ({}).hasOwnProperty;
    for (var i in { toString: 1 }) {
        DONT_ENUM = false;
    }

    var result = [];
    for (var key in obj) if (hasOwn.call(obj, key)) {
        result.push(key)
    }
    if (DONT_ENUM && obj) {
        for (var i = 0; key = DONT_ENUM[i++];) {
            if (hasOwn.call(obj, key)) {
                result.push(key);
            }
        }
    }
    return result;
};