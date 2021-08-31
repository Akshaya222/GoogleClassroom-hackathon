const mongoose=require('mongoose');

const classworkSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
        enum:['material','test','assignment']
    },
    description:{
        type:String,
        required:true,
        maxlength:500
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    photo:{
        type:String
    },
    dueDate:{
        type:String,
        required:false
    },
    task:{
        type:Object
    },
    class:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class",
        required:true
    },
    points:{
        type:Number
    },
    answers:[
        {
            student:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            answer:{
                type:Object
            },
            marks:{
                type:Number
            },
            time:{
                type:Date
            }
        }
    ]

},{
    timestamps:true
})

const classWork=mongoose.model("Classwork",classworkSchema);
module.exports=classWork;