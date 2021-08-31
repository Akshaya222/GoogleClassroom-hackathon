const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto=require('crypto');
const multer = require('multer');
const sharp = require('sharp');

const {successHandler,failureHandler}=require('../utils/responseHandler')
const factory = require('./handleFactory');
const UserModel=require('../models/user');
const e = require('express');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };
  
  const createSendToken = (user, statusCode,message,req, res) => {
    const token = signToken(user._id);
  
    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });
  
    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
      status: 'success',
      message:message,
      token,
      data: {
        user
      }
    });
  };

exports.signup = async (req, res, next) => {
  let error=null;
   try{
    const {username,email,password,passwordConfirm}=req.body;
    if(!email || !username || !password || !passwordConfirm){
      error=new Error("Missing required fields");
      error.statusCode=400;
      throw error;
    }
    if(password!=passwordConfirm){
      error=new Error("passwords should match");
      error.statusCode=400;
      throw error;
    }
    const user=await UserModel.findOne({email});
    if(user){
      error=new Error("email address already exists, please do login");
      error.statusCode=400;
      throw error;
    }
    const newUser = await UserModel.create({
      username,
      email,
      password
    });
    
    if(!newUser){
      error=new Error("Some internal error occured,please try again");
      error.statusCode=500;
      throw error;
    }

    // const url = `${req.protocol}://${req.get('host')}/me`;
    // // console.log(url);
    // await new Email(newUser, url).sendWelcome();
  
    createSendToken(newUser, 201,"Registered Successfully" ,req, res);
   }
   catch(e){
     failureHandler(res,e.message,e.statusCode)
   }
}

exports.login = async (req, res, next) => {
    let error;
     try{
      const { email, password } = req.body;
  
      // 1) Check if email and password exist
          if (!email || !password) {
            error=new Error("pleaese provide email and password");
            error.statusCode=400;
            throw error;
      }
      // 2) Check if user exists && password is correct
      const user = await UserModel.findOne({ email }).select('+password');
    
      if (!user || !(await user.correctPassword(password, user.password))) {
        error=new Error("Incorrect email or password");
        error.statusCode=400;
        throw error;
      }
    
      // 3) If everything ok, send token to client
      createSendToken(user, 200, "Login successfull",req, res);
     }
     catch(e){
      failureHandler(res,e.message,e.statusCode)
     }
  }

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    successHandler(res,null,"Logout successfull",200)
  };

  exports.signUpWithGoogle=async(req,res)=>{
    let err;
    console.log(req);
    try{
      let {googleId,username,email}=req.body;
    if(!googleId|| !username || !email){
      err=new Error("Missing fields");
      err.statusCode=400;
      throw err;
    }
        let user=await UserModel.findOne({googleId});
        if(user){
            err=new Error("User already exists,please login!");
            err.statusCode=400;
            throw err;
        }
        let newUser=new UserModel({username,email,googleId})
        let finalUser= await newUser.save()
        if(!finalUser){
            err=new Error("some error occured");
            err.statusCode=500;
            throw err;
        }
        createSendToken(finalUser, 201,"Registered Successfully" ,req, res);
       }
       catch(e){
        return failureHandler(res,e.message,e.statusCode)
       }
}

exports.signInWithGoogle=async(req,res)=>{
  let err;  
  try{
    let {googleId,email}=req.body;
  if(!googleId|| !email){
      err=new Error("Missing Fields");
      err.statusCode=400;
      throw err;
  }
  let user=await UserModel.findOne({googleId})
  if(!user){
      err=new Error("User doesn't exist,please do signup");
      err.statusCode=400;
      throw err;
  }
  createSendToken(user, 200,"Login Successfull" ,req, res);
  }
  catch(e){
      return failureHandler(res,e.message,e.statusCode)
  }
}



exports.protect = async (req, res, next) => {
  console.log("one");
  let error;
  try{
    // 1) Getting token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
  
    if (!token) {
      console.log("two");
            error=new Error("You are not logged in! Please log in to get access");
            error.statusCode=401;
            throw error;
    }
  
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    
    // 3) Check if user still exists
    const currentUser = await UserModel.findById(decoded.id);
    if (!currentUser) {
      console.log("three");
            error=new Error("The user belonging to this token does no longer exist");
            error.statusCode=401;
            throw error;
    }
  
    // // 4) Check if user changed password after the token was issued
    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //     error=new Error("User recently changed password!Please log in again.");
    //     error.statusCode=401;
    //     throw error;
    // }
  
    // GRANT ACCESS TO PROTECTED ROUTE
    console.log("four");
    req.user = currentUser;
    next();
  }
  catch(e){
    failureHandler(res,e.message,e.statusCode)
  }
  }



  exports.forgotPassword = async (req, res, next) => {
    let error;
    try {
    // 1) Get user based on POSTed email
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
        error=new Error("There is no user with email address");
        error.statusCode=404;
        throw error;
    }
  
    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
  
    // 3) Send it to user's email
      console.log("host is",req.get('host'))
      const resetURL = `${req.protocol}://${req.get(
        'host'
      )}/api/v1/users/resetPassword/${resetToken}`;
      await new Email(user, resetURL).sendPasswordReset();
      successHandler(res,null,'Token sent to email!',200)
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      failureHandler(res,e.message?e.message:"There was an error sending the email. Try again later!",e.statusCode?e.statusCode:500)
    }
};


exports.resetPassword = async (req, res, next) => {
  let error;
  try{
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await UserModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    error=new Error("Token is invalid or has expired");
    error.statusCode=400;
    throw error;
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  if(!user.password || !user.passwordConfirm){
    error=new Error("missing password");
    error.statusCode=400;
    throw error;
  }
  if(user.password!=user.passwordConfirm){
    error=new Error("passwords doesn't match");
    error.statusCode=400;
    throw error;
  }
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, "passwords changed successfully",req, res);
}catch(e){
  failureHandler(res,e.message,e.statusCode)
}
}

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateUser = async (req, res, next) => {
  let error;
  try{
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    error=new Error("This route is not for password updates. Please use  forget password.");
    error.statusCode=400;
    throw error;
  }
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  if(req.body.email){
    error=new Error("Cannot change emailid");
    error.statusCode=400;
    throw error;

  }

  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });
  successHandler(res,{user:updatedUser},"Data updated Successfully",200)
}catch(e){
  failureHandler(res,e.message,e.statusCode);
}
}

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});


exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
}

exports.getUser = factory.getOne(UserModel);