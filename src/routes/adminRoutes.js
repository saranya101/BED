// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();

// ##############################################################
// CREATE ROUTER
// ##############################################################
const controller = require('../controllers/adminController')
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
const userController = require('../controllers/userController')
// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post("/login", controller.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.get('/allusers', controller.readAllUsers)
router.get('/oneuser/:user_id', controller.getSpecificUser)
router.delete('/deleteuser/:user_id',jwtMiddleware.verifyToken, controller.deleteUserById);



router.delete('/deletemessages/:id', jwtMiddleware.verifyToken, controller.deleteMessageById)
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;