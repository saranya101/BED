// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();

// ##############################################################
// CREATE ROUTER
// ##############################################################
const controller = require('../controllers/wizardController')
const jwtMiddleware = require('../middlewares/jwtMiddleware');
// ##############################################################
// DEFINE ROUTES
// ##############################################################

router.get('/', controller.readAllWizards); // display all wizards in the db
router.get("/loggedin", controller.readAllWizards)
router.get('/id/:wizard_id', controller.selectById); // display wizards by wizard_id
router.get('/allspecial_ability', controller.readUniqueSpecialAbility); // display all wizards in the db
router.get('/special_ability', controller.selectBySpecialAbility); // display the spells based on the special ability
router.get('/magic_group', controller.selectByMagicGroup)
router.get('/id/:wizard_id', controller.selectById); // display students by student_id


// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;