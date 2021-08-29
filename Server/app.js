const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');

const userRouter=require('./routes/userRoutes');
const classRouter=require('./routes/classRoutes');
const classworkRouer=require('./routes/classworkRouter')

dotenv.config();
require('./db/connection');
console.log(new Date())

const app=express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/user",userRouter);
app.use("/class",classRouter);
app.use("/classwork",classworkRouer)

app.get("/",(req,res)=>{
    res.status(200).send({
        message:"Success"
    })
})

app.listen(3002,()=>{
    console.log("server started....")
})