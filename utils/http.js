import axios from "axios";

const BACKEND_URL =
  "https://rn-expense-tracker-app-ef064-default-rtdb.europe-west1.firebasedatabase.app";

export async function storeExpenseApi(expenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function getExpensesApi() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");
  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: response.data[key].date,
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpenseApi(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export async function deleteExpenseApi(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
