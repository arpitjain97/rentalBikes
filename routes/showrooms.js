const express = require('express');
const router = express.Router();
const bikeRouter = require('./bikes');
const {getShowrooms, getShowroom, deleteShowroom, updateShowroom, createShowroom} = require('../controllers/showrooms');

router.use('/:showroomId/bikes',bikeRouter);
router.route('/').get(getShowrooms).post(createShowroom);
router.route('/:id').get(getShowroom).post(deleteShowroom).put(updateShowroom);

module.exports = router;