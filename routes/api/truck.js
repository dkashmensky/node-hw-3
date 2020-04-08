const express = require('express');
const truckController = require('../../controllers/truck.controller');

const router = express.Router();

router.post('/trucks', (req, res) => {
  truckController.create_truck(req, res);
});

/**
 * @api {put} /trucks/:id Update truck info
 * @apiName PutTrucks
 * @apiGroup Truck
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
 * @apiParam {String} comment Custom comment for user's truck
 * @apiParamExample {json} Request-Example:
 *  {
 *    "comment": "This is my Sprinter type truck"
 *  }
 *
 * @apiSuccess {String} status Response status
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "status": "Truck info updated"
 *  }
 */
router.put('/trucks/:id', (req, res) => {
  truckController.update_truck_info(req, res);
});

/**
 * @api {get} /trucks/types Get truck types
 * @apiName GetTrucksTypes
 * @apiGroup Truck
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization Authorization type and token, see example (JWT used)
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Authorization": "JWT token_string"
 *  }
 *
 * @apiSuccess {String} status Response status
 * @apiSuccess {Object[]} types Truck types array
 * @apiSuccess {Object} types.dimensions Truck dimensions object
 * @apiSuccess {Number} types.dimensions.length Truck length
 * @apiSuccess {Number} types.dimensions.height Truck height
 * @apiSuccess {Number} types.dimensions.width Truck width
 * @apiSuccess {String} types._id Unique truck type id
 * @apiSuccess {String} types.name Truck type name
 * @apiSuccess {Number} payload Truck payload
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "status": "Success",
 *    "types": [
 *      {
 *        "dimensions": {
 *          "length": 150,
 *          "height": 200,
 *          "width": 120
 *        },
 *        "_id": "5e7f624b1c9d4400002c1d84",
 *        "name": "SPRINTER",
 *        "payload": 1700
 *      }
 *    ]
 *  }
 */
router.get('/trucks/types', (req, res) => {
  truckController.get_truck_types(req, res);
});

router.get('/trucks', (req, res) => {
  truckController.get_user_trucks(req, res);
});

/**
 * @api {delete} /trucks/:id Delete truck
 * @apiName DeleteTrucks
 * @apiGroup Truck
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
 *    "status": "Truck deleted successfully"
 *  }
 */
router.delete('/trucks/:id', (req, res) => {
  truckController.delete_truck(req, res);
});

router.patch('/trucks/:id/assign', (req, res) => {
  truckController.assign_truck(req, res);
});

/**
 * @api {patch} /trucks/:id/unassign Unassign truck from driver
 * @apiName PatchTrucksUnassign
 * @apiGroup Truck
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
 *    "status": "Truck unassigned successfully"
 *  }
 */
router.patch('/trucks/:id/unassign', (req, res) => {
  truckController.unassign_truck(req, res);
});

module.exports = router;
