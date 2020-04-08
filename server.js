const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');
const Users = require('./models/user.model');
const Trucks = require('./models/truck.model');
const Truck_types = require('./models/truck_type.model');
const Loads = require('./models/load.model');

const app = express();

// Router
const authRouter = require('./routes/api/auth');
const userRouter = require('./routes/api/user');
const truckRouter = require('./routes/api/truck');
const loadRouter = require('./routes/api/load');

// Middleware
const auth = require('./routes/middleware/auth');
const headers = require('./routes/middleware/headers');
const logger = require('./routes/middleware/logger');

mongoose.connect(
  `mongodb+srv://${config.dblogin}:${config.dbpassword}@uberest-tb5pi.mongodb.net/${config.dbname}`,
  { useNewUrlParser: true }
);

app.options('*', cors());
app.use(express.json());
app.use(headers);
app.use(logger);

app.use('/api', authRouter);

app.use(auth);

app.use('/api', userRouter);
app.use('/api', truckRouter);
app.use('/api', loadRouter);

app.listen(8080);
