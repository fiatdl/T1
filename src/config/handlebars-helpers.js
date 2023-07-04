const moment = require("moment/moment");

module.exports = {
    ifeq: function (a, b, options) {
        if (a === b) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    bar: function () {
        return "BAR!";
    },
    genTime: function (date, format) {
        return moment(date).format(format);

    }
    ,
    extracost: function (value) {
        return 0.2 * value;
    },
    addedWishlist: function (value1, value2) {
        return (value1 === value2) ? "v" : "";
    }
}