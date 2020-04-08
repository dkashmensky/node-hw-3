/* eslint-disable no-underscore-dangle */
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

  const { dimensions, payload } = req.body;

  const newLoad = new Load({
    dimensions,
    payload,
    created_by: req.user._id,
  });

  newLoad.save((error, load) => {
    if (error) {
      res.status(500).json({
        status: error,
      });
      return;
    }

    res.status(200).json({
      status: 'Load created successfully',
    });
    console.log(
      `Created: Load. ID: ${load._id}. Created by: ${load.created_by}`
    );
  });
};

module.exports.get_loads = (req, res) => {
  const validation = validateSchemas.get_loads_schema.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      status: validation.error.details[0].message,
    });
    return;
  }

  const userType = req.user.type === 'shipper' ? 'created_by' : 'assigned_to';
  const { status } = req.body;

  if (status) {
    Load.find({ [userType]: req.user._id, status }, (err, loads) => {
      if (err) {
        res.status(500).json({
          status: err,
        });
        return;
      }

      res.status(200).json({
        status: 'Success',
        loads,
      });
    });
  } else {
    Load.find({ [userType]: req.user._id }, (err, loads) => {
      if (err) {
        res.status(500).json({
          status: err,
        });
        return;
      }

      res.status(200).json({
        status: 'Success',
        loads,
      });
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

  const reqData = {
    id: req.params.id,
    dimensions: req.body.dimensions,
    payload: req.body.payload,
  };

  const validation = validateSchemas.update_load_schema.validate(reqData);
  if (validation.error) {
    res.status(400).json({
      status: validation.error.details[0].message,
    });
    return;
  }

  Load.findOneAndUpdate(
    {
      _id: reqData.id,
      created_by: req.user._id,
      status: 'new',
      assigned_to: '',
    },
    {
      dimensions: reqData.dimensions,
      payload: reqData.payload,
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
          status:
            'Unable to update load info. Please make sure it has not been shipped already',
        });
        return;
      }

      res.status(200).json({
        status: 'Load info updated',
      });
      console.log(
        `Updated: Load. ID: ${load._id}. Updated by: ${req.user._id}`
      );
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

  const validation = validateSchemas.check_id.validate(req.params);
  if (validation.error) {
    res.status(400).json({
      status: validation.error.details[0].message,
    });
    return;
  }

  Load.findOneAndDelete(
    {
      _id: req.params.id,
      created_by: req.user._id,
      status: 'new',
      assigned_to: '',
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
          status:
            'Unable to delete load. Please make sure it has not been shipped already',
        });
        return;
      }

      res.status(200).json({
        status: 'Load deleted successfully',
      });
      console.log(
        `Deleted: Load. ID: ${load._id}. Deleted by: ${req.user._id}`
      );
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

  const validation = validateSchemas.check_id.validate(req.params);
  if (validation.error) {
    res.status(400).json({
      status: validation.error.details[0].message,
    });
    return;
  }

  Load.findOneAndUpdate(
    {
      _id: req.params.id,
      created_by: req.user._id,
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
        `Load status changed to posted. ID: ${load._id}. Updated by: ${req.user._id}`
      );

      const { dimensions, payload } = load;
      Truck.findOneAndUpdate(
        {
          'dimensions.length': { $gte: dimensions.length },
          'dimensions.height': { $gte: dimensions.height },
          'dimensions.width': { $gte: dimensions.width },
          payload: { $gte: payload },
          assigned_to: { $ne: '' },
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
              { _id: load._id },
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
              `Load status changed to new. ID: ${load._id}. Updated by: ${req.user._id}`
            );
            return;
          }

          Load.findOneAndUpdate(
            { _id: load._id },
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
                status: 'Load posted successfully',
                assigned_to: truck.assigned_to,
              });

              console.log(
                `Load status changed to assigned. ID: ${assignedLoad._id}. Updated by: ${req.user._id}`
              );
              console.log(
                `Load assigned to driver ${truck.assigned_to}. ID: ${assignedLoad._id}. Updated by: ${req.user._id}`
              );

              if (req.user.email) {
                const emailData = {
                  user_fullname: req.user.fullname,
                  load_name: assignedLoad.name,
                  load_id: assignedLoad.id,
                  driver_id: truck.assigned_to,
                  truck_name: truck.name,
                  load_state: 'En route to pick up',
                };

                utils.send_mail('load_assigned', emailData, req.user.email);
              } else {
                console.log(
                  `Sending email notification to user with ID: ${req.user._id} failed - email not found`
                );
              }
            }
          );
        }
      );
    }
  );
};

module.exports.get_load_info = (req, res) => {
  const validation = validateSchemas.check_id.validate(req.params);
  if (validation.error) {
    res.status(400).json({
      status: validation.error.details[0].message,
    });
    return;
  }

  Load.findOne({ _id: req.params.id }, (err, load) => {
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

    res.status(200).json({
      status: 'Success',
      load,
    });
  });
};

module.exports.change_load_state = (req, res) => {
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
    { _id: req.params.id, assigned_to: req.user._id, status: 'assigned' },
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
          _id: load._id,
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
              { _id: updatedLoad._id },
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
                  `Load has been shipped by driver ID: ${load.assigned_to}. ID: ${load._id}. Updated by: ${req.user._id}`
                );

                const mailData = {
                  owner_email: '',
                  owner_fullname: '',
                  driver_email: req.user.email,
                  driver_id: req.user._id,
                  load_id: shipLoad._id,
                  load_name: shipLoad.name,
                };

                await User.findOne(
                  { _id: shipLoad.created_by },
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

                if (mailData.owner_email) {
                  utils.send_mail(
                    'load_shipped_shipper',
                    mailData,
                    mailData.owner_email
                  );
                } else {
                  console.log(
                    `Sending email notification to user with ID: ${shipLoad.created_by} failed - email not found`
                  );
                }

                if (!mailData.driver_email) {
                  utils.send_mail(
                    'load_shipped_driver',
                    mailData,
                    mailData.driver_email
                  );
                } else {
                  console.log(
                    `Sending email notification to user with ID: ${req.user._id} failed - email not found`
                  );
                }
              }
            );

            await Truck.findOneAndUpdate(
              {
                assigned_to: req.user._id,
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
            status: 'Load status changed successfully',
          });

          console.log(
            `Load state changed to ${newState}. ID: ${load._id}. Updated by: ${req.user._id}`
          );

          const mailData = {
            owner_fullname: '',
            owner_email: '',
            load_name: updatedLoad.name,
            load_id: updatedLoad._id,
            load_state: newState,
          };

          await User.findOne(
            { _id: updatedLoad.created_by },
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

          if (mailData.owner_email) {
            utils.send_mail(
              'load_state_change',
              mailData,
              mailData.owner_email
            );
          } else {
            console.log(
              `Sending email notification to user with ID: ${updatedLoad.created_by} failed - email not found`
            );
          }
        }
      );
    }
  );
};
