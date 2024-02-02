// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();

// ##############################################################
// CREATE ROUTER
// ##############################################################
const controller = require('../controllers/messageController')
const jwtMiddleware = require('../middlewares/jwtMiddleware');
// ##############################################################
// DEFINE ROUTES
// ##############################################################

router.post('/:user_id',jwtMiddleware.verifyToken, controller.createMessage);
router.get('/', controller.readAllMessage);
router.get('/:user_id',jwtMiddleware.verifyToken, controller.readMessageById);
router.put('/:id', jwtMiddleware.verifyToken, controller.updateMessageById);
router.delete('/:id', jwtMiddleware.verifyToken, controller.deleteMessageById);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;