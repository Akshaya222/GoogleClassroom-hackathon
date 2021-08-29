const express = require('express');

const authController = require('../controllers/auth');
const userController=require('../controllers/user');
const classWorkController=require('../controllers/classworkController');

const router = express.Router();

router.post('/uploadImage',classWorkController.uploadImageToS3)
router.post('/uploadFile',classWorkController.uploadFileToS3)
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword',authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.get('/me', authController.getMe, authController.getUser);
// router.patch(
//   '/updateMe',
//   authController.uploadUserPhoto,
//   authController.resizeUserPhoto,
//   authController.updateMe
// );

router.get('/classes',userController.getRegiseredClasses)

router
  .route('/:id')
  .get(authController.getMe,authController.getUser)


module.exports = router;