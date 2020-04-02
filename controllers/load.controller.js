const mongoose = require('mongoose');
const joi = require('@hapi/joi');
const utils = require('../utils/utils');
const validateSchemas = require('../utils/validator');

const Load = mongoose.model('Loads');
const Truck = mongoose.model('Trucks');
const User = mongoose.model('Users');

module.exports.create_load = (req, res) => {
  if (req.user.type !== 'shipper') {
    res.status(400).json({
      status: 'User is not a shipper',
    });
    return;
  }

  const validation = validateSchemas.create_load_schema.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      status: validation.error.details[0].message,
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
      console.log(
        `Created: Load. ID: ${load.id}. Created by: ${load.created_by}`
      );
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

  const validation = validateSchemas.get_loads_schema.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      status: validation.error.details[0].message,
    });
    return;
  }

  const { status } = req.body;

  if (status) {
    Load.find({ created_by: req.user.id, status }, (err, loads) => {
      if (err) {
        res.status(500).json({
          status: err,
        });
        return;
      }

      res.status(200).json(loads);
    });
  } else {
    Load.find({ created_by: req.user.id }, (err, loads) => {
      if (err) {
        res.status(500).json({
          status: err,
        });
        return;
      }

      res.status(200).json(loads);
    });
  }
};

module.exports.update_load = (req, res) => {
  if (req.user.type !== 'shipper') {
    res.status(400).json({
      status: 'User is not a shipper',
    });
    return;
  }

  const validation = validateSchemas.update_load_schema.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      status: validation.error.details[0].message,
    });
    return;
  }

  const { id, name, length, height, width, capacity } = req.body;

  Load.findOneAndUpdate(
    { id, created_by: req.user.id, status: 'new', assigned_to: 0 },
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
      console.log(`Updated: Load. ID: ${load.id}. Updated by: ${req.user.id}`);
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

  const validation = validateSchemas.check_id.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      status: validation.error.details[0].message,
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
      console.log(`Deleted: Load. ID: ${load.id}. Deleted by: ${req.user.id}`);
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

  const validation = validateSchemas.check_id.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      status: validation.error.details[0].message,
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

      console.log(
        `Load status changed to posted. ID: ${load.id}. Updated by: ${req.user.id}`
      );

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
            Load.findOneAndUpdate(
              { id: load.id },
              {
                status: 'new',
                $addToSet: {
                  logs: {
                    message: 'Unable to find suitable truck',
                    time: Date.now(),
                  },
                },
              },
              (wtf, wtfLoad) => {
                if (wtf) {
                  res.status(500).json({
                    status: wtf,
                  });
                }
              }
            );
            res.status(400).json({
              status: 'Unable to find suitable truck',
            });
            console.log(
              `Load status changed to new. ID: ${load.id}. Updated by: ${req.user.id}`
            );
            return;
          }

          Load.findOneAndUpdate(
            { id: load.id },
            {
              assigned_to: truck.assigned_to,
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

              console.log(
                `Load status changed to assigned. ID: ${assignedLoad.id}. Updated by: ${req.user.id}`
              );
              console.log(
                `Load assigned to driver ${truck.assigned_to}. ID: ${assignedLoad.id}. Updated by: ${req.user.id}`
              );

              const emailData = {
                user_fullname: req.user.fullname,
                load_name: assignedLoad.name,
                load_id: assignedLoad.id,
                driver_id: truck.assigned_to,
                truck_name: truck.name,
                load_state: 'En route to pick up',
              };

              if (!req.user.email) {
                console.log(
                  `Mail sending failed in load assign. Load ID: ${assignedLoad.id}`
                );
                return;
              }
              utils.send_mail('load_assigned', emailData, req.user.email);
            }
          );
        }
      );
    }
  );
};

module.exports.get_load_info = (req, res) => {
  const validation = validateSchemas.check_id.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      status: validation.error.details[0].message,
    });
    return;
  }

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

