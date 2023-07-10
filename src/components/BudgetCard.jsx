import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";

const BudgetCard = ({name, _amount, _max, _gray, openAddExpenseClick, hideButton, onViewExpensesClick}) => {

  console.log("From budget Card :" + _amount);

  const classNames = [];
  if(_amount > _max){
    classNames.push('bg-danger', 'bg-opacity-10');
  } else if (_gray){
    classNames.push('bg-light');
  }

  const getProgressBarVariant = (_amount, _max) => {
    const ration = _amount / _max;
    if(ration < 0.50) return "primary"
    else if (ration < 0.75) return "warning";
    return "danger";
  }

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-item-baseline fw-normal mb-3 '>
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">{currencyFormatter.format(parseInt(_amount))} <span className="text-muted fs-6 ms-1">/{ _max && currencyFormatter.format(_max)}</span> </div>
        </Card.Title>
        <ProgressBar 
          className="rounded-pill" 
          variant={getProgressBarVariant(_amount, _max)}
          min={0}
          max={_max}
          now={_amount}
        />
        {!hideButton && <Stack direction='horizontal' gap='2' className='mt-4'>
          <Button variant='outline-primary' className='ms-auto' onClick={openAddExpenseClick}>Add Expense</Button>
          <Button onClick={onViewExpensesClick} variant='outline-secondary'>View Expense</Button>
        </Stack>}
      </Card.Body>
    </Card>
  )
}

export default BudgetCard;