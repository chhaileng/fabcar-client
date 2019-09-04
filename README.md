# FabCar Client (React JS)

This is the client web based application for FabCar Blockchain application which is a sample app from Hyperledger Fabric. To start this application you have to setup as following. 

## Steps

1. Network setup
2. Enroll admin and register user
3. REST Server
4. Client app

## Network

Clone the project from [fabric-samples](https://github.com/hyperledger/fabric-samples) repository. Go to `fabcar` directory and start the network.

```
$ git clone https://github.com/hyperledger/fabric-samples.git
$ cd fabcar
$ ./startFabric.sh
```

Now the network should be started and chaincode should be installed to the network.

## Enroll admin and register user

In the `fabcar` directory, go to javascript directory and run:

```
$ node enrollAdmin.js
$ node registerUser.js
```

After running this, we can test by querying some records from the network by running:

```
$ node query.js
```

## REST Server

Create a file `app.js` in that directory and put this code.

```
const express = require('express')
const app = express()

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', 'first-network', 'connection-org1.json');

// CORS Origin
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());

app.get('/cars', async (req, res) => {
  try {
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    const userExists = await wallet.exists('user1');
    if (!userExists) {
      res.json({status: false, error: {message: 'User not exist in the wallet'}});
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('fabcar');
    const result = await contract.evaluateTransaction('queryAllCars');
    res.json({status: true, cars: JSON.parse(result.toString())});
  } catch (err) {
    res.json({status: false, error: err});
  }
});

app.get('/cars/:key', async (req, res) => {
  try {
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    const userExists = await wallet.exists('user1');
    if (!userExists) {
      res.json({status: false, error: {message: 'User not exist in the wallet'}});
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('fabcar');
    const result = await contract.evaluateTransaction('queryCar', req.params.key);
    res.json({status: true, car: JSON.parse(result.toString())});
  } catch (err) {
    res.json({status: false, error: err});
  }
});

app.post('/cars', async (req, res) => {
  if ((typeof req.body.key === 'undefined' || req.body.key === '') ||
      (typeof req.body.make === 'undefined' || req.body.make === '') ||
      (typeof req.body.model === 'undefined' || req.body.model === '') ||
      (typeof req.body.color === 'undefined' || req.body.color === '') ||
      (typeof req.body.owner === 'undefined' || req.body.owner === '')) {
    res.json({status: false, error: {message: 'Missing body.'}});
    return;
  }

  try {
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    const userExists = await wallet.exists('user1');
    if (!userExists) {
      res.json({status: false, error: {message: 'User not exist in the wallet'}});
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('fabcar');
    await contract.submitTransaction('createCar', req.body.key, req.body.make, req.body.model, req.body.color, req.body.owner);
    res.json({status: true, message: 'Transaction (create car) has been submitted.'})
  } catch (err) {
    res.json({status: false, error: err});
  }
});

app.put('/cars', async (req, res) => {
  if ((typeof req.body.key === 'undefined' || req.body.key === '') ||
      (typeof req.body.owner === 'undefined' || req.body.owner === '')) {
    res.json({status: false, error: {message: 'Missing body.'}});
    return;
  }

  try {
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    const userExists = await wallet.exists('user1');
    if (!userExists) {
      res.json({status: false, error: {message: 'User not exist in the wallet'}});
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('fabcar');
    await contract.submitTransaction('changeCarOwner', req.body.key, req.body.owner);
    res.json({status: true, message: 'Transaction (change car owner) has been submitted.'})
  } catch (err) {
    res.json({status: false, error: err});
  }
});

app.listen(3000, () => {
  console.log('REST Server listening on port 3000');
});
```

Run

```
$ node app.js
```

## Client app

Clone this repository and run

```
$ npm start
```

## Happy hacking...