const express=require('express')

const authController = require('../controllers/auth');
const classworkController=require('../controllers/classworkController')

const router = express.Router();

router.use(authController.protect)

router.post('/create/:classId',classworkController.createClassWork);
router.patch('/edit/:classId/:id',classworkController.editClassWork);
router.patch('/answer/:classId/:id',classworkController.addAnswer);
router.patch('/addmarks/:classId/:id',classworkController.addMarks);
router.delete('/delete-classwork/:classId/:id',classworkController.deleteClasswork);


module.exports=router
