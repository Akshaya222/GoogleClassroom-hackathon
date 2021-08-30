const express=require('express')

const zoomController=require('../controllers/zoom');

const router = express.Router();

router.post('/create',zoomController.createMeeting);
router.post('/verify-token',zoomController.verifyMeetingDetails)
router.get('/all-meetings',zoomController.getAllMeetings);
router.get('/meeting-info',zoomController.getMeetingDetails);


module.exports=router