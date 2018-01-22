const Unit = require('./Unit');
const {randomBetween} = require('../Helpers');

const MAX_EXPERIENCE = 50;

class Soldier extends Unit {
    constructor() {
        super();
        this.experience = 0;
        console.log('Created Soldier');
    }

    /**
     * Calculates the success rate.
     *
     * @returns {number}
     */
    getSuccessRate() {
        return 0.5 * (1 + this.health / 100) * randomBetween(50 + this.experience, 100) / 100;
    }

    /**
     * Calculates the damage.
     *
     * @returns {number}
     */
    getDamage() {
        return 0.05 + this.experience / 100;
    }

    /**
     * Receive damage from the opponent.
     *
     * @param amount
     */
    takeDamage(amount) {
        console.log(`Taking ${amount} damage`);
        this.health -= amount;
    }
}

module.exports = Soldier;