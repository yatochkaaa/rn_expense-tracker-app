import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(expense) => expense.id}
      renderItem={renderExpenseItem}
    />
  );
}

export default ExpensesList;
