const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Company = require('../models/Company');
const Worker = require('../models/Worker');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    // Check if Email is already registered
    const registeredCompany = await Company.findOne({ email: req.body.email });
    if (registeredCompany) {
      return res.status(400).send({
        message: `Company with ${req.body.email} email is already registered`,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    // Create company payload to be stored in DB
    const companyPayload = {
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
      ethereumAddress: req.body.ethereumAddress,
    };
    
    // Save Company in the DB
    const company = new Company(companyPayload);
    const savedCompany = await company.save();

    const { name, email } = savedCompany;

    return res.status(200).send({ name, email });
  } catch (err) {
    return res.status(400).send(err);
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  try {
    // Check if Email is not registered
    const registeredCompany = await Company.findOne({ email: req.body.email });
    if (!registeredCompany) {
      return res.status(400).send({
        message: `Company with ${req.body.email} email is not registered`,
      });
    }

    // Check if Password is correct
    const checkValidPassword = await bcrypt.compare(req.body.password, registeredCompany.password);
    if (!checkValidPassword) {
      return res.status(400).send({
        message: `Password is incorrect`,
      });
    }

    // Company data to be returned
    const { _id, email, name, ethereumAddress, pathways } = registeredCompany;

    return res.status(200).send({ _id, email, name, ethereumAddress, pathways });

  } catch(err) {
    return res.status(400).send(err);
  }
})

// UPDATE COMPANY DATA
router.put('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(400).send({
        message: 'Company does not exist',
      });
    };

    if (req.body.pathways) {
      req.body.pathways = [...company.pathways, ...req.body.pathways];
    }

    // Update Company data
    const updatedData = Object.assign(company, req.body);
    const updatedCompany = await Company.updateOne(
      { _id: req.params.id },
      { $set: updatedData },
    );

    return res.status(200).send(updatedCompany);

  } catch(err) {
    return res.status(400).send(err);
  }
})

// GET COMPANY DATA
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(400).send({
        message: 'Company does not exist',
      });
    };

    // Company data to be returned
    const { _id, email, name, ethereumAddress } = company;

    return res.status(200).send({ _id, email, name, ethereumAddress });

  } catch(err) {
    return res.status(400).send(err);
  }
})

module.exports = router;