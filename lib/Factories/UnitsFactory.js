const Soldier = require('../Models/Soldier');
const Vehicle = require('../Models/Vehicle');
const {randomBetween} = require('../Helpers');


class UnitsFactory {

    /**
     * Returns the random unit from the list of available.
     *
     * @returns {Soldier | Vehicle}
     */
    static getRandomUnit() {
        const listOfUnitsRegistered = [
            Soldier, Vehicle
        ];

        const numberOfUnitsAvailable = listOfUnitsRegistered.length - 1;
        const randomNumber = randomBetween(0, numberOfUnitsAvailable);

        return listOfUnitsRegistered[randomNumber];
    }

    /**
     * Creates the instance of random unit.
     *
     * @returns {Soldier | Vehicle}
     */
    static createRandomUnit() {
        const randomUnit = UnitsFactory.getRandomUnit();
        let unitInstance = new randomUnit();

        if (unitInstance instanceof Vehicle) {
            let operators = this.createOperators(unitInstance.operators);
            unitInstance.setOperators(operators);
        }

        return unitInstance;
    }

    /**
     * Creates the operator for the vehicle type of unit.
     *
     * @param amount
     * @returns {Array}
     */
    static createOperators(amount) {
        let operators = [];
        for (let i = 0; i < amount; i++) {
            operators.push(new Soldier());
        }
        return operators
    }
}

module.exports = UnitsFactory;