import { Form, Modal, Button } from 'react-bootstrap';
import { useRef, useState } from 'react';
import useBudgets from '../contexts/BudgetContext';

const AddBudgetModal = ({show, handleClose}) => {  

  const nameRef = useRef();
  const maxRef = useRef();
  const { addBudget } = useBudgets();

  const handleSubmit = (e) => {
    e.preventDefault()
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value)
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
          <Form.Group controlId='name' className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type='text' required/>
          </Form.Group>
          <Form.Group controlId='max' className='mb-3'>
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control ref={maxRef} type='number' required min={0} step={0.01}/>
          </Form.Group>
          <div className="d-flex justify-content content-end">
            <Button type='submit' name='submit' variant='primary'>Add</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );

}

export default AddBudgetModal;