import React from 'react'
import { Line, Pie } from '@ant-design/charts';


function ChartComponent({ sortedTransaction }) {

  const data = sortedTransaction.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const spendingData = sortedTransaction.filter(
    (transaction) => {
      if (transaction.type == "expense") {
        return { tag: transaction.tag, amount: transaction.amount };
      }
    }
  );

  let finalSpendings = spendingData.reduce((acc, obj) => {
    let key = obj.tag;
    if (!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount };

    } else {
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {});



  const spendingConfig = {
    data: Object.values(finalSpendings),
    width: 500,
    angleField: "amount",
    colorField: "tag",
  };



  const config = {
    data: data,
    width: 500,
    xField: 'date',
    yField: 'amount',
  };

  return (
    <div className='charts-wrapper'>
      <div>
        <h2 style={{ marginTop: 0 }}> Your Analytics </h2>
        <Line {...config} />
      </div>
      <div>
        <h2> Your Spending </h2>
        <Pie {...spendingConfig} />
      </div>
    </div>
  );
}

export default ChartComponent