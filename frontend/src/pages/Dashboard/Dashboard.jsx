import React, { useMemo } from "react";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
  useUser,
} from "@clerk/clerk-react";
import FinancialRecordList from "./FinancialRecordList";
import FinancialRecordForm from "./FinancialRecordForm";
import { Navigate } from "react-router-dom";
import "./FinancialRecord.css";
import { useSelector } from "react-redux";

function Dashboard() {
  const { user } = useUser();
  const records = useSelector((state) => state.records.records);
  const totalMonthly = useMemo(() => {
    let totalAmount = 0;
    records.forEach((record) => {
      totalAmount += record.amount;
    });
    return totalAmount;
  }, [records]);

  return (
    <>
      <SignedIn>
        <div className="dashboard-container">
          <h1>Welcome {user?.firstName}! Here are your finances: </h1>
          <FinancialRecordForm />
          <div>Total Monthly: ${totalMonthly}</div>
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
