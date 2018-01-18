module.exports.randomBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.gAvg = function (number, amount) {
    return Math.pow(number, 1 / amount);
};