import React, { useContext, useEffect, useState } from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  YAxis,
} from 'recharts';
import { ExpenseListStore } from './Dashboard';





const TopExpenses = () => {
  

  const {expenseList} = useContext(ExpenseListStore);

  const [getData, setData] = useState([])
    
    useEffect(() => {
        const foodVal = totalPieValue(expenseList, 'Food');
        const travelVal = totalPieValue(expenseList, 'Travel');
        const entertainmentVal = totalPieValue(expenseList, 'Entertainment');
        setData([{ name: 'Food', value:  foodVal},
        { name: 'Travel', value: travelVal },
        { name: 'Entertainment', value:  entertainmentVal},])
 
    }, [expenseList])


    const totalPieValue = (list, category) => {
        let totalFoodVal = 0;
        let foodArr = list.filter(x => x.category === category);
        for(let i = 0; i<foodArr.length; i++){
            totalFoodVal+=foodArr[i].price
        }
        return totalFoodVal;
    }

  
    const data = getData;


  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        layout="vertical"
        data={data}
        margin={{
          top: 20,
          right: 10,
          bottom: 20,
          left: 100,
        }}
      >
          <YAxis dataKey="name" type="category"  axisLine={false} width={1}/>
          <XAxis type="number" hide/>
        <Bar dataKey="value" barSize={20} fill="#413ea0" animationEasing='ease-in'/>
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default TopExpenses;