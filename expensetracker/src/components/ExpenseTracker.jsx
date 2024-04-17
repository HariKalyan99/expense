import React, { useEffect, useState } from "react";
import styles from "./ExpenseTracker.module.css";
import ExpenseModal from "./ExpenseModal";
import ExpensePie from "./ExpensePie";

const ExpenseTracker = ({expensesData, handleReset}) => {
    const [showWallet, setShowWallet] = useState(0);
    const [showExpenses, setShowExpenses] = useState(0);

    const [getTransactions, setTransactions] = useState(true);

    useEffect(() => {
        const wallet = localStorage.getItem('expenseTracker');
        if(wallet){
            const expenseObj = JSON.parse(wallet);
            setShowWallet(expenseObj.wallet)
            setShowExpenses(expenseObj.totalExpense)
        }
    }, [getTransactions])

    const addIncomeBalance = (val) => {
        let addIncomeObj = {}

        if(val > showExpenses){
            addIncomeObj.wallet = val - showExpenses
            addIncomeObj.totalExpense = showExpenses;
        }else if(val < showExpenses){
            alert('you are bankrupted')
            let latestWallet = localStorage.getItem('expenseTracker');
            addIncomeObj.wallet = JSON.parse(latestWallet.wallet)
            addIncomeObj.totalExpense = JSON.parse(latestWallet.totalExpense);
        }
        localStorage.setItem('expenseTracker', JSON.stringify(addIncomeObj));
        setTransactions(!getTransactions)
    }

    const addExpenses = (price) => {

        let addExpense = {};

        if(price > showWallet){
            let latestWallet = localStorage.getItem('expenseTracker');
            addExpense.wallet = JSON.parse(latestWallet.wallet)
            addExpense.totalExpense = JSON.parse(latestWallet.totalExpense);
        }else if(price < showWallet){
            addExpense.wallet = showWallet - price
            addExpense.totalExpense = showExpenses + price;
        }
        localStorage.setItem('expenseTracker', JSON.stringify(addExpense));
        setTransactions(!getTransactions)
        expensesData()
    }

   

  return (
    <div className={styles.expenseContainer}>
        
      <div className={styles.walletContainer}>
        <button onClick={() => {
            handleReset();
            setTransactions(!getTransactions);
            }}>Reset my expenses</button>
        <h1>Wallet Balance: ₹{showWallet}</h1>
        <ExpenseModal addIncomeBalance={addIncomeBalance} modalWhich={"Add Balance"}/>
      </div>
      <div className={styles.addExpenseContainer}>
        <h1>Expenses: ₹{showExpenses}</h1>
        <ExpenseModal addExpenses={addExpenses} modalWhich={"Add Expenses"}/>
      </div>
      <div className={styles.pieContainer}>
        <ExpensePie />
      </div>
    </div>
  );
};

export default ExpenseTracker;
