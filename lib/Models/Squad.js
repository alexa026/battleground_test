const UnitsFactory = require('../Factories/UnitsFactory');
const {gAvg} = require('../Helpers');

class Squad {
    constructor(unitsNumber) {
        /** @type Array<Soldier|Vehicle> */
        this.unitsGroup = [];
        this.numberOfUnits = unitsNumber;
        this.createUnitsForSquad();
    }

    /**
     * Create units to fill the squad.
     */
    createUnitsForSquad() {
        for (let i = 0; i < this.numberOfUnits; i++) {
            this.unitsGroup.push(UnitsFactory.createRandomUnit());
        }
    }

    /**
     * Attack the opponent squad.
     *
     * @param opponentSquad
     */
    attack(opponentSquad) {
        let mySuccessRate = this.getSuccessRate();
        let opponentSuccessRate = opponentSquad.getSuccessRate();
        if (mySuccessRate > opponentSuccessRate) {
            const myDamage = this.getDamage();
            opponentSquad.takeDamage(myDamage);
        }
    }

    /**
     * Check is active (has active group members).
     *
     * @returns {boolean}
     */
    isActive() {
        for (let i = 0; i < this.numberOfUnits; i++) {
            if (this.unitsGroup[i].isActive()) {
                return true;
            }
        }
        return false;
    }

    /**
     * Get the success rate of squad.
     *
     * @returns {number}
     */
    getSuccessRate() {
        let totalSuccessRate = 1;

        this.unitsGroup.map((unit) => {
            totalSuccessRate *= unit.isActive() ? unit.getSuccessRate() : 1;
        });

        return gAvg(totalSuccessRate, 1 / this.numberOfUnits);
    }

    /**
     * Take the damage from opponent and transfer it to the squad members.
     *
     * @returns {number}
     * @param damage
     */
    takeDamage(damage) {
        this.unitsGroup.map((unit) => {
            if (unit.isActive()) {
                return unit.takeDamage(damage);
            }
        });
    }

    /**
     * Get the total damage that squad can make.
     * @returns {number}
     */
    getDamage() {
        let total = 0;

        this.unitsGroup.map((unit) => {
             total += unit.isActive() ? unit.getDamage() : 0;
        });

        return total;
    }
}

module.exports = Squad;