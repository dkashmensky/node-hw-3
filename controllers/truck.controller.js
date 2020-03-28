const mongoose = require('mongoose');
const utils = require('../utils/utils');

const Truck = mongoose.model('Trucks');
const TruckType = mongoose.model('Truck_types');

module.exports.create_truck = (req, res) => {
  Truck.find({}, (err, trucks) => {
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

    const newTruck = new Truck({
      id,
      name,
      created_by: req.user.id,
      type_id,
    });

    newTruck.save((error, truck) => {
      if (error) {
        res.status(500).json({
          status: error,
        });
        return;
      }

      res.status(200).json(truck);
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
  Truck.find({ created_by: req.user.id }, (err, trucks) => {
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

        res.status(200).json({
          status: 'Truck info updated',
        });
      }
    );
  });
};

module.exports.delete_truck = (req, res) => {
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
    }
  );
};

module.exports.assign_truck = (req, res) => {
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
      }
    );
  });
};

module.exports.unassign_truck = (req, res) => {
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
    }
  );
};
