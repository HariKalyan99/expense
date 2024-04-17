import React, { useContext, useEffect, useState } from 'react'
import { ExpenseListStore } from './Dashboard'

const RecentTransaction = () => {

    const {expenseList} = useContext(ExpenseListStore)
    
  
  return (
    <div>
        <h1>Recent Transactions</h1>
       {expenseList.length > 0 && expenseList.map((transactions, ind) => <h1 key={ind}>{transactions.title}</h1>)}
    </div>
  )
}

export default RecentTransaction