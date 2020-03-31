const mongoose = require('mongoose');
const utils = require('../utils/utils');

const Load = mongoose.model('Loads');
const Truck = mongoose.model('Trucks');

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

module.exports.post_load = (req, res) => {
  if (req.user.type !== 'shipper') {
    res.status(400).json({
      status: 'User is not a shipper',
    });
    return;
  }

  Load.findOneAndUpdate(
    {
      id: req.body.id,
      created_by: req.user.id,
      status: 'new',
    },
    {
      status: 'posted',
    },
    (err, load) => {
      if (err) {
        res.status(500).json({
          status: err,
        });
        return;
      }

      if (!load) {
        res.status(400).json({
          status: 'Unable to post the load',
        });
        return;
      }

      const { height, length, width, capacity } = load;
      Truck.findOneAndUpdate(
        {
          height: { $gte: height },
          length: { $gte: length },
          width: { $gte: width },
          capacity: { $gte: capacity },
          assigned_to: { $ne: 0 },
          status: 'IS',
        },
        {
          status: 'OL',
        },
        (error, truck) => {
          if (error) {
            res.status(500).json({
              status: error,
            });
            return;
          }

          if (!truck) {
            Load.findOneAndUpdate({ id: load.id }, { status: 'new' });
            res.status(400).json({
              status: 'Unable to find suitable truck',
            });
            return;
          }

          Load.findOneAndUpdate(
            { id: load.id },
            {
              status: 'assigned',
              state: 'En route to pick up',
              $addToSet: {
                logs: {
                  message: `Assigned to driver ${truck.assigned_to}`,
                  time: Date.now(),
                },
              },
            },
            (e, assignedLoad) => {
              if (e) {
                res.status(500).json({
                  status: e,
                });
                return;
              }

              res.status(200).json({
                status: `Load has been successfully assigned to driver ${truck.assigned_to}`,
              });
            }
          );
        }
      );
    }
  );
};

module.exports.get_load_info = (req, res) => {
  Load.findOne({ id: req.body.id }, (err, load) => {
    if (err) {
      res.status(500).json({
        status: err,
      });
      return;
    }

    if (!load) {
      res.status(400).json({
        status: `Unable to find load with ID ${req.body.id}`,
      });
      return;
    }

    res.status(200).json(load);
  });
};
