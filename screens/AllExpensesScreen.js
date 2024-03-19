import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";

function AllExpensesScreen() {
  const expenses = useSelector((state) => state.expenses.expenses);

  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
}

export default AllExpensesScreen;
