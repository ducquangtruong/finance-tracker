import { configureStore } from "@reduxjs/toolkit";
import recordReducer from "./FinancialRecordSlice";

export default configureStore({
  reducer: {
    records: recordReducer
  }
})