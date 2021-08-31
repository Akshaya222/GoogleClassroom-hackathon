const express=require('express')

const zoomController=require('../controllers/zoom');
const authController = require('../controllers/auth');

const router = express.Router();

router.use(authController.protect)
router.post('/verify-token',zoomController.verifyMeetingDetails);
router.get('/full-calender',zoomController.fetchCalender)
router.post('/create/:classId',zoomController.createMeeting);



module.exports=router