module.exports.change_load_state = (req, res) => {
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
    { id: req.body.id, assigned_to: req.user.id, status: 'assigned' },
    (err, load) => {
      if (err) {
        res.status(500).json({
          status: err,
        });
        return;
      }

      if (!load) {
        res.status(400).json({
          status: 'No such load in assigned state',
        });
        return;
      }

      const newState = utils.getNextLoadState(load.state);
      if (!newState) {
        res.status(500).json({
          status: 'Unexpected server error',
        });
        return;
      }

      Load.findOneAndUpdate(
        {
          id: load.id,
          assigned_to: load.assigned_to,
        },
        {
          state: newState,
          $addToSet: {
            logs: {
              message: `State change. New state: ${newState}`,
              time: Date.now(),
            },
          },
        },
        async (error, updatedLoad) => {
          if (error) {
            res.status(500).json({
              status: error,
            });
            return;
          }

          if (!updatedLoad) {
            res.status(500).json({
              status: 'Unknown server error',
            });
            return;
          }

          if (newState === 'Arrived to delivery') {
            await Load.findOneAndUpdate(
              { id: updatedLoad.id },
              {
                status: 'shipped',
                $addToSet: {
                  logs: {
                    message: `Load has been shipped by driver ID: ${load.assigned_to}`,
                    time: Date.now(),
                  },
                },
              },
              async (shipError, shipLoad) => {
                if (shipError) {
                  res.status(500).json({
                    status: shipError,
                  });
                  return;
                }

                console.log(
                  `Load has been shipped by driver ID: ${load.assigned_to}. ID: ${load.id}. Updated by: ${req.user.id}`
                );

                const mailData = {
                  owner_email: '',
                  owner_fullname: '',
                  driver_email: req.user.email,
                  driver_id: req.user.id,
                  load_id: shipLoad.id,
                  load_name: shipLoad.name,
                };

                await User.findOne(
                  { id: shipLoad.created_by },
                  (userErr, user) => {
                    if (userErr) {
                      res.status(500).json({
                        status: error,
                      });
                      return;
                    }

                    mailData.owner_email = user.email;
                    mailData.owner_fullname = user.fullname;
                  }
                );

                if (!mailData.owner_email) {
                  console.log(
                    `Mail sending failed in shipping finish (shipper). Load ID: ${shipLoad.id}`
                  );
                  return;
                }

                utils.send_mail(
                  'load_shipped_shipper',
                  mailData,
                  mailData.owner_email
                );

                if (!mailData.driver_email) {
                  console.log(
                    `Mail sending failed in shipping finish (driver). Load ID: ${shipLoad.id}`
                  );
                  return;
                }

                utils.send_mail(
                  'load_shipped_driver',
                  mailData,
                  mailData.driver_email
                );
              }
            );

            await Truck.findOneAndUpdate(
              {
                assigned_to: req.user.id,
              },
              {
                status: 'IS',
              },
              (truckError, truck) => {
                if (truckError) {
                  res.status(500).json({
                    status: truckError,
                  });
                }
              }
            );
          }

          res.status(200).json({
            status: 'Load state changed',
          });

          console.log(
            `Load state changed to ${newState}. ID: ${load.id}. Updated by: ${req.user.id}`
          );

          const mailData = {
            owner_fullname: '',
            owner_email: '',
            load_name: updatedLoad.name,
            load_id: updatedLoad.id,
            load_state: newState,
          };

          await User.findOne(
            { id: updatedLoad.created_by },
            (userErr, user) => {
              if (userErr) {
                res.status(500).json({
                  status: error,
                });
                return;
              }

              mailData.owner_email = user.email;
              mailData.owner_fullname = user.fullname;
            }
          );

          if (!mailData.owner_email) {
            console.log(
              `Mail sending failed in state change. Load ID: ${load.id}`
            );
            return;
          }

          utils.send_mail('load_state_change', mailData, mailData.owner_email);
        }
      );
    }
  );
};
