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

    createSquads(numberOfUnits) {
        for (let i = 0; i < this.numberOfSquads; i++) {
            console.log(`Created squad ${i}`);
            this.squads.push(new Squad(numberOfUnits));
        }
    }

    fightWith(army) {
        this.getListOfActiveSquads().forEach((squad) => {
            if (!army.haveActiveSquads() || !squad.isActive()) {
                return;
            }

            let opponentSquad = army.getOpponent(this.strategy);
            squad.attack(opponentSquad);
        });
    }

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

    getRandomSquad() {
        const listOfActiveSquads = this.getListOfActiveSquads();
        return listOfActiveSquads[randomBetween(0, listOfActiveSquads.length - 1)];
    }

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

    haveActiveSquads() {
        const activeSquads = this.getListOfActiveSquads();
        return activeSquads.length > 0;
    }

    getListOfActiveSquads() {
        return this.squads.filter((squad) => {
            if (squad.isActive()) {
                return squad;
            }
        })
    }
}

module.exports = Army;