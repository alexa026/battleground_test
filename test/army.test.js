const mocha = require('mocha'),
    chai = require('chai'),
    sinon = require('sinon'),
    Army = require('../lib/Models/Army'),
    Squad = require('../lib/Models/Squad');

chai.should();

describe('Army', () => {
    let _army;
    const NUMBER_OF_SQUADS = 2;

    before(() => {
        let logStub = sinon.stub(console, 'log');
        _army = new Army('random', NUMBER_OF_SQUADS, 3);
        logStub.restore();
    });

    it('has squads assigned', () => {
        _army.squads.should.have.property('length').that.equals(NUMBER_OF_SQUADS);
        _army.squads[0].should.be.instanceOf(Squad);
    });

    it('returns the list of active squads', () => {
        _army.squads = [
            { isActive: sinon.stub().returns(true) },
            { isActive: sinon.stub().returns(true) },
            { isActive: sinon.stub().returns(false) }
        ];

        _army.getListOfActiveSquads().should.have.property('length').that.equals(2);
    });

    it('indicates if there is an active squad', () => {
        let stub = sinon.stub(_army, 'getListOfActiveSquads').returns([true, true, true]);

        _army.haveActiveSquads().should.equal(true);

        stub.restore();
    });

    it('return the strongest squad', () => {
        const strongestSquad = {
            getDamage: sinon.stub().returns(8),
            isActive: sinon.stub.returns(true)
        };

        let getListOfActiveSquadsStub = sinon.stub(_army, 'getListOfActiveSquads')
            .returns([
                strongestSquad,
                { getDamage: sinon.stub().returns(1), isActive: sinon.stub.returns(true) },
                { getDamage: sinon.stub().returns(5), isActive: sinon.stub.returns(true) }
            ]);

        _army.getStrongestSquad().should.equal(strongestSquad);
        getListOfActiveSquadsStub.restore();
    });

    it('return the weakest squad', () => {
        const weakestSquad = {
            getDamage: sinon.stub().returns(1),
            isActive: sinon.stub.returns(true)
        };

        let getListOfActiveSquadsStub = sinon.stub(_army, 'getListOfActiveSquads')
            .returns([
                weakestSquad,
                { getDamage: sinon.stub().returns(8), isActive: sinon.stub.returns(true) },
                { getDamage: sinon.stub().returns(5), isActive: sinon.stub.returns(true) }
            ]);

        _army.getWeakestSquad().should.equal(weakestSquad);
        getListOfActiveSquadsStub.restore();
    });

    it('returns the random squad', () => {
        const squad1 = { getDamage: sinon.stub().returns(8), isActive: sinon.stub.returns(true) };
        const squad2 = { getDamage: sinon.stub().returns(5), isActive: sinon.stub.returns(true) };
        let getListOfActiveSquadsStub = sinon.stub(_army, 'getListOfActiveSquads')
            .returns([
                squad1, squad2
            ]);

        _army.getWeakestSquad().should.satisfy((result) => {
            return result === squad1 || result === squad2;
        });
        getListOfActiveSquadsStub.restore();
    });

    it('fights with another squad', () => {
        let army = {
            haveActiveSquads: sinon.stub().returns(true),
            getOpponent: sinon.stub().returns({})
        };

        let attackSpy = sinon.spy();

        let getListOfActiveSquadsStub = sinon.stub(_army, 'getListOfActiveSquads')
            .returns([
                { isActive: sinon.stub.returns(true), attack: attackSpy }
            ]);

        _army.fightWith(army);

        attackSpy.withArgs({}).calledOnce;
        getListOfActiveSquadsStub.restore();
    });
});