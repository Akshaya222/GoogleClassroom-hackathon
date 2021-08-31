const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');

dotenv.config();
require('./db/connection');


const userRouter=require('./routes/userRoutes');
const classRouter=require('./routes/classRoutes');
const classworkRouer=require('./routes/classworkRouter')
const zoomRouter=require('./routes/meetRouter');

const app=express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/user",userRouter);
app.use("/class",classRouter);
app.use("/classwork",classworkRouer);
app.use("/meet",zoomRouter)

app.get("/",(req,res)=>{
    res.status(200).send({
        message:"Success"
    })
})

const port=process.env.PORT || 3002

app.listen(port,()=>{
    console.log("server started....")
})