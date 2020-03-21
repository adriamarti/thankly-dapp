const { BN, expectEvent, expectRevert } = require('openzeppelin-test-helpers');
const web3 = require('web3');
const { ObjectId } = require('mongoose').Types;
const ThanklyToken = artifacts.require('ThanklyToken');

contract('ThanklyToken', (accounts) => {
  let token;
  const company = accounts[0];
  const otherAccount = accounts[1];
  const currencyName = 'Claire Joster Coins';
  const currencySymbol = 'CJC';

  beforeEach(async () => {
    token = await ThanklyToken.new(currencyName, currencySymbol, { from: company });
  })

  describe.only(`Created Token with "${currencyName}" as the currencyName param and "${currencySymbol}" as the currencySymbol param`, () => {
    it(`should create a new token with the name "${currencyName}"`, async () => {
      const createdTokenName = await token.name();

      assert.equal(createdTokenName, currencyName);
    })

    it(`should create a new token with the symbol "${currencySymbol}"`, async () => {
      const createdTokenSymbol = await token.symbol();

      assert.equal(createdTokenSymbol, currencySymbol);
    })

    it('should create a new token with an initial total supply of 0', async () => {
      const createdTokenTotalSupply= await token.totalSupply();

      assert.equal(createdTokenTotalSupply, 0);
    })

    describe('registerWorker method', () => {
      describe('called by the owner of the token', () => {
        it('should register a new worker with a balance of 0 tokens', async () => {
          const workerId = web3.utils.sha3(ObjectId().toString());
          await token.registerWorker(workerId, { from: company });
          const isWorkerRegiestered = await token.registered(workerId);
          const workeRBalance = await token.balance(workerId);
    
          assert.equal(isWorkerRegiestered, true);
          assert.equal(workeRBalance, 0);
        })

        it('should emmit an event', async () => {
          const workerId = web3.utils.sha3(ObjectId().toString());
          const { logs } = await token.registerWorker(workerId, { from: company });

          expectEvent.inLogs(logs, 'RegisteredWorker', { id: workerId });
        })
      })

      describe('NOT called by the owner of the token', () => {
        it('should revert the transaction', async () => {
          const workerId = web3.utils.sha3(ObjectId().toString());
          
          await expectRevert.unspecified(
            token.registerWorker(workerId, { from: otherAccount })
          );
        })
      })

      describe('called by owner of the token', () => {
        it('should register a new worker with a balance of 0 tokens', async () => {
          const workerId = web3.utils.sha3(ObjectId().toString());
          await token.registerWorker(workerId, { from: company });
          const isWorkerRegiestered = await token.registered(workerId);
          const workeRBalance = await token.balance(workerId);
    
          assert.equal(isWorkerRegiestered, true);
          assert.equal(workeRBalance, 0);
        })
      })
    })

    describe('transferTokensFromCompanyToWorker method', () => {
      describe('called by the owner of the token', () => {
        it('should increase the balance if the worker is alreay registered', async () => {
          const workerId = web3.utils.sha3(ObjectId().toString());
          const amount = new BN(12);
          await token.registerWorker(workerId, { from: company });
          await token.transferTokensFromCompanyToWorker(workerId, amount, { from: company });
          const workerBalance = await token.balance(workerId);
          
          assert.equal(workerBalance.toString(), amount.toString());
        })

        it('should increase the total supply if the worker is alreay registered', async () => {
          const workerId = web3.utils.sha3(ObjectId().toString());
          const amount = new BN(12);
          await token.registerWorker(workerId, { from: company });
          await token.transferTokensFromCompanyToWorker(workerId, amount, { from: company });
          const totalSupply = await token.totalSupply();
          
          assert.equal(amount.toString(), totalSupply.toString());
        })

        it('should emmit an event if the worker is alreay registered', async () => {
          const workerId = web3.utils.sha3(ObjectId().toString());
          const amount = new BN(12);
          await token.registerWorker(workerId, { from: company });
          const { logs } = await token.transferTokensFromCompanyToWorker(workerId, amount, { from: company });

          expectEvent.inLogs(
            logs,
            'TransferedTokensFromCompanyToWorker',
            { to: workerId, amount }
          );
        })

        it('should revert the transaction if the worker is NOT registered', async () => {
          const workerId = web3.utils.sha3(ObjectId().toString());
          const amount = new BN(12);

          await expectRevert.unspecified(
            token.transferTokensFromCompanyToWorker(workerId, amount, { from: company })
          );
        })
      })

      describe('NOT called by the owner of the token', () => {
        it('should revert the transaction', async () => {
          const workerId = web3.utils.sha3(ObjectId().toString());
          const amount = new BN(12);
          await token.registerWorker(workerId, { from: company });
          
          await expectRevert.unspecified(
            token.transferTokensFromCompanyToWorker(workerId, amount, { from: otherAccount }
          ));
        })
      })
    })

    describe('transferTokensFromWorkerToWorker method', () => {
      describe('called by a trusted address', () => {
        it('should transfer tokens to another registered worker if enough funds', async () => {
          const workerId1 = web3.utils.sha3(ObjectId().toString());
          const workerId2 = web3.utils.sha3(ObjectId().toString());
          const amount1 = new BN(12);
          const amount2 = new BN(8);
          await token.registerWorker(workerId1, { from: company });
          await token.registerWorker(workerId2, { from: company });
          await token.transferTokensFromCompanyToWorker(workerId1, amount1, { from: company });
          await token.transferTokensFromWorkerToWorker(workerId1, workerId2, amount2);
          const worker1Balance = await token.balance(workerId1);
          const worker2Balance = await token.balance(workerId2);
          const newWorker1Balance = (+amount1.toString()) - (+amount2.toString())
          
          assert.equal(worker1Balance.toString(), newWorker1Balance.toString());
          assert.equal(worker2Balance.toString(), amount2.toString());
        })

        it('should emmit an event if tokens are transfered to another registered worker', async () => {
          const workerId1 = web3.utils.sha3(ObjectId().toString());
          const workerId2 = web3.utils.sha3(ObjectId().toString());
          const amount1 = new BN(12);
          const amount2 = new BN(8);
          await token.registerWorker(workerId1, { from: company });
          await token.registerWorker(workerId2, { from: company });
          await token.transferTokensFromCompanyToWorker(workerId1, amount1, { from: company });
          const { logs } = await token.transferTokensFromWorkerToWorker(workerId1, workerId2, amount2);

          expectEvent.inLogs(
            logs,
            'TransferedTokensBetweenWorkers',
            { from: workerId1, to: workerId2, amount: amount2 }
          );
        })

        it('should revert the transaction if the worker emitter is NOT registered', async () => {
          const workerId1 = web3.utils.sha3(ObjectId().toString());
          const workerId2 = web3.utils.sha3(ObjectId().toString());
          const amount = new BN(12);

          await expectRevert.unspecified(
            token.transferTokensFromWorkerToWorker(workerId1, workerId2, amount)
          );
        })

        it('should revert the transaction if the worker receiver is NOT registered', async () => {
          const workerId1 = web3.utils.sha3(ObjectId().toString());
          const workerId2 = web3.utils.sha3(ObjectId().toString());
          const amount = new BN(12);
          await token.registerWorker(workerId1, { from: company });

          await expectRevert.unspecified(
            token.transferTokensFromWorkerToWorker(workerId1, workerId2, amount)
          );
        })

        it('should revert the transaction if the worker emisor does not have enough funds', async () => {
          const workerId1 = web3.utils.sha3(ObjectId().toString());
          const workerId2 = web3.utils.sha3(ObjectId().toString());
          const amount1 = new BN(8);
          const amount2 = new BN(12);
          await token.registerWorker(workerId1, { from: company });
          await token.registerWorker(workerId2, { from: company });
          await token.transferTokensFromCompanyToWorker(workerId1, amount1, { from: company });

          await expectRevert.unspecified(
            token.transferTokensFromWorkerToWorker(workerId1, workerId2, amount2)
          );
        })
      })
    })

    describe('burnTokens method', () => {
      describe('called by a trusted address', () => {
        it('should burn tokens from the worker if enough funds', async () => {
          const workerId = web3.utils.sha3(ObjectId().toString());
          const amount1 = new BN(12);
          const amount2 = new BN(8);
          await token.registerWorker(workerId, { from: company });
          await token.transferTokensFromCompanyToWorker(workerId, amount1, { from: company });
          await token.burnTokens(workerId, amount2);
          const workerBalance = await token.balance(workerId);
          const newWorkerBalance = (+amount1.toString()) - (+amount2.toString())
          
          assert.equal(workerBalance.toString(), newWorkerBalance.toString());
        })

        it('should emmit an event if tokens are burned from a registered worker', async () => {
          const workerId = web3.utils.sha3(ObjectId().toString());
          const amount1 = new BN(12);
          const amount2 = new BN(8);
          await token.registerWorker(workerId, { from: company });
          await token.transferTokensFromCompanyToWorker(workerId, amount1, { from: company });
          const { logs } = await token.burnTokens(workerId, amount2);

          expectEvent.inLogs(
            logs,
            'BurnedTokens',
            { from: workerId, amount: amount2 }
          );
        })

        it('should revert the transaction if the worker emitter is NOT registered', async () => {
          const workerId = web3.utils.sha3(ObjectId().toString());
          const amount = new BN(12);

          await expectRevert.unspecified(
            token.burnTokens(workerId, amount)
          );
        })

        it('should revert the transaction if the worker does not have enough funds', async () => {
          const workerId = web3.utils.sha3(ObjectId().toString());
          const amount1 = new BN(8);
          const amount2 = new BN(12);
          await token.registerWorker(workerId, { from: company });
          await token.transferTokensFromCompanyToWorker(workerId, amount1, { from: company });

          await expectRevert.unspecified(
            token.burnTokens(workerId, amount2)
          );
        })
      })
    })
  }) 
})
