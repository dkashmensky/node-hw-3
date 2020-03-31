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

  Truck.find({}, async (err, trucks) => {
    if (err) {
      res.status(500).json({
        status: err,
      });
      return;
    }

    // eslint-disable-next-line camelcase
    const { name, type_id } = req.body;
    const truckNameIsUsed = utils.checkTruckName(trucks, name);
    if (truckNameIsUsed) {
      res.status(400).json({
        status: 'Truck name is already in use',
      });
    }

    const id = utils.getNewId(trucks);
    let length;
    let height;
    let width;
    let capacity;
    let typeName;

    await TruckType.findOne({ id: type_id }, (truckError, type) => {
      if (truckError) {
        res.status(500).json({
          status: truckError,
        });
        return;
      }

      length = type.length;
      height = type.height;
      width = type.width;
      capacity = type.capacity;
      typeName = type.name;
    });

    const newTruck = new Truck({
      id,
      name,
      created_by: req.user.id,
      type_id,
      length,
      height,
      width,
      capacity,
      type_name: typeName,
    });

    newTruck.save((error, truck) => {
      if (error) {
        res.status(500).json({
          status: error,
        });
        return;
      }

      res.status(200).json(truck);
      console.log(
        `Created: Truck. ID: ${truck.id}. Created by: ${truck.created_by}`
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

    res.status(200).json(types);
  });
};

module.exports.get_user_trucks = (req, res) => {
  if (req.user.type !== 'driver') {
    res.status(400).json({
      status: 'User is not a driver',
    });
    return;
  }

  Truck.find({ created_by: req.user.id }, (err, trucks) => {
    if (err) {
      res.status(500).json({
        status: err,
      });
      return;
    }

    res.status(200).json(trucks);
  });
};

module.exports.update_truck_info = (req, res) => {
  if (req.user.type !== 'driver') {
    res.status(400).json({
      status: 'User is not a driver',
    });
    return;
  }

  const validation = validateSchemas.update_truck_schema.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      status: validation.error.details[0].message,
    });
    return;
  }

  Truck.find({ created_by: req.user.id, assigned_to: 0 }, (err, trucks) => {
    if (err) {
      res.status(500).json({
        status: err,
      });
      return;
    }

    // eslint-disable-next-line camelcase
    const { id, name, type_id } = req.body;
    const truckNameIsUsed = utils.checkTruckName(trucks, name);
    if (truckNameIsUsed) {
      res.status(400).json({
        status: 'Truck name is already in use',
      });
      return;
    }

    Truck.findOneAndUpdate(
      {
        id,
        created_by: req.user.id,
        assigned_to: 0,
      },
      {
        name,
        type_id,
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
              'Unable to update truck info. Please make sure it is not assigned to a driver',
          });
          return;
        }

        res.status(200).json({
          status: 'Truck info updated',
        });
        console.log(
          `Updated: Truck. ID: ${truck.id}. Updated by: ${req.user.id}`
        );
      }
    );
  });
};

module.exports.delete_truck = (req, res) => {
  if (req.user.type !== 'driver') {
    res.status(400).json({
      status: 'User is not a driver',
    });
    return;
  }

  const validation = validateSchemas.check_id.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      status: validation.error.details[0].message,
    });
    return;
  }

  Truck.findOneAndDelete(
    {
      id: req.body.id,
      created_by: req.user.id,
      assigned_to: 0,
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
            'Unable to delete the truck. Please make sure truck exists and is unassigned',
        });
        return;
      }

      res.status(200).json({
        status: 'Truck deleted successfully',
      });
      console.log(
        `Deleted: Truck. ID: ${truck.id}. Deleted by: ${req.user.id}`
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

  const validation = validateSchemas.check_id.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      status: validation.error.details[0].message,
    });
    return;
  }

  Truck.findOne({ assigned_to: req.user.id }, (err, truck) => {
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
        id: req.body.id,
        assigned_to: 0,
      },
      {
        assigned_to: req.user.id,
      },
      (error, upTruck) => {
        if (error) {
          res.status(500).json({
            status: err,
          });
          return;
        }

        res.status(200).json({
          status: `Truck ${upTruck.id} assigned to user ${req.user.id}`,
        });
        console.log(
          `Truck ID: ${upTruck.id} assigned to driver ID: ${upTruck.assigned_to}. Updated by: ${req.user.id}`
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

  const validation = validateSchemas.check_id.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      status: validation.error.details[0].message,
    });
    return;
  }

  Load.findOne(
    {
      assigned_to: req.user.id,
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
          id: req.body.id,
          assigned_to: req.user.id,
        },
        {
          assigned_to: 0,
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
            status: `Truck ${truck.id} unassigned from driver ${req.user.id}`,
          });
          console.log(
            `Truck ID: ${truck.id} unassigned from driver ID: ${truck.assigned_to}. Updated by: ${req.user.id}`
          );
        }
      );
    }
  );
};
