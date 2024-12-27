import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import RecordForm from "../../components/RecordForm/RecordForm";
import RecordTable from "../../components/RecordTable/RecordTable";
import styles from "./Transactions.module.css";

function Transactions() {
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
        <div className={styles.container}>
          <RecordForm />
          <RecordTable />
        </div>
      </SignedIn>
      <SignedOut>
        <Navigate to="/auth" />
      </SignedOut>
    </>
  );
}

export default Transactions;
