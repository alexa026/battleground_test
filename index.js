const Config = require('./config/config');
const Battleground = require('./lib/Service/Battleground');
const {validate} = require('./lib/Validator');


if (!validate(Config)) {
    console.log('Invalid configuration!');
    return;
}

let battle = new Battleground(Config);
battle.startBattle();