const {
  BN,
  expectEvent,
  expectRevert,
  balance
} = require('openzeppelin-test-helpers');
const Web3 = require('Web3');
const { ObjectId } = require('mongoose').Types;
const ThanklyToken = artifacts.require('ThanklyToken');
const web3 = new Web3(Web3.givenProvider || 'ws://127.0.0.1:7545');

contract('ThanklyToken', (accounts) => {
  let thanklyToken;
  const initialSellingPercentage = 10;
  const initialTokenValueConversion = Web3.utils.toWei('1', 'shannon');
  const owner = accounts[0];
  const company = accounts[1];
  const otherAccount = accounts[2];
  const trustedAccount = accounts[3];
  const currencyName = 'Claire Joster Coins';
  const currencySymbol = 'CJC';
  const workerId1 = Web3.utils.sha3(ObjectId().toString());
  const workerId2 = Web3.utils.sha3(ObjectId().toString());
  const amountToTransferFromCompanyToWorker = 10;
  const amountToTransferFromWorkerToWorker = 5;

  beforeEach(async () => {
    thanklyToken = await ThanklyToken.new({ from: owner });
  })
  
  describe('initialize() is called', () => {
    beforeEach(async () => {
      await thanklyToken.initialize(owner);
    })

    it(`should have transferred the ownership to ${owner} if not previously initialized`, async () => {
      const newOwner = await thanklyToken.owner()

      assert.equal(owner, newOwner);
    })

    it('should revert if the contract is already initialized', async () => {
      await expectRevert.unspecified(
        thanklyToken.initialize(owner)
      );
    })
  })

  describe('setSellingPercentage() is called', () => {
    describe('and the contract is already initialized', () => {
      beforeEach(async () => {
        await thanklyToken.initialize(owner);
      })

      describe('and it\'s called by the owner', () => {
        it(`should set to ${initialSellingPercentage}% the sellingPercentage`, async () => {
          await thanklyToken.setSellingPercentage(initialSellingPercentage, { from: owner });
          const sellingPercentage = await thanklyToken.sellingPercentage();
          assert.equal(sellingPercentage, initialSellingPercentage);
        })
      })

      describe('and it\'s NOT called by the owner', () => {
        it(`should revert the transaction`, async () => {
          await expectRevert.unspecified(
            thanklyToken.setSellingPercentage(initialSellingPercentage, { from: otherAccount })
          );
        })
      })
    })

    describe('and the contract is NOT already initialized', () => {
      it('should revert the transaction', async () => {
        await expectRevert.unspecified(
          thanklyToken.setSellingPercentage(initialSellingPercentage, { from: owner })
        );
      })
    })
  })

  describe('setTokenValueConversion() is called', () => {
    describe('and the contract is already initialized', () => {
      beforeEach(async () => {
        await thanklyToken.initialize(owner);
      })

      describe('and it\'s called by the owner', () => {
        it(`should set to ${initialTokenValueConversion} the tokenValueConversion`, async () => {
          await thanklyToken.setTokenValueConversion(initialTokenValueConversion, { from: owner });
          const tokenValueConversion = await thanklyToken.tokenValueConversion();
          assert.equal(tokenValueConversion, initialTokenValueConversion);
        })
      })

      describe('and it\'s NOT called by the owner', () => {
        it(`should revert the transaction`, async () => {
          await expectRevert.unspecified(
            thanklyToken.setTokenValueConversion(initialTokenValueConversion, { from: otherAccount })
          );
        })
      })
    })

    describe('and the contract is NOT already initialized', () => {
      it('should revert the transaction', async () => {
        await expectRevert.unspecified(
          thanklyToken.setTokenValueConversion(initialTokenValueConversion, { from: owner })
        );
      })
    })
  })

  describe('setTrustedSigner() is called', () => {
    describe('and the contract is already initialized', () => {
      beforeEach(async () => {
        await thanklyToken.initialize(owner);
      })

      describe('and it\'s called by the owner', () => {
        it(`should set to ${otherAccount} as a trusted signer account`, async () => {
          const { receipt } = await thanklyToken.setTrustedSigner(otherAccount, { from: owner });
          assert.equal(receipt.status, true);
        })
      })

      describe('and it\'s NOT called by the owner', () => {
        it(`should revert the transaction`, async () => {
          await expectRevert.unspecified(
            thanklyToken.setTrustedSigner(otherAccount, { from: otherAccount })
          );
        })
      })
    })

    describe('and the contract is NOT already initialized', () => {
      it('should revert the transaction', async () => {
        await expectRevert.unspecified(
          thanklyToken.setTrustedSigner(otherAccount, { from: owner })
        );
      })
    })
  })

  describe('createToken() is called', () => {
    describe('and the contract is already initialized', () => {
      beforeEach(async () => {
        await thanklyToken.initialize(owner);
      })

      describe('and selling percetage is already defined', () => {
        beforeEach(async () => {
          await thanklyToken.setSellingPercentage(initialSellingPercentage, { from: owner });
        })

        it(`should create a token with name: ${currencyName}`, async () => {
          await thanklyToken.createToken(currencyName, currencySymbol, { from: company })
          const { name } = await thanklyToken.companyToken(company)
          assert.equal(name, currencyName);
        })

        it('should create a token with active: true', async () => {
          await thanklyToken.createToken(currencyName, currencySymbol, { from: company })
          const { active } = await thanklyToken.companyToken(company)
          assert.equal(active, true);
        })

        it('should create a token with registered: true', async () => {
          await thanklyToken.createToken(currencyName, currencySymbol, { from: company })
          const { registered } = await thanklyToken.companyToken(company)
          assert.equal(registered, true);
        })
      })

      describe('and selling percetage is NOT already defined', () => {
        it('should revert the transaction', async () => {
          await expectRevert.unspecified(
            thanklyToken.createToken(currencyName, currencySymbol, { from: company })
          );
        })
      })
    })

    describe('and the contract is NOT already initialized', () => {
      it('should revert the transaction', async () => {
        await expectRevert.unspecified(
          thanklyToken.createToken(currencyName, currencySymbol, { from: company })
        );
      })
    })
  })

  describe('setTokenActive() is called', () => {
    describe('and the contract is already initialized', () => {
      beforeEach(async () => {
        await thanklyToken.initialize(owner);
      })

      describe('and token exists', () => {
        beforeEach(async () => {
          await thanklyToken.setSellingPercentage(initialSellingPercentage, { from: owner });
          await thanklyToken.createToken(currencyName, currencySymbol, { from: company })
        })

        it('should change the active if different from the current one', async () => {
          const newActiveStatus = false;
          await thanklyToken.setTokenActive(newActiveStatus, { from: company })
          const { active } = await thanklyToken.companyToken(company)
          assert.equal(active, newActiveStatus);
        })

        it('should revert the transaction if equal from the current one', async () => {
          await expectRevert.unspecified(
            thanklyToken.setTokenActive(true, { from: company })
          );
        })
      })

      describe('and token does NOT exist', () => {
        it('should revert the transaction', async () => {
          await expectRevert.unspecified(
            thanklyToken.setTokenActive(false, { from: company })
          );
        })
      })
    })

    describe('and the contract is NOT already initialized', () => {
      it('should revert the transaction', async () => {
        await expectRevert.unspecified(
          thanklyToken.setTokenActive(false, { from: company })
        );
      })
    })
  })

  describe('registerWorker() is called', () => {
    describe('and the contract is already initialized', () => {
      beforeEach(async () => {
        await thanklyToken.initialize(owner);
      })

      describe('and token exists', () => {
        beforeEach(async () => {
          await thanklyToken.setSellingPercentage(initialSellingPercentage, { from: owner });
          await thanklyToken.createToken(currencyName, currencySymbol, { from: company })
        })

        describe('and token is active', () => {
          describe('and worker is not already registered', () => {
            beforeEach(async () => {
              await thanklyToken.registerWorker(workerId1, { from: company })
            })

            it('should map the worker id with the company address', async () => {
              const companyAddress = await thanklyToken.workerCompanyAddress(workerId1)
              assert.equal(companyAddress, company);
            })

            it('should have an initial balance of 0 (transferableTokens and burnableTokens) when calling workerBalance()', async () => {
              const { transferableTokens, burnableTokens }  = await thanklyToken.workerBalance(workerId1, company)
              assert.equal(transferableTokens, 0);
              assert.equal(burnableTokens, 0);
            })
          })

          describe('and worker is already registered', () => {
            beforeEach(async () => {
              await thanklyToken.registerWorker(workerId1, { from: company })
            })
  
            it('should revert the transaction', async () => {
              await expectRevert.unspecified(
                thanklyToken.registerWorker(workerId1, { from: company })
              );
            })
          })
        })

        describe('and token is inactive', () => {
          beforeEach(async () => {
            await thanklyToken.setTokenActive(false, { from: company })
          })

          it('should revert the transaction', async () => {
            await expectRevert.unspecified(
              thanklyToken.registerWorker(workerId1, { from: company })
            );
          })
        })
      })

      describe('and token does NOT exist', () => {
        it('should revert the transaction', async () => {
          await expectRevert.unspecified(
            thanklyToken.registerWorker(workerId1, { from: company })
          );
        })
      })
    })

    describe('and the contract is NOT already initialized', () => {
      it('should revert the transaction', async () => {
        await expectRevert.unspecified(
          thanklyToken.registerWorker(workerId1, { from: company })
        );
      })
    })
  })

  describe('transferTokensFromCompanyToWorker() is called', () => {
    describe('and the contract is already initialized', () => {
      beforeEach(async () => {
        await thanklyToken.initialize(owner);
      })

      describe('and token exists', () => {
        beforeEach(async () => {
          await thanklyToken.setSellingPercentage(initialSellingPercentage, { from: owner });
          await thanklyToken.createToken(currencyName, currencySymbol, { from: company })
        })

        describe('and token is active', () => {
          describe('and token conversion values is defined', () => {
            beforeEach(async () => {
              await thanklyToken.setTokenValueConversion(initialTokenValueConversion, { from: owner });
            })

            describe('and worker is already registered', () => {
              beforeEach(async () => {
                await thanklyToken.registerWorker(workerId1, { from: company })
              })
              
              describe('and company has send enough ether for the transaction', () => {
                it('should transfer tokens to the worker', async () => {
                  const transacionCost = amountToTransferFromCompanyToWorker * initialTokenValueConversion;
                  const transactionFee = transacionCost * initialSellingPercentage / 100;
                  const totalTransactionCost = `${transacionCost + transactionFee}`;

                  await thanklyToken.transferTokensFromCompanyToWorker(
                    workerId1, amountToTransferFromCompanyToWorker,
                    { from: company, value: totalTransactionCost }
                  )

                  const { transferableTokens }  = await thanklyToken.workerBalance(workerId1, company)
                  assert.equal(transferableTokens, amountToTransferFromCompanyToWorker);
                  const contractBalance = await web3.eth.getBalance(thanklyToken.address);
                  assert.equal(contractBalance, totalTransactionCost);
                })
              })

              describe('and company has send to much ether for the transaction', () => {
                it('should refund the extra ether to the sender', async () => {
                  const transacionCost = amountToTransferFromCompanyToWorker * initialTokenValueConversion;
                  const transactionFee = transacionCost * initialSellingPercentage / 100;
                  const totalTransactionCost = `${transacionCost + transactionFee}`;
                  const extraEtherTransaction = `${transacionCost + transactionFee + transactionFee }`

                  await thanklyToken.transferTokensFromCompanyToWorker(
                    workerId1, amountToTransferFromCompanyToWorker,
                    { from: company, value: extraEtherTransaction }
                  )

                  const { transferableTokens }  = await thanklyToken.workerBalance(workerId1, company)
                  assert.equal(transferableTokens, amountToTransferFromCompanyToWorker);
                  const contractBalance = await web3.eth.getBalance(thanklyToken.address);
                  assert.equal(contractBalance, totalTransactionCost);
                })
              })

              describe('and company has NOT send enough ether for the transaction', () => {
                it('should revert the transaction', async () => {
                  await expectRevert.unspecified(
                    thanklyToken.transferTokensFromCompanyToWorker(
                      workerId1, amountToTransferFromCompanyToWorker,
                      { from: company, value: Web3.utils.toWei('1', 'shannon') }
                    )
                  );
                })
              })
            })

            describe('and worker is NOT registered', () => {
              it('should revert the transaction', async () => {
                await expectRevert.unspecified(
                  thanklyToken.transferTokensFromCompanyToWorker(
                    workerId1, amountToTransferFromCompanyToWorker, { from: company }
                  )
                );
              })
            })
          })

          describe('and token conversion values is NOT defined', () => {
            it('should revert the transaction', async () => {
              await expectRevert.unspecified(
                thanklyToken.transferTokensFromCompanyToWorker(
                  workerId1, amountToTransferFromCompanyToWorker, { from: company }
                )
              );
            })
          })
        })

        describe('and token is inactive', () => {
          beforeEach(async () => {
            await expectRevert.unspecified(
              thanklyToken.transferTokensFromCompanyToWorker(
                workerId1, amountToTransferFromCompanyToWorker, { from: company }
              )
            );
          })

          it('should revert the transaction', async () => {
            await expectRevert.unspecified(
              thanklyToken.transferTokensFromCompanyToWorker(
                workerId1, amountToTransferFromCompanyToWorker, { from: company }
              )
            );
          })
        })
      })

      describe('and token does NOT exist', () => {
        it('should revert the transaction', async () => {
          await expectRevert.unspecified(
            thanklyToken.transferTokensFromCompanyToWorker(
              workerId1, amountToTransferFromCompanyToWorker, { from: company }
            )
          );
        })
      })
    })

    describe('and the contract is NOT already initialized', () => {
      it('should revert the transaction', async () => {
        await expectRevert.unspecified(
          thanklyToken.transferTokensFromCompanyToWorker(
            workerId1, amountToTransferFromCompanyToWorker, { from: company }
          )
        );
      })
    })
  })

  describe('transferTokensFromWorkerToWorker() is called', () => {
    describe('and the contract is already initialized', () => {
      beforeEach(async () => {
        await thanklyToken.initialize(owner);
      })

      describe('and token exists', () => {
        beforeEach(async () => {
          await thanklyToken.setTokenValueConversion(initialTokenValueConversion, { from: owner });
          await thanklyToken.setSellingPercentage(initialSellingPercentage, { from: owner });
          await thanklyToken.createToken(currencyName, currencySymbol, { from: company })
        })

        describe('and token is active', () => {
          describe('and worker emitter is already registered', () => {
            beforeEach(async () => {
              await thanklyToken.registerWorker(workerId1, { from: company });
            })

            describe('and worker receiver is already registered', () => {
              beforeEach(async () => {
                await thanklyToken.registerWorker(workerId2, { from: company });
              })

              describe('and worker emitter has enough tokens', () => {
                beforeEach(async () => {
                  const transacionCost = amountToTransferFromCompanyToWorker * initialTokenValueConversion;
                  const transactionFee = transacionCost * initialSellingPercentage / 100;
                  const totalTransactionCost = `${transacionCost + transactionFee}`;

                  await thanklyToken.transferTokensFromCompanyToWorker(
                    workerId1, amountToTransferFromCompanyToWorker,
                    { from: company, value: totalTransactionCost }
                  )
                })

                describe('and trusted signer is valid', () => {
                  beforeEach(async () => {
                    await thanklyToken.setTrustedSigner(trustedAccount, { from: owner })
                  })

                  it('should transfer tokens from worker emitter to worker receiver', async () => {
                    const worker1InitialBalance = await thanklyToken.workerBalance(workerId1, company)
                    const worker2InitialBalance = await thanklyToken.workerBalance(workerId2, company)
                    await thanklyToken.transferTokensFromWorkerToWorker(
                      workerId1, workerId2, company, amountToTransferFromWorkerToWorker, { from: trustedAccount }
                    )
                    const worker1EndBalance = await thanklyToken.workerBalance(workerId1, company)
                    const worker2EndBalance = await thanklyToken.workerBalance(workerId2, company)
  
                    assert.equal(
                      worker1InitialBalance.transferableTokens,
                      (+worker1EndBalance.transferableTokens) + (+amountToTransferFromWorkerToWorker)
                    );
                    assert.equal(
                      (+worker2InitialBalance.burnableTokens) + (+amountToTransferFromWorkerToWorker),
                      worker2EndBalance.burnableTokens
                    );
                  })
                })

                describe('and trusted signer is NOT valid', () => {
                  it('should revert the transaction', async () => {
                    await expectRevert.unspecified(
                      thanklyToken.transferTokensFromWorkerToWorker(
                        workerId1, workerId2, company, amountToTransferFromWorkerToWorker, { from: trustedAccount }
                      )
                    );
                  })
                })
              })

              describe('and worker emitter do NOT have enough tokens', () => {
                it('should revert the transaction', async () => {
                  await expectRevert.unspecified(
                    thanklyToken.transferTokensFromWorkerToWorker(
                      workerId1, workerId2, company, amountToTransferFromWorkerToWorker, { from: trustedAccount }
                    )
                  );
                })
              })
            })

            describe('and worker receiver is NOT already registered', () => {
              it('should revert the transaction', async () => {
                await expectRevert.unspecified(
                  thanklyToken.transferTokensFromWorkerToWorker(
                    workerId1, workerId2, company, amountToTransferFromWorkerToWorker, { from: trustedAccount }
                  )
                );
              })
            })
          })

          describe('and worker emitter is NOT already registered', () => {
            it('should revert the transaction', async () => {
              await expectRevert.unspecified(
                thanklyToken.transferTokensFromWorkerToWorker(
                  workerId1, workerId2, company, amountToTransferFromWorkerToWorker, { from: trustedAccount }
                )
              );
            })
          })
        });

        describe('and token is inactive', () => {
          beforeEach(async () => {
            await expectRevert.unspecified(
              thanklyToken.transferTokensFromWorkerToWorker(
                workerId1, workerId2, company, amountToTransferFromWorkerToWorker, { from: trustedAccount }
              )
            );
          })

          it('should revert the transaction', async () => {
            await expectRevert.unspecified(
              thanklyToken.transferTokensFromWorkerToWorker(
                workerId1, workerId2, company, amountToTransferFromWorkerToWorker, { from: trustedAccount }
              )
            );
          })
        })
      })

      describe('and token does NOT exist', () => {
        it('should revert the transaction', async () => {
          await expectRevert.unspecified(
            thanklyToken.transferTokensFromWorkerToWorker(
              workerId1, workerId2, company, amountToTransferFromWorkerToWorker, { from: trustedAccount }
            )
          );
        })
      })
    })

    describe('and the contract is NOT already initialized', () => {
      it('should revert the transaction', async () => {
        await expectRevert.unspecified(
          thanklyToken.transferTokensFromWorkerToWorker(
            workerId1, workerId2, company, amountToTransferFromWorkerToWorker, { from: trustedAccount }
          )
        );
      })
    })
  })

  describe('burnTokens() is called', () => {
    describe('and the contract is already initialized', () => {
      beforeEach(async () => {
        await thanklyToken.initialize(owner);
      })

      describe('and token exists', () => {
        beforeEach(async () => {
          await thanklyToken.setTokenValueConversion(initialTokenValueConversion, { from: owner });
          await thanklyToken.setSellingPercentage(initialSellingPercentage, { from: owner });
          await thanklyToken.createToken(currencyName, currencySymbol, { from: company });
        })

        describe('and token is active', () => {
          describe('and worker is already registered', () => {
            beforeEach(async () => {
              await thanklyToken.registerWorker(workerId2, { from: company });
              await thanklyToken.registerWorker(workerId1, { from: company });
              await thanklyToken.setTrustedSigner(trustedAccount, { from: owner });
            })

            describe('and worker has enough burnable tokens', () => {
              beforeEach(async () => {
                const transacionCost = amountToTransferFromCompanyToWorker * initialTokenValueConversion;
                const transactionFee = transacionCost * initialSellingPercentage / 100;
                const totalTransactionCost = `${transacionCost + transactionFee}`;

                await thanklyToken.transferTokensFromCompanyToWorker(
                  workerId2, amountToTransferFromCompanyToWorker,
                  { from: company, value: totalTransactionCost }
                );
                await thanklyToken.transferTokensFromWorkerToWorker(
                  workerId2, workerId1, company, 1, { from: trustedAccount }
                );
              });

              it ('should burn tokens from his account', async () => {
                const workerInitialBalance = await thanklyToken.workerBalance(workerId1, company);
                await thanklyToken.burnTokens(workerId1, company, 1, { from: trustedAccount });
                const workerEndBalance = await thanklyToken.workerBalance(workerId1, company);

                assert.equal(workerInitialBalance.burnableTokens, 1);
                assert.equal(workerEndBalance.burnableTokens, 0);
              })
            });

            describe('and worker has NOT enough burnable tokens', () => {
              it('should revert the transaction', async () => {
                await expectRevert.unspecified(
                  thanklyToken.burnTokens(workerId1, company, 1, { from: trustedAccount })
                );
              })
            });
          })

          describe('and worker is NOT already registered', () => {
            it('should revert the transaction', async () => {
              await expectRevert.unspecified(
                thanklyToken.burnTokens(workerId1, company, 1, { from: trustedAccount })
              );
            })
          })
        });

        describe('and token is inactive', () => {
          beforeEach(async () => {
            await expectRevert.unspecified(
              thanklyToken.burnTokens(workerId1, company, 1, { from: trustedAccount })
            );
          })

          it('should revert the transaction', async () => {
            await expectRevert.unspecified(
              thanklyToken.burnTokens(workerId1, company, 1, { from: trustedAccount })
            );
          })
        })
      })

      describe('and token does NOT exist', () => {
        it('should revert the transaction', async () => {
          await expectRevert.unspecified(
            thanklyToken.burnTokens(workerId1, company, 1, { from: trustedAccount })
          );
        })
      })
    })

    describe('and the contract is NOT already initialized', () => {
      it('should revert the transaction', async () => {
        await expectRevert.unspecified(
          thanklyToken.burnTokens(workerId1, company, 1, { from: trustedAccount })
        );
      })
    })
  })

  // describe('withdraw() is called', () => {
  //   describe('and the contract is already initialized', () => {
  //     beforeEach(async () => {
  //       await thanklyToken.initialize(owner);
  //       await thanklyToken.setTokenValueConversion(initialTokenValueConversion, { from: owner });
  //       await thanklyToken.setSellingPercentage(initialSellingPercentage, { from: owner });
  //       await thanklyToken.createToken(currencyName, currencySymbol, { from: company });
  //       await thanklyToken.registerWorker(workerId1, { from: company });
  //       const transacionCost = amountToTransferFromCompanyToWorker * initialTokenValueConversion;
  //       const transactionFee = transacionCost * initialSellingPercentage / 100;
  //       const totalTransactionCost = `${transacionCost + transactionFee}`;

  //       await thanklyToken.transferTokensFromCompanyToWorker(
  //         workerId1, amountToTransferFromCompanyToWorker,
  //         { from: company, value: totalTransactionCost }
  //       );
  //     })

  //     describe('and it\'s called by the owner', () => {
  //       it(`should withdraw funds from contract to owner`, async () => {
  //         const contractInitialBalance = await web3.eth.getBalance(thanklyToken.address);
  //         await thanklyToken.withdraw(amountToTransferFromCompanyToWorker, { from: owner });
  //         const contractEndBalance = await web3.eth.getBalance(thanklyToken.address);
  //         console.log('contractInitialBalance: ', contractInitialBalance)
  //         console.log('contractEndBalance: ', contractEndBalance)
  //         assert.equal(true, true);
  //       })
  //     })

  //     describe('and it\'s NOT called by the owner', () => {
  //       it(`should revert the transaction`, async () => {
  //         await expectRevert.unspecified(thanklyToken.withdraw(10, { from: otherAccount }));
  //       })
  //     })
  //   })

  //   describe('and the contract is NOT already initialized', () => {
  //     it('should revert the transaction', async () => {
  //       await expectRevert.unspecified(thanklyToken.withdraw(10, { from: owner }));
  //     })
  //   })
  // })
})
