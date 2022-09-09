const express = require('express');
const router = express.Router();
const {register, login,updatePassword,updateDetails, logout, getMe} = require('../controllers/auth');
const {protect} = require('../middleware/auth');
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/getme').get(protect,getMe);
router.route('/updatepassword').put(protect,updatePassword);
router.route('/updatedetails/').put(protect,updateDetails);


module.exports = router;