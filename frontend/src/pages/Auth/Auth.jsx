import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import styles from "./Auth.module.css"

function Auth() {
  return (
    <div className={styles.signInContainer}>
      <SignedOut>
        <h1 className={styles.header}> Welcome to your own personal Finance Tracker!</h1>
        <SignUpButton mode="modal" className={styles.button}/>
        <SignInButton mode="modal" className={styles.button}/>
      </SignedOut>
      <SignedIn>
        <Navigate to="/" />
      </SignedIn>
    </div>
  );
}

export default Auth;
