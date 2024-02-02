// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();

// ##############################################################
// CREATE ROUTER
// ##############################################################
const controller = require('../controllers/questController')
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// DEFINE ROUTES
// ##############################################################

router.get('/', controller.readAllQuests); 
router.get('/id/:quest_id', controller.selectById); 
router.get('/available/:user_id', controller.getAvailableQuests)
router.post('/acceptquest/:quest_id', jwtMiddleware.verifyToken, controller.acceptQuest);
router.get('/pendingquests/:user_id', jwtMiddleware.verifyToken, controller.getPendingQuests)
router.put('/questcompleted/:quest_id',jwtMiddleware.verifyToken, controller.completeQuest );
router.delete('/deletequest/:quest_id', jwtMiddleware.verifyToken, controller.deleteQuestProgress);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;