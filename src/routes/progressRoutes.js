const express = require('express');
const router = express.Router();

const controller = require('../controllers/progressController');

// const exampleController = require('../controllers/exampleController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
// const bcryptMiddleware = require('../middlewares/bcryptMiddleware');

router.post('/:task_id/complete', jwtMiddleware.verifyToken, controller.createNewProgress)


module.exports = router;