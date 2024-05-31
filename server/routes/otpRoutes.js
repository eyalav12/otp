
const express = require('express');
const router = new express.Router();
const Otp = require('../models/otpModel');
require('dotenv').config();
const validator = require('validator');
const generateOTP = require('../otpUtils');
const { sendVerificationEmail } = require('../email');






router.post('/generate-otp', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        
        console.log('Generating OTP for email:', email);
        const otp = await generateOTP();
        console.log('Generated OTP:', otp);
        
        const otpRecord = new Otp({ email, otp, createdAt: new Date() });
        await otpRecord.save();
        console.log('OTP record saved:', otpRecord);

        try {
            await sendVerificationEmail(email, otp);
            console.log('Verification email sent');
        } catch (emailError) {
            console.error('Error sending verification email:', emailError);
            
        }

        res.send({ message: 'OTP generated and email sent', otp: otpRecord });

    } catch(error){
        console.error('Error in /generate-otp route:', error);
        res.status(500).json({ message: 'Error', error: error.message });
    }
});















        

router.post('/validate-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        
        const otpRecord = await Otp.findOne({ email });
        if (!otpRecord) {
            return res.status(400).json({ message: 'No OTP found for this email' });
        }

        
        if (otpRecord.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        
        res.json({ message: 'OTP is valid' });
    } catch (error) {
        console.error('Error in validate-otp route:', error);
        res.status(500).json({ message: 'Error', error: error.message });
    }
})

module.exports = router;









