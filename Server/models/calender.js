const mongoose=require('mongoose');

const calenderSchema=mongoose.Schema({
    meetTopic:{
        type:String
    },
    meetAgenda:{
        type:String
    },
    meetStartUrl:{
        type:String
    },
    meetJoinUrl:{
        type:String
    },
    meetId:{
        type:String
    },
    class:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class",
        required:true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    meetTime:{
        type:Date
    },
    meetPassword:{
        type:String
    }
},{
    timestamps:true
})

const calenderModel=mongoose.model("Calender",calenderSchema);
module.exports=calenderModel;