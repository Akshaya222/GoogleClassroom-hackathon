const {successHandler,failureHandler}=require('../utils/responseHandler')

exports.getOne = (Model) =>
  async (req, res, next) => {
    let error;
    try{

    let query = Model.findById(req.params.id);
    const doc = await query;

    if (!doc) {
        error=new Error("No document found with that ID");
        error.statusCode=404;
        throw error;
    }

    successHandler(res,{data:doc},"Successfull",200)
  }
  catch(e){
    failureHandler(res,e.message,e.statusCode)
  }
}

exports.getAll = Model =>
  async (req, res, next) => {
    
    const doc = await Model.find({})

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  }
