﻿; (function () {
    "use strict";

    var nsString = "Util";
    var ns = HomeStock.Import(nsString);
    var messagePrefix = nsString + ".UUID: ";

    ns.UUID = function (prefix) { // Public Domain/MIT
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            var uuid = (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            return prefix ? prefix.toString() + "-" + uuid : uuid;
        });
    }
})();