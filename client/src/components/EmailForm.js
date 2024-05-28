import { useState } from "react";
import styles from './EmailForm.module.css';

function EmailForm(){

    const[email,setEmail]=useState('');

    function submitHandler(event){
        event.preventDefault();
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
            </form>
    </div>);
}

export default EmailForm;