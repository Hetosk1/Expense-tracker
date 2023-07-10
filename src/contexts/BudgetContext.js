import React, { useContext, useState } from 'react';
import {v4 as uuidV4} from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export default function useBudgets() {
  return useContext(BudgetsContext)
}



export const BudgetsProvider = ({children}) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  const getBudgetExpenses = (budgetId) => {
    const filteredExpense = expenses.filter(expense => expense.budgetId === budgetId);
    if (budgetId === 'Uncategorized'){
      console.warn("From Filtered Expenese 👇 ");
      console.warn(filteredExpense);
    }
    else {
      console.log("From Filtered Expenese 👇 ");
      console.log(filteredExpense);  
    }
    return filteredExpense;
  };

  const addExpense = ({ amount, description, budgetId}) => {
    console.log(amount, description,  budgetId);
    setExpenses(prevExpenses=>{
      return [...prevExpenses, {id: uuidV4(), budgetId, amount, description}]
    })
  };

  const addBudget = ({name, max}) => {
    setBudgets(prevbudgets => {
      if(prevbudgets.find(budget=>budget.name === name)){
        return prevbudgets;
      }
      return [...prevbudgets, {id: uuidV4(), name, max}]
    })
  };

  const deleteBudget = ({id}) => {
    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id);
    })
  };
  const deleteExpense = ({id}) => {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id)
    })
  };

  return (
    <BudgetsContext.Provider value={{
      budgets,
      expenses, 
      getBudgetExpenses,
      addExpense,
      addBudget,
      deleteBudget,
      deleteExpense
    }}>
      {children}
    </BudgetsContext.Provider>
  )
}