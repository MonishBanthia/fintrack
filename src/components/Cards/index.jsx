import React from 'react'
import { Row , Card } from 'antd';
import './styles.css';
import Button from '/src/components/Button';


function Cards({ income, expense, totalbalance, showExpenseModal,  showIncomeModal , reset}) {
  return (
    <div>
        <Row className='my-row'>
           <Card  className='my-card' >
            <h2>Current Balance</h2>
            <p className='my-p'>${totalbalance}</p>
            <Button text="Reset Balance" blue={true} onClick={reset} ></Button>
           </Card>
           <Card  className='my-card' >
           <h2>Current Income</h2>
            <p className='my-p'>${income}</p>
            <Button text="Add Income" blue={true} onClick={showIncomeModal}></Button>
           </Card>
           <Card  className='my-card' >
           <h2>Current Expence</h2>
            <p className='my-p'>${expense}</p>
            <Button text="Add Expence" blue={true} onClick={showExpenseModal}></Button>
           </Card>

        </Row>
    </div>
  )
}

export default Cards