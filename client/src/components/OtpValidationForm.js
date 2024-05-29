

import { useState } from "react";
import styles from './EmailForm.module.css';

function OtpValidationForm() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    async function validateOtpHandler(event) {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/validate-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, otp })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            setMessage(data.message); 
        } catch (error) {
            console.error('Error validating OTP:', error);
            setMessage(`Failed to validate OTP. ${error.message}`);
        }
    }

    return (
        <div className={styles.formContainer}>
            <form onSubmit={validateOtpHandler}>
                <input 
                    className={styles.inputField} 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                    type="text" 
                    placeholder="Enter your email" 
                />
                <input 
                    className={styles.inputField} 
                    onChange={(e) => setOtp(e.target.value)} 
                    value={otp} 
                    type="text" 
                    placeholder="Enter your OTP" 
                />
                <button className={styles.submitButton}>Validate OTP</button>
                <p>{message}</p>
            </form>
        </div>
    );
}

export default OtpValidationForm