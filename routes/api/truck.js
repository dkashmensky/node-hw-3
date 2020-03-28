const express = require('express');
const truckController = require('../../controllers/truck.controller');

const router = express.Router();

router.post('/truck/create', (req, res) => {
  truckController.create_truck(req, res);
});

router.put('/truck/update', (req, res) => {
  truckController.update_truck_info(req, res);
});

router.get('/truck/types', (req, res) => {
  truckController.get_truck_types(req, res);
});

router.get('/truck/all', (req, res) => {
  truckController.get_user_trucks(req, res);
});

router.delete('/truck/delete', (req, res) => {
  truckController.delete_truck(req, res);
});

router.put('/truck/assign', (req, res) => {
  truckController.assign_truck(req, res);
});

router.put('/truck/unassign', (req, res) => {
  truckController.unassign_truck(req, res);
});

module.exports = router;
