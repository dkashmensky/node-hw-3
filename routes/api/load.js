const express = require('express');
const loadController = require('../../controllers/load.controller');

const router = express.Router();

router.post('/loads', (req, res) => {
  loadController.create_load(req, res);
});

router.get('/loads', (req, res) => {
  loadController.get_loads(req, res);
});

/**
 * @api {put} /loads/:id Update load info
 * @apiName PutLoads
 * @apiGroup Load
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization Authorization type and token, see example (JWT used)
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Authorization": "JWT token_string"
 *  }
 *
 * @apiHeader {String} Content-type Payload content type
 * @apiHeaderExample {json} Content-Header-Example:
 *  {
 *    "Content-type": "application/json"
 *  }
 *
 * @apiParam {Object} dimensions Truck new dimensions object
 * @apiParam {Number} dimensions.length Truck new length
 * @apiParam {Number} dimensions.height Truck new height
 * @apiParam {Number} dimensions.width Truck new width
 * @apiParam {Number} payload Truck new payload
 * @apiParamExample {json} Request-Example:
 *  {
 *    "dimensions": {
 *      "length": 150,
 *      "height": 200,
 *      "width": 120
 *    },
 *    "payload": 1700
 *  }
 *
 * @apiSuccess {String} status Response status
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "status": "Load info updated"
 *  }
 */
router.put('/loads/:id', (req, res) => {
  loadController.update_load(req, res);
});

/**
 * @api {delete} /loads/:id Delete load
 * @apiName DeleteLoads
 * @apiGroup Load
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization Authorization type and token, see example (JWT used)
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Authorization": "JWT token_string"
 *  }
 *
 * @apiSuccess {String} status Response status
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "status": "Load deleted successfully"
 *  }
 */
router.delete('/loads/:id', (req, res) => {
  loadController.delete_load(req, res);
});

router.patch('/loads/:id/post', (req, res) => {
  loadController.post_load(req, res);
});

/**
 * @api {get} /loads/:id/info Get load info by ID
 * @apiName GetTrucksTypes
 * @apiGroup Load
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization Authorization type and token, see example (JWT used)
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Authorization": "JWT token_string"
 *  }
 *
 * @apiSuccess {String} status Response status
 * @apiSuccess {Object[]} load Truck types array
 * @apiSuccess {Object} load.dimensions Truck dimensions object
 * @apiSuccess {Number} load.dimensions.length Truck length
 * @apiSuccess {Number} load.dimensions.height Truck height
 * @apiSuccess {Number} load.dimensions.width Truck width
 * @apiSuccess {String} load._id Unique truck type id
 * @apiSuccess {Number} load.payload Truck payload
 * @apiSuccess {String} load.assigned_to Driver assigned to load
 * @apiSuccess {string="new","posted","assigned","shipped"} load.status Load's current status
 * @apiSuccess {string="En route to pick up","Arrived to pick up","En route to delivery","Arrived to delivery"} load.state Load's current state
 * @apiSuccess {String} load.created_by Load's creator ID
 * @apiSuccess {Object[]} load.logs Event logs container
 * @apiSuccess {String} load.logs._id Unique log entry ID
 * @apiSuccess {String} load.logs.message Log message
 * @apiSuccess {Number} load.logs.time Log message timestamp
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "status": "Success",
 *  "load": {
 *    "dimensions": {
 *      "length": 1,
 *      "height": 1,
 *      "width": 1
 *    },
 *    "assigned_to": "5e8dc57afc8873f6021967fa",
 *    "status": "shipped",
 *    "state": "Arrived to delivery",
 *    "_id": "5e8df579fe1ad11f1787eb22",
 *    "payload": 1,
 *    "created_by": "5e8df38dabac3b02b79598d4",
 *    "logs": [
 *      {
 *        "_id": "5e8df5cafe1ad11f1787eb25",
 *        "message": "Unable to find suitable truck",
 *        "time": 1586361802708
 *      }
 *    ],
 *  }
 * }
 */
router.get('/loads/:id/info', (req, res) => {
  loadController.get_load_info(req, res);
});

router.patch('/loads/:id/state', (req, res) => {
  loadController.change_load_state(req, res);
});

module.exports = router;
