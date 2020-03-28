module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Content-Type, Authorization, X-Requested-With, Accept, Origin'
  );
  res.header('Access-Control-Allow-Methods', 'DELETE, POST, GET, PUT, OPTIONS');
  next();
};
