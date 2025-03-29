import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import RecordForm from "../../components/RecordForm/RecordForm";
import RecordTable from "../../components/RecordTable/RecordTable";
import styles from "./Transactions.module.css";
import Button from "../../components/Button/button";

function Transactions() {
  const records = useSelector((state) => state.records.records);
  const [showForm, setShowForm] = useState(false);
  const [curPage, setCurPage] = useState(0);

  const numOfPages = Math.ceil(records.length / 20);

  const buttons = [];
  for (let i = 0; i < numOfPages; i++) {
    buttons.push(
      <Button
        id={i}
        variant="primary"
        onClick={() => setCurPage(i)}
        size="small"
      >
        {i + 1}
      </Button>
    );
  }

  let shownRecords = [];
  if (records.length > 0) {
    shownRecords = records
      .slice()
      .sort((a, b) => b.date > a.date)
      .slice(curPage * 20, Math.min((curPage + 1) * 20, records.length));
  }

  return (
    <>
      <SignedIn>
        <main className={styles.container}>
          <header>
            <Button variant="primary" onClick={() => setShowForm(true)}>
              Add Transaction
            </Button>
          </header>
          {showForm && <RecordForm setShowForm={setShowForm} />}
          <RecordTable records={shownRecords} />
          <div className={styles.buttonContainer}>
            <ol>{buttons}</ol>
          </div>
        </main>
      </SignedIn>
      <SignedOut>
        <Navigate to="/auth" />
      </SignedOut>
    </>
  );
}

export default Transactions;
