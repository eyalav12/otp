


const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const otpRouter = require('./routes/otpRoutes'); 

const app = express();
app.use(cors());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(otpRouter);

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to database");

    if (require.main === module) {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}).catch((error) => {
    console.error('Database connection error:', error);
});


module.exports = app; 
