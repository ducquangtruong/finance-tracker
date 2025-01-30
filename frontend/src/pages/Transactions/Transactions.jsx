import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import RecordForm from "../../components/RecordForm/RecordForm";
import RecordTable from "../../components/RecordTable/RecordTable";
import styles from "./Transactions.module.css";
import Button from "../../components/Button/button";

function Transactions() {
  const { user } = useUser();
  const records = useSelector((state) => state.records.records);
  const [showForm, setShowForm] = useState(false);

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
          <header>
            <Button variant="primary" onClick={() => setShowForm(true)}>Add Transaction</Button>
          </header>
          {showForm && <RecordForm setShowForm={setShowForm}/>}
          <RecordTable />
        </main>
      </SignedIn>
      <SignedOut>
        <Navigate to="/auth" />
      </SignedOut>
    </>
  );
}

export default Transactions;
