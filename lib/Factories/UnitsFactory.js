const Soldier = require('../Models/Soldier');
const Vehicle = require('../Models/Vehicle');
const {randomBetween} = require('../Helpers');


class UnitsFactory {

    static getRandomUnit() {
        const listOfUnitsRegistered = [
            Soldier, Vehicle
        ];

        const numberOfUnitsAvailable = listOfUnitsRegistered.length - 1;
        const randomNumber = randomBetween(0, numberOfUnitsAvailable);

        return listOfUnitsRegistered[randomNumber];
    }

    static createRandomUnit() {
        const randomUnit = UnitsFactory.getRandomUnit();
        let unitInstance = new randomUnit();

        if (unitInstance instanceof Vehicle) {
            let operators = this.createOperators(unitInstance.operators);
            unitInstance.setOperators(operators);
        }

        return unitInstance;
    }

    static createOperators(amount) {
        let operators = [];
        for (let i = 0; i < amount; i++) {
            operators.push(new Soldier());
        }
        return operators
    }
}

module.exports = UnitsFactory;