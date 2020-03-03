### Requirements

Install Ganache, and Truffle

```bash
npm install -g truffle@5.0.41 ganache-cli@6.7.0
```

### Start your local blockchain

In a new terminal window, run your local blockchain:

```bash
ganache-cli --deterministic
```

### Run a Relayer

We need to deploy a live relayHub, run a Relayer, and then register our Relayer in the relayHub. While we can do each of these steps individually with the gsn-helpers running the command run-relayer will take care of all these steps at once. In a new terminal window in your project folder, (with ganache running, after you restarted it, in another terminal) type:

```bash
npx oz-gsn run-relayer --quiet
```

You should see output similar to the following:

```bash
Starting relayer
/Users/dennison/Library/Caches/gsn-nodejs/gsn-relay-v0.1.4
-EthereumNodeUrl [http://localhost:8545](http://localhost:8545/)
-RelayHubAddress 0xd216153c06e857cd7f72665e0af1d7d82172f494
-Port 8090
-Url [http://localhost:8090](http://localhost:8090/)
-GasPricePercent 0
-Workdir /var/folders/pf/8knbxmfd6n3_cn5glssbp5580000gn/T/tmp-17513m3fru4uoIQW8
-DevMode
Funding GSN relay at [http://localhost:8090](http://localhost:8090/)
Will wait up to 30s for the relay to be ready
Relay is funded and ready!
```

Now we need to redeploy the GSN Starter Kit contract counter.sol remembering to call initialize() at the end of the process (in another terminal)

```bash
oz create
```

And follow the `cli` prompts (looks like something like that):

```bash
? Pick a contract to instantiate Counter
? Pick a network development
✓ Contract Counter deployed
All implementations have been deployed
? Call a function to initialize the instance after creating it? Yes
? Select which function * initialize(num: uint256, trustedSigner: address)
? num: uint256: 12
? trustedSigner: address: 0x1df62f291b2e969fb0849d99d9ce41e2f137006e
✓ Setting everything up to create contract instances
✓ Instance created at 0xD833215cBcc3f914bD1C9ece3EE7BF8B14f841bb
0xD833215cBcc3f914bD1C9ece3EE7BF8B14f841bb
```

This time when we fund the recipient, we will be funding our smart contract counter.sol on the relayHub we deployed manually with the gsn-helpers. Go ahead and fund your recipient.

```bash
npx oz-gsn fund-recipient --recipient <<Your contract address here>>
```

### Testing Smart Contracts

Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the truffle development console.

```bash
// inside the development console.
test

// outside the development console..
truffle test
```

### Client UI

Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the truffle development console. In a new terminal window, in the client directory, run the React app:

```bash
cd client
npm run start
```