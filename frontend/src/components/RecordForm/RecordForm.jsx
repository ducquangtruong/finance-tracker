import { useUser } from "@clerk/clerk-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncAddRecords } from "../../slices/FinancialRecordSlice";
import styles from "./RecordForm.module.css";

const DEFAULT_DATA = {
  description: "",
  amount: 0,
  category: "",
  paymentMethod: "",
};

function RecordForm() {
  const { user } = useUser();
  const [formData, setFormData] = useState(DEFAULT_DATA);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      userId: user?.id,
      date: new Date(),
      ...formData,
    };

    dispatch(asyncAddRecords(newRecord));
    setFormData({ ...DEFAULT_DATA });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <label className={styles.label}>Description</label>
          <input
            className={styles.input}
            type="text"
            required
            name="description"
            onChange={(e) => handleChange(e)}
            value={formData["description"]}
          />
        </div>
        <div className={styles.formField}>
          <label className={styles.label}>Amount</label>
          <input
            className={styles.input}
            type="number"
            required
            name="amount"
            onChange={(e) => handleChange(e)}
            value={formData["amount"]}
          />
        </div>
        <div className={styles.formField}>
          <label className={styles.label}>Category</label>
          <select
            className={styles.input}
            required
            name="category"
            onChange={(e) => handleChange(e)}
            value={formData["category"]}
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className={styles.formField}>
          <label className={styles.label}>Payment Method</label>
          <select
            className={styles.input}
            required
            name="paymentMethod"
            onChange={(e) => handleChange(e)}
            value={formData["paymentMethod"]}
          >
            <option value="">Select a payment method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>
          Add record
        </button>
      </form>
    </div>
  );
}

export default RecordForm;
