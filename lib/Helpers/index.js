/**
 * Choose the random number between min and max.
 *
 * @param min
 * @param max
 * @returns {number}
 */
module.exports.randomBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Calculates the geometric average.
 *
 * @param number
 * @param amount
 * @returns {number}
 */
module.exports.gAvg = function (number, amount) {
    return Math.pow(number, 1 / amount);
};