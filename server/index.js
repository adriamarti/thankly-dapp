const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import Routes
const companiesRoute = require('./routes/companies');
const workersRoute = require('./routes/workers');
const transactionsRoute = require('./routes/transactions');

// Add Express to App
const app = express();

// Get node ENV variables
dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('Connected to our Data Base'),
);

// Middlewares
app.use(express.json());

// Set Access Control Allowance
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// Route Middlewares
app.use('/api/companies', companiesRoute);
app.use('/api/workers', workersRoute);
app.use('/api/transactions', transactionsRoute);

app.listen(4000, () => console.log('Server up and running'))