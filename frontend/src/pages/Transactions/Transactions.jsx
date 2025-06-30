import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import RecordForm from "../../components/RecordForm/RecordForm";
import RecordTable from "../../components/RecordTable/RecordTable";
import styles from "./Transactions.module.css";
import Button from "../../components/Button/button";

const TRANSACTION_PER_PAGE = 20;

function Transactions() {
  const records = useSelector((state) => state.records.records);
  const [showForm, setShowForm] = useState(false);
  const [curPage, setCurPage] = useState(0);

  const numOfPages = Math.ceil(records.length / TRANSACTION_PER_PAGE);

  // Inefficient; could be put into backend? This is fine currently because the app is small
  let renderedRecords = [];
  if (records.length > 0) {
    renderedRecords = records
      .slice()
      .sort((a, b) => b.date > a.date)
      .slice(curPage * TRANSACTION_PER_PAGE, Math.min((curPage + 1) * TRANSACTION_PER_PAGE, records.length));
  }

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
          <RecordTable records={renderedRecords} />
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
