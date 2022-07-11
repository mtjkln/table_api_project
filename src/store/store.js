import { configureStore, createSlice } from "@reduxjs/toolkit";

const tableApi = createSlice({
  name: "table",
  initialState: { table: [] },
  reducers: {
    addToTable: (state, action) => {
      state.table = action.payload;
      state.table = state.table.map((item) => ({ ...item, isEditable: false }));
      localStorage.setItem("data", state.table);
    },
    removeFromTable: (state, action) => {
      state.table = state.table.filter((item) => item.id !== action.payload);
      localStorage.removeItem("data");
      localStorage.setItem("data", state.table);
    },
    editFromTable: (state, action) => {
      console.log("first");
      for (let i = 0; i < state.table.length; i++) {
        if (state.table[i].id === action.payload) {
          state.table[i].isEditable = !state.table[i].isEditable;
        }
      }
    },
    editFname: (state, action) => {
      console.log(action);
      state.table[action.payload.index].first_name = action.payload.e;
      localStorage.removeItem("data");
      localStorage.setItem("data", state.table);
    },
    editLname: (state, action) => {
      console.log(action);
      state.table[action.payload.index].last_name = action.payload.e;
      localStorage.removeItem("data");
      localStorage.setItem("data", state.table);
    },
    editEmail: (state, action) => {
      console.log(action);
      state.table[action.payload.index].email = action.payload.e;
      localStorage.removeItem("data");
      localStorage.setItem("data", state.table);
    },
  },
});

export const tableApiAction = tableApi.actions;
const store = configureStore({ reducer: tableApi.reducer });
export default store;
