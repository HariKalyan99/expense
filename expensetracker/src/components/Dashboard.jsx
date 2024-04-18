import React, { createContext, useEffect, useState } from "react";
import ExpenseTracker from "./ExpenseTracker";
import RecentTransaction from "./RecentTransaction";
import TopExpenses from "./TopExpenses";
import styles from "./Dashboard.module.css";

export const ExpenseListStore = createContext({
  expenseList: [],
  handleReset: () => {},
  addTransaction: () => {},
  showWallet: 0,
  showExpenses: 0,
  expensesData: () => {},
  handleDelete: () => {},
  updateTransaction: () => {}
});

const Dashboard = () => {
  const [expenseList, setExpenseList] = useState([]);

  const [invokeState, setInvokeState] = useState(true);

  const [showWallet, setShowWallet] = useState(0);
    const [showExpenses, setShowExpenses] = useState(0);

    const [getTransactions, setTransactions] = useState(true);

  useEffect(() => {
    let expenseTracker = localStorage.getItem("expenseTracker");
    if (!expenseTracker) {
      let expenses = {
        wallet: 5000,
        totalExpense: 0,
      };
      localStorage.setItem("expenseTracker", JSON.stringify(expenses));
    }

    let expensesListInLocal = localStorage.getItem("expenseListFromLocal");
    if (!expensesListInLocal) {
      localStorage.setItem("expenseListFromLocal", JSON.stringify([]));
    } else {
      const list = JSON.parse(expensesListInLocal);
      setExpenseList([...list]);
    }
  }, [invokeState]);

//wallet and expense shower
  useEffect(() => {
    const wallet = localStorage.getItem('expenseTracker');
    if(wallet){
        const expenseObj = JSON.parse(wallet);
        setShowWallet(expenseObj.wallet)
        setShowExpenses(expenseObj.totalExpense)
    }
}, [getTransactions])


  const expensesData = () => {
    setInvokeState(!invokeState);
  }; //invoker fn

  const handleReset = () => {
    let toDefault = {
      wallet: 5000,
      totalExpense: 0,
    };
    localStorage.setItem("expenseTracker", JSON.stringify(toDefault));
    localStorage.setItem("expenseListFromLocal", JSON.stringify([]));
    setInvokeState(!invokeState);
  };

  const addTransaction = ({title, price, category, date, id}) => {
    localStorage.setItem('expenseListFromLocal', JSON.stringify([{title, price, category, date, id}, ...JSON.parse(localStorage.getItem('expenseListFromLocal'))]));

    let expenseTrackerObj = {};
        let latest = JSON.parse(localStorage.getItem('expenseTracker'));

        expenseTrackerObj.wallet = latest.wallet - price
        expenseTrackerObj.totalExpense = latest.totalExpense + price

        
        localStorage.setItem('expenseTracker', JSON.stringify(expenseTrackerObj));
        setTransactions(!getTransactions)
        expensesData()
  } 




    const handleDelete = (id, price) => {

      let expenseTrackerObj = {};
        let latest = JSON.parse(localStorage.getItem('expenseTracker'));

        
        expenseTrackerObj.wallet = latest.wallet + price
        expenseTrackerObj.totalExpense = latest.totalExpense - price

       
        localStorage.setItem('expenseTracker', JSON.stringify(expenseTrackerObj));
      const deletedList = expenseList.filter(x => x.id != id);
      localStorage.setItem('expenseListFromLocal', JSON.stringify(deletedList))


      
        setTransactions(!getTransactions)
        expensesData()
    }




    const updateTransaction = ({title, price, category, date, id}) => {
      const index = expenseList.findIndex(x => x.id === id);
      const updateItem = expenseList.splice(index, 1, {title, price, category, date, id})
      localStorage.setItem('expenseListFromLocal', JSON.stringify(expenseList))
      let expenseTrackerObj = {};
        let latest = JSON.parse(localStorage.getItem('expenseTracker'));
        expenseTrackerObj.wallet = latest.wallet + updateItem[0].price - price
        expenseTrackerObj.totalExpense = latest.totalExpense - updateItem[0].price + price
        
        localStorage.setItem('expenseTracker', JSON.stringify(expenseTrackerObj));
      //bring reset

      
        setTransactions(!getTransactions)
        expensesData()
    }
  
  return (
    <ExpenseListStore.Provider value={{ expenseList, handleReset, addTransaction, showWallet, showExpenses,  expensesData, handleDelete, updateTransaction }}>
      <div className={styles.mainContainer}>
        <div style={{ display: "flex", width: "100%" }}>
          <h1 style={{ textAlign: "left", color: "var(--text-white)" }}>
            Expense Tracker
          </h1>
        </div>
        <div className={styles.container1}>
          <ExpenseTracker
            expensesData={expensesData}
          />
        </div>
        <div className={styles.container2}>
          <div className={styles.transactionsContainer}>
          <div style={{ display: "flex", width: "100%",  marginBottom: "1rem"}}>
            <h1 style={{ textAlign: "left, ", color: "var(--text-white)" }}>
              Recent Transactions
            </h1>
          </div>
          <div className={styles.subContainer1}>
            <RecentTransaction expensesData={expensesData}/>
          </div>
          </div>

          <div className={styles.topExpensesContainer}>
          <div style={{ display: "flex", width: "100%",  marginBottom: "1rem"}}>
            <h1 style={{ textAlign: "left", color: "var(--text-white)" }}>
              Recent Transactions
            </h1>
          </div>
          <div className={styles.subContainer2}>
            <TopExpenses />
          </div>
          </div>
        </div>
      </div>
    </ExpenseListStore.Provider>
  );
};

export default Dashboard;
