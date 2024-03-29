import { useLayoutEffect, useState } from "react";
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
import {
  storeExpenseApi,
  updateExpenseApi,
  deleteExpenseApi,
} from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpenseScreen({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

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

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpenseApi(editedExpenseId);
      dispatch(deleteExpense({ id: editedExpenseId }));
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - please try again later!");
      setIsSubmitting(false);
    }
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        dispatch(
          updateExpense({
            id: editedExpenseId,
            data: expenseData,
          })
        );
        await updateExpenseApi(editedExpenseId, expenseData);
      } else {
        const id = await storeExpenseApi(expenseData);
        dispatch(addExpense({ ...expenseData, id }));
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later!");
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
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
