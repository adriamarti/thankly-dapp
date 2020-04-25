const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Worker = require('../models/Worker');

// REGISTER
router.post('/pre-register', async (req, res) => {
  try {
    // Check if Email is already registered
    const registeredWorker = await Worker.findOne({ email: req.body.email });
    if (registeredWorker) {
      return res.status(400).send({
        message: `Worker with ${req.body.email} email is already registered`,
      });
    }
    
    // Create worker payload to be stored in DB
    const workerPayload = {
      email: req.body.email,
      name: req.body.name,
      companyId: req.body.companyId,
      pathwayId: req.body.pathwayId,
      active: false,
    };
    
    // Save Worker in the DB
    const worker = new Worker(workerPayload);
    const savedWorker = await worker.save(worker);

    const { _id, name, email, companyId, pathwayId, active } = savedWorker;

    return res.status(200).send({ _id, name, email, companyId, pathwayId, active });
  } catch (err) {
    return res.status(400).send(err);
  }
})

// REGISTER
router.post('/confirm-register/:id', async (req, res) => {
  try {
    // Check if Email is already registered
    const registeredWorker = await Worker.findOne({ email: req.body.email });
    if (!registeredWorker) {
      return res.status(400).send({
        message: `Worker with ${req.body.email} email is not registered`,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    // Create worker payload to be stored in DB
    const workerPayload = {
      password: hashedPassword,
      active: true,
    };
    
    // Update Worker data
    const updatedData = Object.assign(registeredWorker, workerPayload);
    const updatedWorker= await Worker.updateOne(
      { _id: req.params.id },
      { $set: updatedData },
    );
    
    return res.status(200).send(updatedWorker);

  } catch (err) {
    return res.status(400).send(err);
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  try {
    // Check if Email is not registered
    const registeredWorker = await Worker.findOne({ email: req.body.email });
    if (!registeredWorker) {
      return res.status(400).send({
        message: `Worker with ${req.body.email} email is not registered`,
      });
    }

    // Check if Password is correct
    const checkValidPassword = await bcrypt.compare(req.body.password, registeredWorker.password);
    if (!checkValidPassword) {
      return res.status(400).send({
        message: `Password is incorrect`,
      });
    }

    // Worker data to be returned
    const { _id, email, name, companyId, pathwayId, transactions } = registeredWorker;

    return res.status(200).send({ _id, email, name, companyId, pathwayId, transactions });

  } catch(err) {
    return res.status(400).send(err);
  }
})

// UPDATE WORKER DATA
router.put('/:id', async (req, res) => {
  try {
    // Check if worker is not registered
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(400).send({
        message: 'Worker does not exist',
      });
    };

    // Add all previous transactions to not override the old ones
    if (req.body.transactions) {
      req.body.transactions = [...worker.transactions, req.body.transactions];
    }

    // Update Worker data
    const updatedData = Object.assign(worker, req.body);
    await Worker.updateOne(
      { _id: req.params.id },
      { $set: updatedData },
    );

    const { _id, name, pathwayId, active, email, transactions } = updatedData

    return res.status(200).send({ _id, name, pathwayId, active, email, transactions });

  } catch(err) {
    return res.status(400).send(err);
  }
})

// GET COMPANY DATA
router.get('/', async (req, res) => {
  try {
    const workers = await Worker.find(req.query);

    if (workers.length === 0) {
      return res.status(200).send({
        workers: [],
        active: 0,
        inactive: 0,
      });
    };

    // Workers data to be returned
    const workersWithDataFiltered = workers.map(({ _id, name, pathwayId, active, email, transactions }) => {
      return { _id, name, pathwayId, active, email, transactions }
    })

    // Get active users
    const activeUsers = workersWithDataFiltered.filter(({ active }) => active === true);

    return res.status(200).send({
      workers: workersWithDataFiltered,
      active: activeUsers.length,
      inactive: workers.length - activeUsers.length,
    });

  } catch(err) {
    return res.status(400).send(err);
  }
})

module.exports = router;