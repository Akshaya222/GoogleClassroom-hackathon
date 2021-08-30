const express=require('express')

const classController=require('../controllers/class');
const authController = require('../controllers/auth');

const router = express.Router();


router.use(authController.protect)
router.post('/create',classController.createClass);
router.patch('/join',classController.joinClass);
router.patch('/edit/:classId',classController.editClass);
router.delete('/delete/:classId',classController.deleteClass);
router.patch('/exit/:classId',classController.ExitFromClass);
router.patch('/remove-student/:classId',classController.removeStudent);

router.get('/:id',classController.getFullClassInfo)

module.exports=router