const nodemailer = require('nodemailer');



async function sendVerificationEmail(to, otp) {
    try {
        
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, 
            auth: {
                user: 'chasity.blanda@ethereal.email', 
                pass: 'gZZXCdjVGXWmFQPZhu'  
            }
        });

        
        let mailOptions = {
            from: '"Test Sender" <test@example.com>', 
            to: to, 
            subject: 'OTP Verification', 
            text: `Your OTP is: ${otp}` 
        };

        
        let info = await transporter.sendMail(mailOptions);

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    } catch (error) {
        console.error('Error sending email:', error);
    }
}


async function sendVerificationEmail1(to, otp) {
    console.log('in the email sender');
    
    let transporter = nodemailer.createTransport({
        host: 'live.smtp.mailtrap.io',
        port: 587,
        secure: false,
        auth: {
            user: '', 
            pass: ''
        }
    });

    
    let mailOptions = {
        from: process.env.MAIL_USERNAME, 
        to: to,
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp}`
    };

    
    await transporter.sendMail(mailOptions);
}

module.exports =  {sendVerificationEmail} ;
