// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();

// ##############################################################
// CREATE ROUTER
// ##############################################################
const controller = require('../controllers/taskController')

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post('/', controller.createNewTask);
router.get('/', controller.readAllTasks);
router.get('/:task_id',controller.selectById);
router.put('/:task_id', controller.updateTaskById);
router.delete('/:task_id',controller.deleteTaskById);
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;