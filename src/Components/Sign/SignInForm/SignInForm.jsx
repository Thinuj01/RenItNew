import React, { useState } from 'react'
import './SignInForm.css'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

function SignInForm() {
  const [userName, setUserName] = useState('');
  const [userPswd, setUserPswd] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const status = '1';
    console.log(status);
    axios.post('http://localhost:80/RentIT/Controllers/userLoginController.php', {
      userName: userName,
      userPswd: userPswd,
      status: status,
    }, {
      withCredentials: true
    })
      .then(response => {
        console.log(response.data);
        if(response.data == "Account Validated"){
            alert("Login Successfull");
            navigate('/');
        }else{
            alert("Invalid Username or Password");
        }

      })
      .catch(error => {
        console.error('There was an error signing in!', error);
      });
  };

  return (
    <div id="signInFormContainer">
      <div className="signInTitle">
        Sign in
      </div>
      <div className="signInForm">
        <form onSubmit={handleSubmit}>
          <div className="name_pswd">
            <input
              type="text"
              name='userName'
              placeholder='Email or NIC'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="password"
              name="userPswd"
              placeholder='Password'
              value={userPswd}
              onChange={(e) => setUserPswd(e.target.value)}
            />
          </div>

          <div className="remember_fogot">
            <div className="remberDiv">
              <input type="checkbox" name="remberMe" id="" />
              <label htmlFor="remberMe">Remember me</label>
            </div>
            <div className="forgotDiv">
              <Link to='/forgotpswd'>Forgot password</Link>
            </div>
          </div>

          <input type="submit" name='submit' value="Sign in" />

          <div className="signUpQ">
            <p>Don't you have an account? <Link to="/signup">Sign up</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignInForm
