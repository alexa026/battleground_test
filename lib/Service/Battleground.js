const Army = require('../Models/Army');
const {randomBetween} = require('../Helpers');

class Battleground {
    constructor(configuration) {
        this.configuration = configuration;

        /** @type Array<Army> */
        this.armies = [];
    }

    /**
     * Create the armies.
     */
    createArmies() {
        this.armies = this.configuration.armies.map((army, index) => {
            console.log(`Created army ${index}.`);
            return new Army(army.strategy, army.squads, army.units);
        });
    }

    /**
     * Start the battle. Will be fighting until there is just one army left.
     *
     * @return {number}
     */
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

        } while(!this.victoryConditionMet());

        const winner = this.getWinner();

        console.log(`Winner is army ${winner}`);
        return winner;
    }

    /**
     * Find the opponent for the given army.
     *
     * @param army
     * @return {Army}
     */
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

    /**
     * Are victory conditions met?
     *
     * @return {boolean}
     */
    victoryConditionMet() {
        return this.armiesLeft() === 1;
    }

    /**
     * Returns the list of active armies.
     *
     * @return {Array.<Army>}
     */
    getActiveArmies() {
        return this.armies.filter(army => {
            if (army.haveActiveSquads()) {
                return army;
            }
        })
    }

    /**
     * How much armies are left?
     *
     * @return {Number}
     */
    armiesLeft() {
        return this.getActiveArmies().length;
    }

    /**
     * Returns the index of the winner army.
     *
     * @return {number}
     */
    getWinner() {
        for (let i = 0; i < this.armies.length; i++) {
            if (this.armies[i].haveActiveSquads()) {
                return i;
            }
        }
    }
}

module.exports = Battleground;