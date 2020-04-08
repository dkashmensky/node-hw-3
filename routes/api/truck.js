const express = require('express');
const truckController = require('../../controllers/truck.controller');

const router = express.Router();

router.post('/trucks', (req, res) => {
  truckController.create_truck(req, res);
});

router.put('/trucks/:id', (req, res) => {
  truckController.update_truck_info(req, res);
});

router.get('/trucks/types', (req, res) => {
  truckController.get_truck_types(req, res);
});

router.get('/trucks', (req, res) => {
  truckController.get_user_trucks(req, res);
});

router.delete('/trucks/:id', (req, res) => {
  truckController.delete_truck(req, res);
});

router.patch('/trucks/:id/assign', (req, res) => {
  truckController.assign_truck(req, res);
});

router.patch('/trucks/:id/unassign', (req, res) => {
  truckController.unassign_truck(req, res);
});

module.exports = router;
