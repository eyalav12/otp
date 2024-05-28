const express=require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
require('dotenv').config();

const cors = require('cors');
const otpRouter=require('./routes/otpRoutes');
const app=express();
app.use(cors());

const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200 
  };
  
  
app.use(cors(corsOptions));
app.use(express.json());
app.use(otpRouter);







mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("connected to db");
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`);
    });
}).catch((e)=>{
    console.log("failed",e);
});
