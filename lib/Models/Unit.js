const {randomBetween} = require('../Helpers');

class Unit {
    constructor() {
        this.health = 100;
        this.recharge = randomBetween(100, 2000);
    }

    /**
     * Check if unit is active.
     *
     * @returns {boolean}
     */
    isActive() {
        return this.health > 0;
    }
}

module.exports = Unit;