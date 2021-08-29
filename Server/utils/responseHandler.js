module.exports.successHandler=(res,data,message,statusCode=200)=>{
  return  res.status(statusCode).json({
        status:"success",
        data,
        message:message?message:"Successfull"
    })
}

module.exports.failureHandler=(res,message,statusCode=500)=>{
    return res.status(statusCode).json({
        status:"failure",
        message:message?message:"Some internal error occured"
    })
}