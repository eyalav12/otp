import { useState } from "react";
import styles from './EmailForm.module.css';



function EmailForm() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    async function submitHandler(event) {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/generate-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error('Failed sending email');
            }

            const data = await response.json();
            if (data) {
                setOtp(data.otp);
                setMessage('Email sent successfully. Check your inbox.');
            }
        } catch (error) {
            console.error('Error generating OTP:', error);
            setMessage('Failed to send email. Please try again.');
        }

        setEmail('');
    }

    function inputHandler(event) {
        setEmail(event.target.value);
    }

    return (
        <div className={styles.formContainer}>
            <form onSubmit={submitHandler}>
                <input className={styles.inputField} onChange={inputHandler} value={email} type="text" placeholder="Enter your email" />
                <button className={styles.submitButton}>Submit</button>
                <p>{message}</p>
            </form>
        </div>
    );
}

export default EmailForm;





