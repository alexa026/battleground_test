const Army = require('../Models/Army');
const {randomBetween} = require('../Helpers');

class Battleground {
    constructor(configuration) {
        this.configuration = configuration;

        /** @type Array<Army> */
        this.armies = [];
        this.createArmies();
    }

    createArmies() {
        this.armies = this.configuration.armies.map((army, index) => {
            console.log(`Created army ${index}.`);
            return new Army(army.strategy, army.squads, army.units);
        });
    }

    startBattle() {
        do {
            this.getActiveArmies().forEach((army, index) => {
                if (!army.haveActiveSquads()) {
                    return;
                }

                let opponent = this.findOpponentArmyFor(army);
                console.log(`Army ${index} attacking `);
                army.fightWith(opponent);
            });

            console.log('Armies left ', this.armiesLeft());

        } while(this.victoryConditionMet());

        console.log(`Winner is army ${this.getWinner()}`);
    }

    findOpponentArmyFor(army) {
        const activeArmies = this.getActiveArmies();

        let randomNum,
            /** @type Army */
            selectedArmy;

        do {
            randomNum = randomBetween(0, activeArmies.length - 1);
            selectedArmy = activeArmies[randomNum];
        } while (selectedArmy === army);

        return selectedArmy;
    }

    victoryConditionMet() {
        return this.armiesLeft() !== 1;
    }

    getActiveArmies() {
        return this.armies.filter(army => {
            if (army.haveActiveSquads()) {
                return army;
            }
        })
    }

    armiesLeft() {
        return this.getActiveArmies().length;
    }

    getWinner() {
        for (let i = 0; i < this.armies.length; i++) {
            if (this.armies[i].haveActiveSquads()) {
                return i;
            }
        }
    }
}

module.exports = Battleground;