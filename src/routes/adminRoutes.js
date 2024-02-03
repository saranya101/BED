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

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post("/login", controller.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.get('/allusers', controller.readAllUsers)
router.get('/oneuser/:user_id', controller.getSpecificUser)
router.delete('/deleteuser/:user_id',jwtMiddleware.verifyToken, controller.deleteUser);

router.delete('/deletemessages/:id', jwtMiddleware.verifyToken, controller.deleteMessageById);


router.post('/createspell', jwtMiddleware.verifyToken, controller.createSpell)
router.put('/updatespell/:spell_id', jwtMiddleware.verifyToken, controller.updateSpell);
router.delete('/deletespell/:spell_id', jwtMiddleware.verifyToken, controller.deleteSpell);

router.post('/createquest', jwtMiddleware.verifyToken, controller.createQuest);
router.put('/updatequest/:quest_id', jwtMiddleware.verifyToken, controller.updateQuest);
router.delete('/deletequest/:quest_id', jwtMiddleware.verifyToken, controller.deleteQuest)
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;