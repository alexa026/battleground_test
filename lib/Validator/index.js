const MIN_ARMIES = 2;
const MIN_SQUADS = 2;
const MIN_UNITS = 5;
const MAX_UNITS = 10;


module.exports.validate = function (config) {
    return !((config.armies && config.armies.length < MIN_ARMIES) || !validateArmies(config));

};

let validateArmies = function (config) {
    const {armies} = config;
    for (let i = 0, len = config.armies.length; i < len; i++) {
        let army = armies[i];

        if (army.squads < MIN_SQUADS || army.units < MIN_UNITS || army.units > MAX_UNITS) {
            return false;
        }
    }
    return true;
};