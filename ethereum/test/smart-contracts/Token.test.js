const { expectRevert } = require('openzeppelin-test-helpers');
const Web3 = require('Web3');
const Token = artifacts.require('Token');

contract.only('Token Smart Contract', (accounts) => {
  let token;
  const contractVersion = '1.0.0';
  const owner = accounts[0];
  const companyAddress = accounts[1];
  const tokenName = 'Thankly Coin';
  const tokenSymbol = 'THX';

  beforeEach(async () => {
    token = await Token.new();
    await token.initialize(contractVersion, owner);
  })
  
  describe('"initialize" method is called', () => {
    it(`should set version`, async () => {
      const version = await token.version()

      assert.equal(contractVersion, version);
    })

    it('should revert if the contract is already initialized', async () => {
      await expectRevert.unspecified(
        token.initialize(contractVersion, owner)
      );
    })
  })

  describe('"create" method is called', () => {
    it('should create a new token', async () => {
      await token.create(tokenName, tokenSymbol, { from: companyAddress })
      const {
        name,
        symbol,
        minted,
        transfered,
        burned,
        paused,
        registered
      } = await token.token(companyAddress)
      assert.equal(name, tokenName);
      assert.equal(symbol, tokenSymbol);
      assert.equal(minted, 0);
      assert.equal(transfered, 0);
      assert.equal(burned, 0);
      assert.equal(paused, false);
      assert.equal(registered, true);
    })

    it('should revert if the token is registered', async () => {
      const newTokenName = 'Thankly Dollar';
      const newTokenSymbol = 'THXD';
      await token.create(tokenName, tokenSymbol, { from: companyAddress })
      await expectRevert.unspecified(
        token.create(newTokenName, newTokenSymbol, { from: companyAddress })
      );
    })
  })

  describe('"modifyName" method is called', () => {
    it('should modify the name of a registered token', async () => {
      const newTokenName = 'Thankly Dollar';
      await token.create(tokenName, tokenSymbol, { from: companyAddress })
      await token.modifyName(newTokenName, { from: companyAddress })
      const { name } = await token.token(companyAddress)
      assert.equal(name, newTokenName);
    })

    it('should revert if the token is not registered', async () => {
      await expectRevert.unspecified(
        token.modifyName(tokenName, { from: companyAddress })
      );
    })
  })

  describe('"modifySymbol" method is called', () => {
    it('should modify the name of a registered token', async () => {
      const newTokenSymbol = 'THXD';
      await token.create(tokenName, tokenSymbol, { from: companyAddress })
      await token.modifySymbol(newTokenSymbol, { from: companyAddress })
      const { symbol } = await token.token(companyAddress)
      assert.equal(symbol, newTokenSymbol);
    })

    it('should revert if the token is not registered', async () => {
      await expectRevert.unspecified(
        token.modifyName(tokenSymbol, { from: companyAddress })
      );
    })
  })

  describe('"modifyPausedStatus" method is called', () => {
    it('should modify the paused status of a registered token', async () => {
      await token.create(tokenName, tokenSymbol, { from: companyAddress })
      await token.modifyPausedStatus(true, { from: companyAddress })
      const { paused } = await token.token(companyAddress)
      assert.equal(paused, true);
    })

    it('should revert if the token is not registered', async () => {
      await expectRevert.unspecified(
        token.modifyPausedStatus(true, { from: companyAddress })
      );
    })
  })

  describe('"mint" method is called', () => {
    it('should increase minted tokens of a registered token', async () => {
      const amount = 10;
      await token.create(tokenName, tokenSymbol, { from: companyAddress })
      await token.mint(amount, { from: companyAddress })
      const { minted } = await token.token(companyAddress)
      assert.equal(minted, amount);
    })

    it('should revert if the token is paused', async () => {
      await token.create(tokenName, tokenSymbol, { from: companyAddress })
      await token.modifyPausedStatus(true, { from: companyAddress })
      await expectRevert.unspecified(
        token.mint(10, { from: companyAddress })
      );
    })

    it('should revert if the token is not registered', async () => {
      await expectRevert.unspecified(
        token.mint(10, { from: companyAddress })
      );
    })
  })

  describe('"transfer" method is called', () => {
    it('should increase transfered tokens of a registered token', async () => {
      const amount = 10;
      await token.create(tokenName, tokenSymbol, { from: companyAddress })
      await token.transfer(companyAddress, amount, { from: owner })
      const { transfered } = await token.token(companyAddress)
      assert.equal(transfered, amount);
    })

    it('should revert if the token is paused', async () => {
      await token.create(tokenName, tokenSymbol, { from: companyAddress })
      await token.modifyPausedStatus(true, { from: companyAddress })
      await expectRevert.unspecified(
        token.transfer(companyAddress, 10, { from: owner })
      );
    })

    it('should revert if not called by owner', async () => {
      await token.create(tokenName, tokenSymbol, { from: companyAddress })
      await expectRevert.unspecified(
        token.transfer(companyAddress, 10, { from: companyAddress })
      );
    })

    it('should revert if the token is not registered', async () => {
      await expectRevert.unspecified(
        token.transfer(owner, 10, { from: owner })
      );
    })
  })

  describe('"burn" method is called', () => {
    it('should increase burned tokens of a registered token', async () => {
      const amount = 10;
      await token.create(tokenName, tokenSymbol, { from: companyAddress })
      await token.burn(companyAddress, amount, { from: owner })
      const { burned } = await token.token(companyAddress)
      assert.equal(burned, amount);
    })

    it('should revert if the token is paused', async () => {
      await token.create(tokenName, tokenSymbol, { from: companyAddress })
      await token.modifyPausedStatus(true, { from: companyAddress })
      await expectRevert.unspecified(
        token.burn(companyAddress, 10, { from: owner })
      );
    })

    it('should revert if not called by owner', async () => {
      await token.create(tokenName, tokenSymbol, { from: companyAddress })
      await expectRevert.unspecified(
        token.burn(companyAddress, 10, { from: companyAddress })
      );
    })

    it('should revert if the token is not registered', async () => {
      await expectRevert.unspecified(
        token.burn(owner, 10, { from: owner })
      );
    })
  })
})
