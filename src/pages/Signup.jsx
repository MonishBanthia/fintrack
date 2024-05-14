import React from 'react'
import SigninSignupComponent from '/src/components/SigninSignup'
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3691235850.
import Header from '/src/components/Header'
function Signup() {
  return (
    <div>
      <Header/>
      <div className='wrapper'>
        <SigninSignupComponent></SigninSignupComponent>
        
      </div>
    </div>
  )
}

export default Signup