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
      })
      .addCase(asyncUpdateRecords.pending, (state, action) => {
        console.log("PUT pending...");
      })
      .addCase(asyncUpdateRecords.fulfilled, (state, action) => {
        console.log("PUT success.");
        if(action.payload) {
          state.records = state.records.map(record => {
            if (record._id === action.payload._id) {return action.payload};
            return record;
          })
        };
      })
      .addCase(asyncUpdateRecords.rejected, (state, action) => {
        console.log("PUT failed.");
      })
      .addCase(asyncDeleteRecords.pending, (state, action) => {
        console.log("DELETE pending...");
      })
      .addCase(asyncDeleteRecords.fulfilled, (state, action) => {
        console.log("DELETE success.");
        state.records = state.records.filter(
          (record) => record._id !== action.payload._id
        );
      })
      .addCase(asyncDeleteRecords.rejected, (state, action) => {
        console.log("DELETE failed.");
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
