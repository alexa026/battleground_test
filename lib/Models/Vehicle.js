const Unit = require('./Unit');
const {randomBetween, gAvg} = require('../Helpers');

class Vehicle extends Unit {
    constructor() {
        super();
        this.recharge = randomBetween(1000, 2000);
        this.operators = randomBetween(1, 3);

        /** @type Array<Soldier> */
        this.operatorUnits = [];

        console.log('Created Vehicle');
    }

    /**
     * Set operators to the vehicle.
     *
     * @param operators
     */
    setOperators(operators) {
        this.operatorUnits = operators;
    }

    /**
     * Get the total damage unit can make.
     *
     * @returns {number}
     */
    getDamage() {
        return 0.1 + this.getSumOfOperatorsExperience();
    }

    /**
     * Calculates the success rate of the unit.
     *
     * @returns {number}
     */
    getSuccessRate() {
        return 0.5 * (1 + this.health / 100) * this.getSuccessRateOfOperators();
    }

    /**
     * Sum up the experience of every operator.
     *
     * @returns {number}
     */
    getSumOfOperatorsExperience() {
        let experienceSum = 0;

        this.operatorUnits.map((operator) => {
             experienceSum += operator.experience / 100;
        });

        return experienceSum;
    }

    /**
     * Calculates the success rate of the operators.
     *
     * @returns {number}
     */
    getSuccessRateOfOperators() {
        let totalSuccessRate = 1;

        this.operatorUnits.map((operator) => {
            totalSuccessRate *= operator.isActive() ? operator.getSuccessRate() : 1;
        });

        return gAvg(totalSuccessRate, 1 / this.operators);
    }

    /**
     * Take the damage by splitting it upon the team members and vehicle.
     *
     * @param amount
     */
    takeDamage(amount) {
        let vehicleDamage = amount * 0.6;
        let operatorBiggerDamage = amount * 0.2;
        let operatorEvenDamage = amount * 0.1;

        this.takeVehicleDamage(vehicleDamage);
        this.takeOperatorsDamage(operatorBiggerDamage, operatorEvenDamage);
    }

    /**
     * Take vehicle damage.
     *
     * @param vehicleDamage
     */
    takeVehicleDamage(vehicleDamage) {
        this.health -= vehicleDamage;
    }

    /**
     * Take the damage to the vehicle operators.
     *
     * @param bigDamage
     * @param evenDamage
     */
    takeOperatorsDamage(bigDamage, evenDamage) {
        let bigDamageOperatorRandomIndex = randomBetween(0, this.operators);

        this.operatorUnits.map((operator, index) => {
            const damageToDeal = bigDamageOperatorRandomIndex === index ? bigDamage : evenDamage;

            operator.takeDamage(damageToDeal);
        });
    }

    /**
     * Check if vehicle is active.
     *
     * @return {boolean|*}
     */
    isActive() {
        return super.isActive() && this.hasActiveOperator();
    }

    /**
     * Check is there any operator active.
     *
     * @return {boolean}
     */
    hasActiveOperator() {
        for (let i = 0; i < this.operators; i++) {
            if (this.operatorUnits[i].isActive()) {
                return true;
            }
        }
        return false;
    }
}

module.exports = Vehicle;