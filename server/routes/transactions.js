const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Worker = require('../models/Worker');
const ThanklyToken = require('../contracts/ThanklyToken.json');

const web3 = require('web3');
const EthereumTx = require('ethereumjs-tx').Transaction

web3js = new web3(new web3.providers.HttpProvider('http://127.0.0.1:7545'));

// REGISTER
router.post('/', async (req, res) => {
  console.log('transactions CALLED')
  try {
    // Check if sender is already registered
    let senderIsRegistered = await Worker.findById(req.body.from);
    if (!senderIsRegistered) {
      return res.status(400).send({
        message: `Sender is not registered`,
      });
    }
    const sender = web3js.utils.toHex(req.body.from)

    // Check if receiver is already registered
    let receiverIsRegistered = await Worker.findById(req.body.to);
    if (!receiverIsRegistered) {
      return res.status(400).send({
        message: `Sender is not registered`,
      });
    }
    const receiver = web3js.utils.toHex(req.body.to)
    
    // Set variables needed to execute the transaction
    const trustedAddress = '0x3459ac87be3669F0ae29e37968d6476F79017b9f';
    const privateKey = new Buffer(process.env.PRIVATE_KEY, 'hex');
    const contractABI = ThanklyToken.abi;
    const contractAddress = '0xbb3aC9e32b6d9ddD04E730733F4A1F593461DC49';
    
    // creating contract object
    const contract = new web3js.eth.Contract(contractABI, contractAddress);

    // create raw transaction
    const count = await web3js.eth.getTransactionCount(trustedAddress);
    const data = await contract.methods.transferTokensFromWorkerToWorker(sender, receiver, req.body.address, req.body.amount).encodeABI()
    const rawTransaction = {
      from: trustedAddress,
      gasPrice: web3js.utils.toHex(20* 1e9),
      gasLimit: web3js.utils.toHex(210000),
      to: contractAddress,
      value: web3.utils.toHex(0),
      data,
      nonce: web3js.utils.toHex(count)
    }

    // creating tranaction and signing via ethereumjs-tx
    const transaction = new EthereumTx(rawTransaction);
    transaction.sign(privateKey);

    // sending transacton via web3js module
    const { transactionHash, blockHash, blockNumber } = await web3js.eth
      .sendSignedTransaction(`0x${transaction.serialize().toString('hex')}`);
    
    const newTransaction = {
      transactionHash,
      blockHash,
      blockNumber,
      from: req.body.from,
      to: req.body.to,
      amount: req.body.amount,
      description: req.body.description,
      type: 'burnable',
      date: new Date().toISOString(),
    };

    senderIsRegistered.transactions.push(newTransaction);
    receiverIsRegistered.transactions.push(newTransaction);

    await senderIsRegistered.save()
    await receiverIsRegistered.save()

    return res.status(200).send(newTransaction);
    
  } catch (err) {
    console.log('qeuirfvds')
    return res.status(400).send(err);
  }
})

module.exports = router;