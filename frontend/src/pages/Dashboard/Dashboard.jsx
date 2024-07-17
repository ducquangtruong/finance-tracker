import React from "react";
import { SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/clerk-react";
import FinancialRecordList from "./FinancialRecordList";
import FinancialRecordForm from "./FinancialRecordForm";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { user } = useUser();
  return (
    <>
      <SignedIn>
        <div className="dashboard-container">
          <h1>Welcome {user?.firstName}! Here are your finances: </h1>
          <FinancialRecordForm />
          <FinancialRecordList />
        </div>
      </SignedIn>
      <SignedOut>
        <Navigate to="/auth" />
      </SignedOut>
    </>
  );
}

export default Dashboard;
