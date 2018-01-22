const mocha = require('mocha'),
    chai = require('chai'),
    sinon = require('sinon'),
    Battleground = require('../lib/Service/Battleground'),
    Army = require('../lib/Models/Army'),
    config = require('../config/config');

chai.should();

describe('Battleground', () => {
    let _battleground;

    before(() => {
        _battleground = new Battleground(config);
    });

    it('gives the list of active armies', () => {
        _battleground.armies = [
            {
                'haveActiveSquads': sinon.stub().returns(true)
            },
             {
                'haveActiveSquads': sinon.stub().returns(true)
            },
             {
                'haveActiveSquads': sinon.stub().returns(true)
            },
        ];


        _battleground.getActiveArmies()
            .should.have.property('length').that.equals(3);
    });

    it('create armies', () => {
        let stub = sinon.stub(Army, 'prototype').returns(true);
        let logStub = sinon.stub(console, 'log');
        _battleground.createArmies();
        stub.restore();
        logStub.restore();
        _battleground.armies.should.have.property('length').that.equals(3);

    });

    it('returns the number of armies left', () => {
        let stub = sinon.stub(_battleground, 'getActiveArmies').returns([true, true]);
        _battleground.armiesLeft().should.equal(2);
        stub.restore();
    });

    it('checks if victory condition is met', () => {
        let stub = sinon.stub(_battleground, 'armiesLeft').returns(1);
        _battleground.victoryConditionMet().should.equal(true);
        stub.restore();
    });

    it('gives the winner index', () => {
        _battleground.armies = [
            {
                'haveActiveSquads': sinon.stub().returns(false)
            },
            {
                'haveActiveSquads': sinon.stub().returns(false)
            },
            {
                'haveActiveSquads': sinon.stub().returns(true)
            },
        ];


        _battleground.getWinner()
            .should.equal(2);
    });

    it('gives the opponent for the army', () => {
        let army = sinon.stub(),
            opponent = sinon.stub();

        let stub = sinon.stub(_battleground, 'getActiveArmies').returns([
            army,
            opponent
        ]);

        _battleground.findOpponentArmyFor(army).should.equal(opponent);

        stub.restore();
    });

    it('start battle', () => {
        let inactiveArmy = {
            'haveActiveSquads': sinon.stub().returns(false),
            'fightWith': sinon.stub()
        };
        let logStub = sinon.stub(console, 'log');


        _battleground.armies = [
            inactiveArmy,
            {
                'haveActiveSquads': sinon.stub().returns(true),
                'fightWith': sinon.stub()
            },
            {
                'haveActiveSquads': sinon.stub().returns(true),
                'fightWith': sinon.stub()
            },
        ];

        let findOpponentStub = sinon.stub(_battleground, 'findOpponentArmyFor').returns(inactiveArmy);
        let armiesLeftStub = sinon.stub(_battleground, 'armiesLeft').returns(1);
        let victoryConditionMetStub = sinon.stub(_battleground, 'victoryConditionMet').returns(true);
        let getWinnerStub = sinon.stub(_battleground, 'getWinner').returns(2);

        _battleground.startBattle().should.equal(2);

        findOpponentStub.restore();
        armiesLeftStub.restore();
        victoryConditionMetStub.restore();
        getWinnerStub.restore();
        logStub.restore();
    });
});