import React, { createContext, useEffect, useState } from 'react'
import ExpenseTracker from './ExpenseTracker'
import RecentTransaction from './RecentTransaction'
import TopExpenses from './TopExpenses'
import styles from './Dashboard.module.css'

export const ExpenseListStore = createContext({
    expenseList: []
})

const Dashboard = () => {

    const [expenseList, setExpenseList] = useState([]);

    const [invokeState, setInvokeState] = useState(true);
    
    useEffect(() => {
        let expenseTracker = localStorage.getItem('expenseTracker');
        if(!expenseTracker){
            let expenses = {
                wallet: 5000,
                totalExpense: 500
            }
            localStorage.setItem('expenseTracker' , JSON.stringify(expenses))
        }
        let expensesListInLocal = localStorage.getItem('expenseListFromLocal');
        if(!expensesListInLocal){
            localStorage.setItem('expenseListFromLocal', JSON.stringify([]))
        }else {
            const list = JSON.parse(expensesListInLocal)
            setExpenseList([...list]);
        }
    }, [invokeState])


    const expensesData = () => {
        setInvokeState(!invokeState)
    }

    const handleReset = () => {
        let toDefault = {
            wallet: 5000,
            totalExpense: 0
        }
        localStorage.setItem('expenseTracker', JSON.stringify(toDefault));
        localStorage.setItem('expenseListFromLocal', JSON.stringify([]));
        setInvokeState(!invokeState)
    }
  return (
    <ExpenseListStore.Provider value={{expenseList}}>
        <div className={styles.mainContainer}>
        <h1>Expense Tracker</h1>
        <div className={styles.container1}>
        <ExpenseTracker expensesData={expensesData} handleReset={handleReset}/>
        </div>
        <div className={styles.container2}>
        <div className={styles.subContainer1}>
        <RecentTransaction />
        </div>
        <div className={styles.subContainer2}>
        <TopExpenses />
        </div>
        </div>
    </div>
    </ExpenseListStore.Provider>
  )
}

export default Dashboard