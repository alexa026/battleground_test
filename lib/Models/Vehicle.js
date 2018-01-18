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

    setOperators(operators) {
        this.operatorUnits = operators;
    }

    getDamage() {
        return 0.1 + this.getSumOfOperatorsExperience();
    }

    getSuccessRate() {
        return 0.5 * (1 + this.health / 100) * this.getSuccessRateOfOperators();
    }

    getSumOfOperatorsExperience() {
        let experienceSum = 0;

        this.operatorUnits.map((operator) => {
             experienceSum += operator.experience / 100;
        });

        return experienceSum;
    }

    getSuccessRateOfOperators() {
        let totalSuccessRate = 1;

        this.operatorUnits.map((operator) => {
            totalSuccessRate *= operator.isActive() ? operator.getSuccessRate() : 1;
        });

        return gAvg(totalSuccessRate, 1 / this.operators);
    }

    takeDamage(amount) {
        let vehicleDamage = amount * 0.6;
        let operatorBiggerDamage = amount * 0.2;
        let operatorEvenDamage = amount * 0.1;

        this.takeVehicleDamage(vehicleDamage);
        this.takeOperatorsDamage(operatorBiggerDamage, operatorEvenDamage);
    }

    takeVehicleDamage(vehicleDamage) {
        this.health -= vehicleDamage;
    }

    takeOperatorsDamage(bigDamage, evenDamage) {
        let bigDamageOperatorRandomIndex = randomBetween(0, this.operators);

        this.operatorUnits.map((operator, index) => {
            const damageToDeal = bigDamageOperatorRandomIndex === index ? bigDamage : evenDamage;

            operator.takeDamage(damageToDeal);
        });
    }

    isActive() {
        return super.isActive() && this.hasActiveOperator();
    }

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