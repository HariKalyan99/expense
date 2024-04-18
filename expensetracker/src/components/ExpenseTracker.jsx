import React, { useContext, useEffect, useState } from "react";
import styles from "./ExpenseTracker.module.css";
import ExpenseModal from "./ExpenseModal";
import ExpensePie from "./ExpensePie";
import { ExpenseListStore } from "./Dashboard";

const ExpenseTracker = () => {
    

  const {showWallet, showExpenses} = useContext(ExpenseListStore);
   

  return (
    <div className={styles.expenseContainer}>
      <div className={styles.walletContainer}>
        <h1 style={{textAlign: "center"}}>Wallet Balance: ₹{showWallet}</h1>
        <br />
        <ExpenseModal modalWhich={"Add Balance"}/>
      </div>
      <div className={styles.addExpenseContainer}>
        <h1 style={{textAlign: "center"}}>Expenses: ₹{showExpenses}</h1>
        <br />
        <ExpenseModal  modalWhich={"Add Expenses"}/>
      </div>
      <div className={styles.pieContainer}>
        <ExpensePie />
      </div>
    </div>
  );
};

export default ExpenseTracker;
