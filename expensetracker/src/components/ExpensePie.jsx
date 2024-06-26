import React, { useContext, useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';
import { ExpenseListStore } from './Dashboard';





const ExpensePie = () => {

    const {expenseList} = useContext(ExpenseListStore)

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

    const data = getData
      
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
      
      const RADIAN = Math.PI / 180;
      const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };

      const data01 = [{ name: 'Food', value:  200},
      { name: 'Travel', value: 200 },
      { name: 'Entertainment', value:  200}]

    return (
      <>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          {!expenseList.length > 0 ? <Pie
            dataKey="value"
            data={data01}
            cx="50%"
            cy="50%"
            outerRadius={70}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie> : <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"

          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}

          </Pie>}

        <Legend />
        </PieChart>
      </ResponsiveContainer>
      </>
    );
}

export default ExpensePie