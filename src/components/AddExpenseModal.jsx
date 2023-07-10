import { Form, Modal, Button } from 'react-bootstrap';
import { useRef } from 'react';
import useBudgets  from '../contexts/BudgetContext';
import { UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetContext';

const AddExpenseModal = ({show, handleClose, defaultBudgetId}) => {

  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const {addExpense, budgets} = useBudgets();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("from form " + budgetIdRef.current.value);
    addExpense({
      description: descriptionRef.current.value,
      amount: amountRef.current.value,
      budgetId: budgetIdRef.current.value
    })
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            New Budget
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group controlId='Description' className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type='text' required/>
          </Form.Group>

          <Form.Group controlId='amount' className='mb-3'>
            <Form.Label>Amount</Form.Label>
            <Form.Control ref={amountRef} type='number' required min={0} step={0.01}/>
          </Form.Group>

          <Form.Group controlId='budgetId' className='mb-3'>
            <Form.Label>Budget</Form.Label>
            <Form.Select
              ref={budgetIdRef}
              defaultValue={defaultBudgetId}
            >
              <option value={UNCATEGORIZED_BUDGET_ID} >Uncategorized</option>
              {budgets.map(budget=>(
                <option
                  key={budget.id}
                  value={budget.id}
                >
                  {budget.name}
                </option>)
              )}
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content content-end">
            <Button type='submit' name='submit' variant='primary'>Add</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}

export default AddExpenseModal;