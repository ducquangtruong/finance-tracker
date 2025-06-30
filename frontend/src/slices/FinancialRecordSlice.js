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
      state.records = state.records.map(record => {
        if (record._id === action.payload._id) {return action.payload};
        return record;
      })
    },
    deleteRecord: (state, action) => {
      state.records = state.records.filter(
        (record) => record._id !== action.payload._id
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(asyncFetchRecords.fulfilled, (state, action) => {
        if (action.payload) state.records = action.payload;
      })
      .addCase(asyncAddRecords.fulfilled, (state, action) => {
        if(action.payload) state.records.push(action.payload);
      })
      .addCase(asyncUpdateRecords.fulfilled, (state, action) => {
        if(action.payload) {
          state.records = state.records.map(record => {
            if (record._id === action.payload._id) {return action.payload};
            return record;
          })
        };
      })
      .addCase(asyncDeleteRecords.fulfilled, (state, action) => {
        state.records = state.records.filter(
          (record) => record._id !== action.payload._id
        );
      })
  },
});

export default financialRecordSlice.reducer;

export const { addRecord, updateRecord, deleteRecord } =
  financialRecordSlice.actions;

export const asyncFetchRecords = createAsyncThunk(
  "records/asyncFetchRecords",
  async (userId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/getAllByUserID/${userId}`);
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

export const asyncUpdateRecords = createAsyncThunk(
  "records/asyncUpdateRecords",
  async (record) => {
    try {
      const res = await fetch(`${BACKEND_URL}/${record._id}`, {
        method: "PUT",
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

export const asyncDeleteRecords = createAsyncThunk(
  "records/asyncDeleteRecords",
  async (id) => {
    try {
      const res = await fetch(`${BACKEND_URL}/${id}`, {
        method: "DELETE"
      });
      return res.json();
    } catch (err) {
      console.log(err);
    }
  }
);
