const Sifrasia = artifacts.require("Sifrasia");

contract('Sifrasia Test', async(accounts) => {

    async function hatchCryptogotchi(sifrasia, owner, name, description, colorHex) {
        const hatchResult = sifrasia.hatchCryptogotchi(name, description, colorHex, {
            from: owner
        });
        return hatchResult;
    }

    function parseCryptogotchiHatchedEvent(txReceipt) {
        return txReceipt.logs[0].args;
    }

    it('Should allow cryptogotchi hatching', async() => {
        const sifrasia = await Sifrasia.deployed();
        const name = "Frozenfang";
        const description = "A tough cryptogotchi used to living in the cold";
        const colorHex = "0xffffff";
        const owner = accounts[0];
        const cryptoGotchiReceipt = await hatchCryptogotchi(sifrasia, owner, name, description, colorHex);
        const cryptogotchi = parseCryptogotchiHatchedEvent(cryptoGotchiReceipt);
        assert.equal(name, cryptogotchi._name);
        assert.equal(description, cryptogotchi._description);
        assert.equal(colorHex, cryptogotchi._colorHex);
        assert.equal(owner, cryptogotchi._owner);
    });

    it('Should fetch a cryptogotchi by the owner address', async() => {
        const sifrasia = await Sifrasia.deployed();
        const owner = accounts[0];
        const cryptogotchi = await sifrasia.getCryptogotchiByAddress(owner);
        assert.equal(cryptogotchi[0], owner);
    });

    it('Should fetch a cryptogotchi by its index', async() => {
        const sifrasia = await Sifrasia.deployed();
        const index = 0;
        const cryptogotchi = await sifrasia.getCryptogotchiByIndex(index);
        assert.equal(cryptogotchi[1].toString(), index.toString());
    });

    it('Should get the total cryptogotchi population in Sifrasia', async() => {
        const sifrasia = await Sifrasia.deployed();
        const expectedPopulation = 1;
        const population = await sifrasia.getCryptogotchiPopulationTotal();
        assert.equal(expectedPopulation.toString(), population.toString());
    });
});