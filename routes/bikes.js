const express = require('express');
const router = express.Router({mergeParams:true});
const { getBikes, getBike,deleteBike,updateBike, createBike } = require('../controllers/bikes');

router.route('/').get(getBikes).post(createBike);
router.route('/:id').get(getBike).post(deleteBike).put(updateBike);


module.exports = router;