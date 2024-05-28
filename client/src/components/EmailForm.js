import { useState } from "react";
import styles from './EmailForm.module.css';

function EmailForm(){

    const[email,setEmail]=useState('');
    const[otp,setOtp]=useState('');

    async function submitHandler(event){
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
                throw new Error('failed sending email');
            }

            const data = await response.json();
            console.log(data); 
            if (data){
                setOtp(data.otp);
            }
            
        } catch (error) {
            console.error('Error generating OTP:', error);
        }

        setEmail('');
        
        
        
    }

    function inputHandler(event){
        setEmail(event.target.value);
    }

    return (
        <div className={styles.formContainer}>
            <form onSubmit={submitHandler}>
                <input className={styles.inputField} onChange={inputHandler} value={email} type="text" placeholder="enter your email"></input>
                <button className={styles.submitButton}>submit</button>
                {email}
                {otp}
            </form>
    </div>);
}

export default EmailForm;