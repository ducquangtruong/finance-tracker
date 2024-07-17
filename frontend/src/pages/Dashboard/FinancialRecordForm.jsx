import { useUser } from "@clerk/clerk-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncAddRecords } from "../../slices/FinancialRecordSlice";

const DEFAULT_DATA = {
  description: "",
  amount: 0,
  category: "",
  paymentMethod: "",
};

function FinancialRecordForm() {
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
    setFormData({...DEFAULT_DATA});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label>Description</label>
        <br />
        <input
          className="input"
          type="text"
          required
          name="description"
          onChange={(e) => handleChange(e)}
          value={formData["description"]}
        />
      </div>
      <div className="form-field">
        <label>Amount</label>
        <br />
        <input
          className="input"
          type="number"
          required
          name="amount"
          onChange={(e) => handleChange(e)}
          value={formData["amount"]}
        />
      </div>
      <div className="form-field">
        <label>Category</label>
        <br />
        <select
          className="input"
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
      <div className="form-field">
        <label>Payment Method</label>
        <br />
        <select
          className="input"
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
      <button type="submit" className="button">
        Add record
      </button>
    </form>
  );
}

export default FinancialRecordForm;
