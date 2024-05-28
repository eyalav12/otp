const nodemailer = require('nodemailer');



async function sendVerificationEmail(to, otp) {
    try {
        // Create a test account for Ethereal
        let testAccount = await nodemailer.createTestAccount();

        // Create a transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'chasity.blanda@ethereal.email', // generated ethereal user
                pass: 'gZZXCdjVGXWmFQPZhu'  // generated ethereal password
            }
        });

        // Set up email data
        let mailOptions = {
            from: '"Test Sender" <test@example.com>', // sender address
            to: to, // list of receivers
            subject: 'OTP Verification', // Subject line
            text: `Your OTP is: ${otp}` // plain text body
        };

        // Send mail with defined transport object
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
