import useBudgets, { UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

const UncategorizedBudgetCard = (props) => {
  const { getBudgetExpenses } = useBudgets();
  console.log("Uncategorized budget ID : " + UNCATEGORIZED_BUDGET_ID);
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID);
  console.log("from UncategorizedBudgetCard.jsx 👇")
  console.log(amount);
  let amt = 0;
  for(let i of amount){
    console.log(i);
    amt += parseInt(i.amount);
  }
  console.log("total Uncategorized : " + amt);
  if (amount === 0) return null;
  
  return (
    <BudgetCard gray name="Uncategorized" _amount={amt} {...props} />
  )
}

export default UncategorizedBudgetCard;