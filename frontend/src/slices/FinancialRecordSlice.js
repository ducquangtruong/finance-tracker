import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BACKEND_URL = "http://localhost:4000/api/v1/financial-records";

const initialState = {
  records: [],
};

export const financialRecordSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    addRecord: (state, action) => {
      state.records.push(action.payload);
    },
    updateRecord: (state, action) => {
      const existingPost = state.records.find(
        (record) => record.id === action.payload
      );
      if (existingPost) {
        // Update existing post
      }
    },
    deleteRecord: (state, action) => {
      state.records = state.records.filter(
        (record) => record !== action.payload
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(asyncFetchRecords.pending, (state, action) => {
        console.log("GET pending...");
      })
      .addCase(asyncFetchRecords.fulfilled, (state, action) => {
        console.log("GET success.");
        if (action.payload) state.records = action.payload;
      })
      .addCase(asyncFetchRecords.rejected, (state, action) => {
        console.log("GET failed.");
      })
      .addCase(asyncAddRecords.pending, (state, action) => {
        console.log("POST pending...");
      })
      .addCase(asyncAddRecords.fulfilled, (state, action) => {
        console.log("POST success.");
        if(action.payload) state.records.push(action.payload);
      })
      .addCase(asyncAddRecords.rejected, (state, action) => {
        console.log("POST failed.");
      });
  },
});

export default financialRecordSlice.reducer;

export const { addRecord, updateRecord, deleteRecord } =
  financialRecordSlice.actions;

export const asyncFetchRecords = createAsyncThunk(
  "records/asyncFetchRecords",
  async (userId) => {
    try {
      const res = await fetch(BACKEND_URL + `/getAllByUserID/${userId}`);
      return res.json();
    } catch (err) {
      console.log(err);
    }
  }
);

export const asyncAddRecords = createAsyncThunk(
  "records/asyncAddRecords",
  async (record) => {
    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        body: JSON.stringify(record),
        headers: {
          "Content-Type": "application/json"
        }
      });
      return res.json();
    } catch (err) {
      console.log(err);
    }
  }
);
