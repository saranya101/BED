// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();

// ##############################################################
// CREATE ROUTER
// ##############################################################
const controller = require('../controllers/progressController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post('/:task_id/complete', jwtMiddleware.verifyToken, controller.createNewProgress)


// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;