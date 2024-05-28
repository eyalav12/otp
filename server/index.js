const express=require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
require('dotenv').config();

const app=express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("connected to db");
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`);
    });
}).catch((e)=>{
    console.log("failed",e);
});
