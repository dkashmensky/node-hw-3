const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Users = require('./models/user.model');
const Trucks = require('./models/truck.model');
const Truck_types = require('./models/truck_type.model');

const app = express();

// Router
const loginRouter = require('./routes/api/login');
const registerRouter = require('./routes/api/register');
const userRouter = require('./routes/api/user');
const truckRouter = require('./routes/api/truck');

// Middleware
const auth = require('./routes/middleware/auth');
const headers = require('./routes/middleware/headers');
const logger = require('./routes/middleware/logger');

mongoose.connect(
  'mongodb+srv://dkashmensky:Nap66n7j@uberest-tb5pi.mongodb.net/uber',
  { useNewUrlParser: true }
);

app.options('*', cors());
app.use(express.json());
app.use(headers);
app.use(logger);

app.use('/api', loginRouter);
app.use('/api', registerRouter);

app.use(auth);

app.use('/api', userRouter);
app.use('/api', truckRouter);

app.listen(8080);
