const mongoose = require('mongoose');
const utils = require('../utils/utils');

const Load = mongoose.model('Loads');

module.exports.create_load = (req, res) => {
  if (req.user.type !== 'shipper') {
    res.status(400).json({
      status: 'User is not a shipper',
    });
    return;
  }

  Load.find({}, (err, loads) => {
    if (err) {
      res.status(500).json({
        status: err,
      });
      return;
    }

    const { name, length, height, width, capacity } = req.body;
    const id = utils.getNewId(loads);

    const newLoad = new Load({
      id,
      name,
      length,
      height,
      width,
      capacity,
      created_by: req.user.id,
    });

    newLoad.save((error, load) => {
      if (error) {
        res.status(500).json({
          status: error,
        });
        return;
      }

      res.status(200).json(load);
    });
  });
};

module.exports.get_loads = (req, res) => {
  if (req.user.type !== 'shipper') {
    res.status(400).json({
      status: 'User is not a shipper',
    });
    return;
  }

  Load.find({ created_by: req.user.id }, (err, loads) => {
    if (err) {
      res.status(500).json({
        status: err,
      });
      return;
    }

    res.status(200).json(loads);
  });
};

module.exports.update_load = (req, res) => {
  if (req.user.type !== 'shipper') {
    res.status(400).json({
      status: 'User is not a shipper',
    });
    return;
  }

  const { name, length, height, width, capacity } = req.body;

  Load.findOneAndUpdate(
    { id: req.body.id, created_by: req.user.id, status: 'new', assigned_to: 0 },
    { name, length, height, width, capacity },
    (err, load) => {
      if (err) {
        res.status(500).json({
          status: err,
        });
        return;
      }

      if (!load) {
        res.status(400).json({
          status:
            'Unable to update load info. Please make sure it has not been shipped already',
        });
        return;
      }

      res.status(200).json({
        status: 'Load info updated',
      });
    }
  );
};

module.exports.delete_load = (req, res) => {
  if (req.user.type !== 'shipper') {
    res.status(400).json({
      status: 'User is not a shipper',
    });
    return;
  }

  Load.findOneAndDelete(
    { id: req.body.id, created_by: req.user.id, status: 'new', assigned_to: 0 },
    (err, load) => {
      if (err) {
        res.status(500).json({
          status: err,
        });
        return;
      }

      if (!load) {
        res.status(400).json({
          status:
            'Unable to delete load. Please make sure it has not been shipped already',
        });
        return;
      }

      res.status(200).json({
        status: 'Load deleted successfully',
      });
    }
  );
};
