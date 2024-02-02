// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();

// ##############################################################
// CREATE ROUTER
// ##############################################################
const controller = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// ##############################################################
// DEFINE ROUTES
// ##############################################################


router.get('/:user_id',jwtMiddleware.verifyToken, controller.getSpecificUser); // select user by id
router.put('/:user_id',jwtMiddleware.verifyToken, controller.updateUserById); // update user by id
router.delete('/:user_id',jwtMiddleware.verifyToken, controller.deleteUserById); // delete user by id

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;