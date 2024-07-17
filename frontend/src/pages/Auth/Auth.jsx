import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

function Auth() {
  return (
    <div className="sign-in-container">
      <SignedOut>
        <h1> Welcome to Your Own Personal Finance Tracker!</h1>
        <SignUpButton mode="modal" />
        <SignInButton mode="modal" />
      </SignedOut>
      <SignedIn>
        <Navigate to="/" />
      </SignedIn>
    </div>
  );
}

export default Auth;
