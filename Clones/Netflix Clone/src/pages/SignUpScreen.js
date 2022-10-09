import React, { useRef } from 'react';
import { auth } from '../firebase';
import "./SignUpScreen.css";

function SignUpScreen() {

    // To capture the changing value of the input

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(
            // To get the value email and password using reference
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser);
        }).catch((error) => {
            alert(error.message);
        });

    };

    const signIn = (e) => {
        e.preventDefault();

        // To check if the user sing in or not

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser)
        }).catch((error) => {
            alert(error.message);
        });
    };
    
    return (
      <div className="signUpScreen">
        <form>
          <h1>Sign In</h1>
          <input ref={emailRef} placeholder="Email" type="email" />
          <input ref={passwordRef} placeholder="Password" type="password" />
          <button type="submit" onClick={signIn}>Sign In</button>
          <h4>
            <span className="signUpScreen-gray">New to Netflix? </span>
            <span className="signUpScreen-link" onClick={register}>Sign Up now.</span>
          </h4>
        </form>
      </div>
    )
}

export default SignUpScreen
