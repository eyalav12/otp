const express = require('express');
const router = new express.Router();
const Otp = require('../models/otpModel');
const validator = require('validator');

const cors = require('cors');
router.use(cors());

const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200 
};
router.use(cors(corsOptions));


function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post('/generate-otp', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        
        
        const otp = generateOTP();
        const otpRecord = new Otp({ email, otp, createdAt: new Date() });
        otpRecord.save()
        .then(() => {
            res.send(otpRecord);
        })
        .catch((e) => {
            console.error('Error saving book:', e); 
            res.status(400).send(e);
        });
        
    } catch(error){
        return res.status(400).send(error);
    }
});

module.exports = router;