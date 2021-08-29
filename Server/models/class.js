const mongoose=require('mongoose');

const classSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:100
    },
    description:{
        type:String,
        required:true,
        maxlength:500
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    students:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    code:{
        type:String,
        required:true,
        unique:true
    }
},{
    timestamps:true
})

const classModel=mongoose.model("Class",classSchema);
module.exports=classModel;