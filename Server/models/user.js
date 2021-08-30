const mongoose=require('mongoose');
const crypto=require('crypto');
const bcrypt = require('bcryptjs');

const userSchema=mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        trim:true
    },
    password:{
        type: String
        // required: true
    },
    googleId:{
      type:String
    },
     profile_picture:{
        type: Object,
        required: false
    },
    token: {
        type: String,
        required:false
    },
    passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
},{
    timestamps:true
})

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();
  
    this.passwordChangedAt = Date.now() + 1000;
    next();
});

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    // console.log({ resetToken }, this.passwordResetToken);
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
  };

  userSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
  
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

  userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
  };

const userModel=mongoose.model("User",userSchema);
module.exports=userModel;
