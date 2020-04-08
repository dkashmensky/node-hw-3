/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const joi = require('@hapi/joi');
const utils = require('../utils/utils');
const validateSchemas = require('../utils/validator');

const Truck = mongoose.model('Trucks');
const TruckType = mongoose.model('Truck_types');
const Load = mongoose.model('Loads');

module.exports.create_truck = (req, res) => {
  if (req.user.type !== 'driver') {
    res.status(400).json({
      status: 'User is not a driver',
    });
    return;
  }

  const validation = validateSchemas.create_truck_schema.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      status: validation.error.details[0].message,
    });
    return;
  }

  const { type } = req.body;

  TruckType.findOne({ name: type }, (truckError, truckType) => {
    if (truckError) {
      res.status(500).json({
        status: truckError,
      });
      return;
    }

    if (!TruckType) {
      res.status(400).json({
        status: 'Truck type not found',
      });
      return;
    }

    const newTruck = new Truck({
      created_by: req.user._id,
      dimensions: truckType.dimensions,
      payload: truckType.payload,
      type: truckType.name,
    });

    newTruck.save((error, truck) => {
      if (error) {
        res.status(500).json({
          status: error,
        });
        return;
      }

      res.status(200).json({
        status: 'Truck created successfully',
      });
      console.log(
        // eslint-disable-next-line no-underscore-dangle
        `Created: Truck. ID: ${truck._id}. Created by: ${truck.created_by}`
      );
    });
  });
};

module.exports.get_truck_types = (req, res) => {
  TruckType.find({}, (err, types) => {
    if (err) {
      res.status(500).json({
        status: err,
      });
      return;
    }

    res.status(200).json({
      status: 'Success',
      types,
    });
  });
};

module.exports.get_user_trucks = (req, res) => {
  if (req.user.type !== 'driver') {
    res.status(400).json({
      status: 'User is not a driver',
    });
    return;
  }

  Truck.find({ created_by: req.user._id }, (err, trucks) => {
    if (err) {
      res.status(500).json({
        status: err,
      });
      return;
    }

    res.status(200).json({
      status: 'Success',
      trucks,
    });
  });
};

module.exports.update_truck_info = (req, res) => {
  if (req.user.type !== 'driver') {
    res.status(400).json({
      status: 'User is not a driver',
    });
    return;
  }

  const reqData = {
    id: req.params.id,
    comment: req.body.comment,
  };

  const validation = validateSchemas.update_truck_schema.validate(reqData);
  if (validation.error) {
    res.status(400).json({
      status: validation.error.details[0].message,
    });
    return;
  }

  Truck.findOneAndUpdate(
    {
      _id: reqData.id,
      created_by: req.user._id,
      assigned_to: '',
    },
    {
      comment: reqData.comment,
    },
    (error, truck) => {
      if (error) {
        res.status(500).json({
          status: error,
        });
        return;
      }

      if (!truck) {
        res.status(500).json({
          status:
            'Unable to update truck info. Make sure it is not assigned to a driver',
        });
        return;
      }

      res.status(200).json({
        status: 'Truck info updated',
      });
      console.log(
        `Updated: Truck. ID: ${truck.id}. Updated by: ${req.user._id}`
      );
    }
  );
};

module.exports.delete_truck = (req, res) => {
  if (req.user.type !== 'driver') {
    res.status(400).json({
      status: 'User is not a driver',
    });
    return;
  }

  const validation = validateSchemas.check_id.validate(req.params);
  if (validation.error) {
    res.status(400).json({
      status: validation.error.details[0].message,
    });
    return;
  }

  Truck.findOneAndDelete(
    {
      _id: req.params.id,
      created_by: req.user._id,
      assigned_to: '',
    },
    (err, truck) => {
      if (err) {
        res.status(500).json({
          status: err,
        });
        return;
      }

      if (!truck) {
        res.status(400).json({
          status:
            'Unable to delete the truck. Make sure it exists and is unassigned',
        });
        return;
      }

      res.status(200).json({
        status: 'Truck deleted successfully',
      });
      console.log(
        // eslint-disable-next-line no-underscore-dangle
        `Deleted: Truck. ID: ${truck._id}. Deleted by: ${req.user._id}`
      );
    }
  );
};

module.exports.assign_truck = (req, res) => {
  if (req.user.type !== 'driver') {
    res.status(400).json({
      status: 'User is not a driver',
    });
    return;
  }

  const validation = validateSchemas.check_id.validate(req.params);
  if (validation.error) {
    res.status(400).json({
      status: validation.error.details[0].message,
    });
    return;
  }

  Truck.findOne({ assigned_to: req.user._id }, (err, truck) => {
    if (err) {
      res.status(500).json({
        status: err,
      });
      return;
    }

    if (truck) {
      res.status(400).json({
        status: 'Truck already assigned to this user',
      });
      return;
    }

    Truck.findOneAndUpdate(
      {
        _id: req.params.id,
        assigned_to: '',
      },
      {
        assigned_to: req.user._id,
      },
      (error, upTruck) => {
        if (error) {
          res.status(500).json({
            status: err,
          });
          return;
        }

        if (!upTruck) {
          res.status(400).json({
            status: 'Truck already assigned',
          });
          return;
        }

        res.status(200).json({
          status: 'Truck assigned successfully',
        });
        console.log(
          `Truck ID: ${upTruck._id} assigned to driver ID: ${upTruck.assigned_to}. Updated by: ${req.user._id}`
        );
      }
    );
  });
};

module.exports.unassign_truck = (req, res) => {
  if (req.user.type !== 'driver') {
    res.status(400).json({
      status: 'User is not a driver',
    });
    return;
  }

  const validation = validateSchemas.check_id.validate(req.params);
  if (validation.error) {
    res.status(400).json({
      status: validation.error.details[0].message,
    });
    return;
  }

  Load.findOne(
    {
      assigned_to: req.user._id,
      status: { $ne: 'shipped' },
    },
    (error, load) => {
      if (error) {
        res.status(500).json({
          status: error,
        });
        return;
      }

      if (load) {
        res.status(400).json({
          status: 'Unable to unassign truck while it is on a load',
        });
        return;
      }

      Truck.findOneAndUpdate(
        {
          _id: req.params.id,
          assigned_to: req.user._id,
        },
        {
          assigned_to: '',
        },
        (err, truck) => {
          if (err) {
            res.status(500).json({
              status: err,
            });
            return;
          }

          if (!truck) {
            res.status(400).json({
              status:
                'Unable to unassign truck. Please make sure truck exists and is assigned to this user',
            });
            return;
          }

          res.status(200).json({
            status: `Truck unassigned successfully`,
          });
          console.log(
            `Truck ID: ${truck._id} unassigned from driver ID: ${truck.assigned_to}. Updated by: ${req.user._id}`
          );
        }
      );
    }
  );
};
