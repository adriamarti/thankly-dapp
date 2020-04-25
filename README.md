# Thankly Dapp (PoC)
This is a Human Resources software solution that is focused on engage the team work via direct recogniztion of well done work between the employees of the company. The company transfer tokens to their employees who later can be transfered to other team mates and at the end the received tokens can be exchanged for vouchers.

> :construction_worker: **This project is under construction.**

## Run the project locally

### Requirements

Install Ganache, and Truffle. You can use either the ganache CLI or the ganache UI software.
```bash
npm install -g truffle@5.0.41 ganache-cli@6.7.0
```
If you are going to use the platform as a company you need to have a software to sign ethereum transactions like MetaMask

**Download the project:**
```bash
git clone https://github.com/adriamarti/thankly-dapp.git
```

### Run the server

The project uses a back end to sign transactions between the employees while the ones from thw company should be signed via a wallet like MetaMask.

Once you have cloned the repo navigate to the server folder and run start the server.

```bash
cd server
yarn start
```

Install all the dependencies
```bash
yarn install
```

> You need to create a collection into mongo Atlas and paste your credentials into the .env file inside the server folder:
```bash
DB_CONNECT=mongodb+srv://{acountName}:{password}@cluster0-exasy.mongodb.net/{collectionName}?retryWrites=true&w=majority
```

### Run the blockchain locally

Once you have cloned the repo navigate run a private blockchain netwrok with Ganache. Once the private ethereum network is running do:

1. Navigate to the ethereum folder:
```bash
cd ethereum
```
2. Install all the dependencies
```bash
yarn install
```
3. Compile the smart contracts
```bash
truffle compile
```
4. Deploy the contracts
```bash
truffle deploy
```
5. Migrate the contracts
```bash
truffle migrate
```
6. You need to set the private code of the trustedd address used during the deployemt into the .env file from the server folder
```bash
PRIVATE_KEY={privateKey}
```

### Run the client

The client is developed using React, Redux, Sagas. To run the client you need to:

1. Navigate to the ethereum folder:
```bash
cd client
```
2. Install all the dependencies
```bash
yarn install
```
3. Deploy the contracts
```bash
yarn start
```
