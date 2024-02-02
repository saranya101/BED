// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();

// ##############################################################
// CREATE ROUTER
// ##############################################################
const controller = require('../controllers/spellController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// DEFINE ROUTES
// ##############################################################

router.get('/',  controller.readAllSpells);
router.get('/available/:user_id',jwtMiddleware.verifyToken, controller.selectByPoints);
router.get('/spellid/:spell_id', controller.selectBySpellId);
router.post('/purchase/:spell_id', jwtMiddleware.verifyToken, controller.buySpell);
router.get('/owned/:player_id', controller.selectBySpellIdPurchase);



// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;