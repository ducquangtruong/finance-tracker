import React, { useMemo } from "react";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Dashboard.module.css";

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
        <main className={styles.container}>
          <h1 className={styles.header}>
            Welcome {user?.firstName}! Here are your finances:{" "}
          </h1>
          <div>Total: ${totalMonthly}</div>
        </main>
      </SignedIn>
      <SignedOut>
        <Navigate to="/auth" />
      </SignedOut>
    </>
  );
}

export default Dashboard;
