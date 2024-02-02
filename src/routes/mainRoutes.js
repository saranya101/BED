// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();

// ##############################################################
// CREATE ROUTER
// ##############################################################
// SECTION A
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');
// const progressRoutes = require('./progressRoutes');


// // SECTION B
// const wizardRoutes = require('./wizardRoutes');
// const spellRoutes = require('./spellRoutes');
// const questRoutes = require('./questRoutes');
// const jwtMiddleware = require('../middlewares/jwtMiddleware');
// const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
// const userController = require('../controllers/userController');
// const messageRoutes = require('./messageRoutes');
// const adminRoutes = require('./adminRoutes')


// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);
// router.use('/task_progress', progressRoutes);
// router.use('/wizard', wizardRoutes);
// router.use('/spells', spellRoutes);
// router.use('/quests', questRoutes)
// router.use('/messages', messageRoutes)
// router.use('/admin', adminRoutes)



// router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
// router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router 