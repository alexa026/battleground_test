const Squad = require('./Squad');
const {randomBetween} = require('../Helpers');
const Strategy = require('../Enums/Strategy');

class Army {
    constructor(strategy, numberOfSquads, numberOfUnits) {
        this.strategy = strategy;
        this.numberOfSquads = numberOfSquads;

        /** @type Array<Squad> */
        this.squads = [];
        this.createSquads(numberOfUnits);
    }

    /**
     * Creates the squads in army.
     *
     * @param numberOfUnits
     */
    createSquads(numberOfUnits) {
        for (let i = 0; i < this.numberOfSquads; i++) {
            console.log(`Created squad ${i}`);
            this.squads.push(new Squad(numberOfUnits));
        }
    }

    /**
     * Starts the fight with the opponent's army squad
     *
     * @param army
     */
    fightWith(army) {
        this.getListOfActiveSquads().forEach((squad) => {
            if (!army.haveActiveSquads() || !squad.isActive()) {
                return;
            }

            let opponentSquad = army.getOpponent(this.strategy);
            squad.attack(opponentSquad);
        });
    }

    /**
     * Returns the squad to fight with based on opponent's strategy
     *
     * @param tactic
     * @returns {Squad}
     */
    getOpponent(tactic) {
        switch (tactic) {
            case Strategy.WEAKEST:
                return this.getWeakestSquad();
            case Strategy.STRONGEST:
                return this.getStrongestSquad();
            default:
                return this.getRandomSquad();
        }
    }

    /**
     * Algorithm to return the random squad.
     *
     * @returns {Squad}
     */
    getRandomSquad() {
        const listOfActiveSquads = this.getListOfActiveSquads();
        return listOfActiveSquads[randomBetween(0, listOfActiveSquads.length - 1)];
    }

    /**
     * Algorithm to return the weakest squad.
     *
     * @returns {Squad}
     */
    getWeakestSquad() {
        const listOfActiveSquads = this.getListOfActiveSquads();
        let weakestSquad = listOfActiveSquads[0];

        listOfActiveSquads.forEach(squad => {
            if (weakestSquad.getDamage() > squad && squad.isActive()) {
                weakestSquad = squad;
            }
        });

        return weakestSquad;
    }

    /**
     * Algorithm to return the strongest squad.
     *
     * @returns {Squad}
     */
    getStrongestSquad() {
        const listOfActiveSquads = this.getListOfActiveSquads();
        let strongestSquad = listOfActiveSquads[0];

        listOfActiveSquads.forEach(squad => {
            if (strongestSquad.getDamage() < squad && squad.isActive()) {
                strongestSquad = squad;
            }
        });

        return strongestSquad;
    }

    /**
     * Check if there are active squads.
     *
     * @returns {boolean}
     */
    haveActiveSquads() {
        const activeSquads = this.getListOfActiveSquads();
        return activeSquads.length > 0;
    }

    /**
     * Returns all the active squads.
     *
     * @returns {Array.<Squad>}
     */
    getListOfActiveSquads() {
        return this.squads.filter((squad) => {
            if (squad.isActive()) {
                return squad;
            }
        })
    }
}

module.exports = Army;