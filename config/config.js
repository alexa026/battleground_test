const Strategy = require('../lib/Enums/Strategy');

module.exports = {
    armies: [
        {
            strategy: Strategy.RANDOM,
            squads: 4,
            units: 6
        },
        {
            strategy: Strategy.STRONGEST,
            squads: 7,
            units: 9
        },
        {
            strategy: Strategy.WEAKEST,
            squads: 3,
            units: 5
        }
    ]
};