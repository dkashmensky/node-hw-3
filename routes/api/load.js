const express = require('express');
const loadController = require('../../controllers/load.controller');

const router = express.Router();

router.post('/load/create', (req, res) => {
  loadController.create_load(req, res);
});

router.get('/load/all', (req, res) => {
  loadController.get_loads(req, res);
});

router.put('/load/update', (req, res) => {
  loadController.update_load(req, res);
});

router.delete('/load/delete', (req, res) => {
  loadController.delete_load(req, res);
});

router.put('/load/post', (req, res) => {
  loadController.post_load(req, res);
});

router.get('/load/info', (req, res) => {
  loadController.get_load_info(req, res);
});

router.put('/load/process', (req, res) => {
  loadController.change_load_state(req, res);
});

module.exports = router;
