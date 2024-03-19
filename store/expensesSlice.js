import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [
      {
        id: "e1",
        description: "A pair of shoes",
        amount: 59.99,
        date: "2021-12-19",
      },
      {
        id: "e2",
        description: "A pair of trousers",
        amount: 89.29,
        date: "2022-01-05",
      },
      {
        id: "e3",
        description: "Some bananas",
        amount: 5.99,
        date: "2021-12-01",
      },
      {
        id: "e4",
        description: "A book",
        amount: 14.99,
        date: "2024-03-13",
      },
      {
        id: "e5",
        description: "Another book",
        amount: 18.59,
        date: "2024-03-12",
      },
      {
        id: "e6",
        description: "A pair of trousers",
        amount: 89.29,
        date: "2022-01-05",
      },
      {
        id: "e7",
        description: "Some bananas",
        amount: 5.99,
        date: "2021-12-01",
      },
      {
        id: "e8",
        description: "A book",
        amount: 14.99,
        date: "2022-02-19",
      },
      {
        id: "e9",
        description: "Another book",
        amount: 18.59,
        date: "2022-02-18",
      },
    ],
  },
  reducers: {
    addExpense: (state, action) => {
      const id = new Date().toString() + Math.random().toString();
      state.expenses = [{ id, ...action.payload }, ...state.expenses];
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

export const { addExpense, deleteExpense, updateExpense } =
  expensesSlice.actions;

export default expensesSlice.reducer;
