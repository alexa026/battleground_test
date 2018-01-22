const mocha = require('mocha'),
    chai = require('chai'),
    sinon = require('sinon'),
    Squad = require('../lib/Models/Squad'),
    Unit = require('../lib/Models/Unit');

chai.should();

describe('Squad', () => {
    let _squad;
    const NUMBER_OF_UNITS = 2;

    before(() => {
        let logStub = sinon.stub(console, 'log');
        _squad = new Squad(NUMBER_OF_UNITS);
        logStub.restore();
    });

    it('have units assigned', () => {
        _squad.unitsGroup.should.have.property('length').that.equals(NUMBER_OF_UNITS);
        _squad.unitsGroup[0].should.be.instanceOf(Unit);
    });

    it('checks if squad is active', () => {
        _squad.unitsGroup = [
            { isActive: sinon.stub().returns(true) },
            { isActive: sinon.stub().returns(true) }
        ];

        _squad.isActive().should.equal(true);
    });

    it('calculates the success rate of the squad', () => {
        _squad.unitsGroup = [
            { isActive: sinon.stub().returns(true), getSuccessRate: sinon.stub().returns(2) },
            { isActive: sinon.stub().returns(true), getSuccessRate: sinon.stub().returns(3) }
        ];

        _squad.getSuccessRate().should.equal(36);
    });

    it('transfer damage to unit', () => {
        let takeDamageSpy = sinon.spy();

        _squad.unitsGroup = [
            { isActive: sinon.stub().returns(true), takeDamage: takeDamageSpy }
        ];

        _squad.takeDamage(5);

        takeDamageSpy.withArgs(5).calledOnce;
    });

    it('calculates the damage of the squad', () => {
        _squad.unitsGroup = [
            { isActive: sinon.stub().returns(true), getDamage: sinon.stub().returns(2) },
            { isActive: sinon.stub().returns(true), getDamage: sinon.stub().returns(3) }
        ];

        _squad.getDamage().should.equal(5);
    });

    it('attacks', () => {
        let opponentSquadStub = {
            getSuccessRate: sinon.stub().returns(2),
            takeDamage: sinon.spy()
        };

        let mySuccessRateStub = sinon.stub(_squad, 'getSuccessRate').returns(3);
        let myGetDamage = sinon.stub(_squad, 'getDamage').returns(5);

        _squad.attack(opponentSquadStub);

        opponentSquadStub.takeDamage.withArgs(5).calledOnce;

        mySuccessRateStub.restore();
        myGetDamage.restore();
    })
});