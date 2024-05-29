import React from 'react';
import EmailForm from './components/EmailForm';
import OtpValidationForm from './components/OtpValidationForm';
function App() {
  return (
    <div>
      <p style={{color:'red',fontStyle:'italic',fontSize:15,textAlign:'center'}}>OTP GENERATOR</p>
      <EmailForm></EmailForm>
      <p style={{color:'red',fontStyle:'italic',fontSize:15,textAlign:'center'}}>OTP VALIDATOR</p>
      <OtpValidationForm></OtpValidationForm>

    </div>
  );
}

export default App;