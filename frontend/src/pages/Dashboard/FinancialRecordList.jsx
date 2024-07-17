import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchRecords } from "../../slices/FinancialRecordSlice";
import { useUser } from "@clerk/clerk-react";

function FinancialRecordList() {
  const { user } = useUser();
  const dispatch = useDispatch();
  const records = useSelector(state => state.records.records);
  
  useEffect(() => {
    dispatch(asyncFetchRecords(user?.id));
  }, [user]);

  return (
    <div>
      <ul>
        {records && records.map((record) => (
          <li key={record._id}>{record.date}{" "}{record.description}{" "}{record.amount}{" "}{record.category}{" "}{record.paymentMethod}{" "}</li>
        ))}
      </ul>
    </div>
  );
}

export default FinancialRecordList;
