import { Stack, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from './components/AddExpenseModal';
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";

import useBugets, { UNCATEGORIZED_BUDGET_ID } from "./contexts/BudgetContext";
import { useState } from "react";


function App() {
  const [showAddBudgetModal, setShowAddBudgetModal]  = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false); 
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const {budgets, getBudgetExpenses} = useBugets();

  function openAddExpenseModal(budgetId){
    console.log("hello world");
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <>
    <Container>
      <Stack direction='horizontal' gap='2' className='mb-4'>
        <h1 className="me-auto">Budgets</h1>
        <Button variant='primary' onClick={()=>setShowAddBudgetModal(true)}>Add Budget</Button>
        <Button variant='outline-primary' onClick={()=>setShowAddExpenseModal(true)}>Add Expense</Button>
      </Stack>

      <div style={{display: "grid", gridTemplateColumns:"repeat(auto-fill, mixmax(300px, 1fr))", gap: "1rem", alignItems:"flex-start"}}>
        {/* <BudgetCard name='Entertainment' _amount={200} _max={1000}></BudgetCard> */}
        {
          budgets.map(budget=>{
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => parseInt(total) + parseInt(expense.amount),
              0
            );
            return(
              <BudgetCard 
                key={budget.id}
                name={budget.name}
                _amount={amount}
                _max={Number(budget.max)}
                openAddExpenseClick={()=>openAddExpenseModal(budget.id)}
                onViewExpensesClick={()=>{setViewExpensesModalBudgetId(budget.id)}}
              />
            )
          })
        }
        <UncategorizedBudgetCard onViewExpensesClick={()=>{setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}} />
        {/* <TotalBudgetCard /> */}
      </div>
    </Container>
    <AddBudgetModal show={showAddBudgetModal} handleClose={()=>setShowAddBudgetModal(false)} />
    <AddExpenseModal defaultBudgetId={addExpenseModalBudgetId} show={showAddExpenseModal} handleClose={()=>{setShowAddExpenseModal(false)}} />
    <ViewExpensesModal budgetId={viewExpensesModalBudgetId} handleClose={()=>setViewExpensesModalBudgetId()}/>
    </>
  );
}

export default App;
