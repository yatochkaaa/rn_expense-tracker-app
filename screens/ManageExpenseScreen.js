import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from "../store/expensesSlice";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpenseScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const selectedExpense = useSelector((state) =>
    state.expenses.expenses.find((expense) => expense.id === editedExpenseId)
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    dispatch(deleteExpense({ id: editedExpenseId }));
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler(expenseData) {
    if (isEditing) {
      dispatch(
        updateExpense({
          id: editedExpenseId,
          data: expenseData,
        })
      );
    } else {
      dispatch(addExpense(expenseData));
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

export default ManageExpenseScreen;
