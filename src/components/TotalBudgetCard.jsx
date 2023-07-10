import useBudgets from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

const TotalBudgetCard = (props) => {
  const {expenses, budgets} = useBudgets();
  const amount = expenses.reduce(
    (total, expenses) => parseInt(total) + parseInt(expenses.amount),
    0
  );
  
  const max = budgets.reduce(
    (total, budget) => total + budget.max,
    0
  );

  if(max === 0) return null;

  return <BudgetCard _amount={amount} name="Total" gray _max={max} hideButton/>

}

export default TotalBudgetCard;