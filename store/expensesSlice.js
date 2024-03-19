import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      const id = new Date().toString() + Math.random().toString();
      state.expenses = [action.payload, ...state.expenses];
    },
    setExpenses: (state, action) => {
      const inverted = action.payload.reverse();
      state.expenses = action.payload;
    },
    updateExpense: (state, action) => {
      const updatableExpenseIdx = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state.expenses[updatableExpenseIdx];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state.expenses];
      updatedExpenses[updatableExpenseIdx] = updatedItem;
      state.expenses = updatedExpenses;
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
    },
  },
});

export const { addExpense, setExpenses, deleteExpense, updateExpense } =
  expensesSlice.actions;

export default expensesSlice.reducer;
