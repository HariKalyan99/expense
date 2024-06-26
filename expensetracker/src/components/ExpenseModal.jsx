import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import {v4 as uuidv4} from 'uuid'
import { FaPencilAlt } from 'react-icons/fa';
import { ExpenseListStore } from './Dashboard';
import styles from './ExpenseModal.module.css'

const ExpenseModal = ({previousTransaction, modalWhich, setModal, getModal}) => {
  const [open, setOpen] = useState(false);

  const incomeRef = useRef("");

  const expenseTitleRef = useRef("");
  const expensePriceRef = useRef("");
  const expenseCategoryRef = useRef("");
  const expenseDateRef = useRef("");

  const [getTitle, setTitle] = useState("")
  const [getPrice, setPrice] = useState("")
  const [getCategory, setCategory] = useState("")
  const [getDate, setDate] = useState("")

  
  const {addTransaction, updateTransaction, addIncomeBalance} = useContext(ExpenseListStore)


  useEffect(() => {
    if(modalWhich === "Edit Transaction"){
      setTitle(previousTransaction.title )
      setPrice(previousTransaction.price )
      setCategory(previousTransaction.category)
      setDate(previousTransaction.date )
    }
  }, [])

  const showModal = () => {
    setOpen(true);
    
  };

  const handleCancel = () => {
    setOpen(false);
    setModal(!getModal)
  };


  const addExpenseForm = (e) => {
    e.preventDefault();

    addTransaction({ title: expenseTitleRef.current.value, price: Number(expensePriceRef.current.value), category: expenseCategoryRef.current.value, date: expenseDateRef.current.value, id: uuidv4()})

    expenseTitleRef.current.value = "";
    expensePriceRef.current.value = "";
    expenseCategoryRef.current.value = "";
    expenseDateRef.current.value = "";
    setOpen(!open)
    setModal(!getModal)
}


const updateExpenseForm = (e) => {
  e.preventDefault();
  updateTransaction({ title: getTitle, price: Number(getPrice), category: getCategory, date: getDate, id: previousTransaction.id, prevPrice: previousTransaction.price});
  setTitle("")
setPrice("")
setCategory("")
setDate("")
setOpen(!open)
setModal(!getModal)
}

const addIncomeForm = (e) => {
  e.preventDefault();
  addIncomeBalance(incomeRef.current.value)
  incomeRef.current.value = "";
  setOpen(!open)
}

  
if(modalWhich === "Add Balance"){
    return (
      <>
        <button className={styles.walletBtn} onClick={showModal}>
          {modalWhich}
        </button>
        <Modal
          open={open}
          footer={null}
          centered
          onCancel={() => setOpen(false)}
          closeIcon={null}
          keyboard={true}
        >
          {modalWhich == "Add Balance" && <form onSubmit={(e) => addIncomeForm(e)}>
          <h1>{modalWhich}</h1>
          <div className={styles.addWalletModal}>
              <label htmlFor="addBalance"></label>
              <input type="number" id='addBalance' required ref={incomeRef}/>
              <button type='submit' style={{backgroundColor: "var(--primary-button)"}}>Add income</button>
              <button type='button' onClick={handleCancel}>Cancel</button>
              </div>
          </form> }
        </Modal>
      </>
    );
}else if(modalWhich === "Add Expenses"){
    return (
        <>
          <button className={styles.expenseBtn} onClick={showModal}>
            {modalWhich}
          </button>
          <Modal
            open={open}
            footer={null}
            centered
            closeIcon={null}
            keyboard={true}
            onCancel={() => setOpen(false)}
            
          >
            {modalWhich == "Add Expenses" &&<form onSubmit={(e) => addExpenseForm(e)}>
            <h1>{modalWhich}</h1>
            <div className={styles.addExpenseModal}>
                <div className={styles.addExpenseModal1}>
                <label htmlFor="addExpenses"></label>
                <input type="text" id='addExpenses'  required ref={expenseTitleRef}/>
                <label htmlFor="addPrice"></label>
                <input type="number" id='addPrice' required ref={expensePriceRef}/>
                </div>
                <div className={styles.addExpenseModal2}>
                <label htmlFor="addCategory"></label>
                <select name="addCategory" id="addCategory" required ref={expenseCategoryRef}>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                </select>
                <label htmlFor="expenseDate"></label>
                <input type="date" id='expenseDate' required ref={expenseDateRef}/>
                </div>
     
                <div className={styles.addExpenseModal3}>
                <button style={{backgroundColor: "var(--primary-button)"}} type='submit'>Add Expense</button>
                <button onClick={handleCancel}>Cancel</button>
                </div>
                </div>
            </form>}
          </Modal>
        </>
      );
}
else if(modalWhich === "Edit Transaction"){
  return (
      <>
        <button className={styles.editBtn} onClick={showModal}>
        <FaPencilAlt size={20}/>
        </button>
        <Modal
          open={open}
          footer={null}
          centered
          closeIcon={null}
          keyboard={true}
          onCancel={() => setOpen(false)}
        >
          {modalWhich == "Edit Transaction" &&<form onSubmit={(e) => updateExpenseForm(e)}>
          <h1>{modalWhich}</h1>
              <div className={styles.addExpenseModal}>

              <div className={styles.addExpenseModal1}>


              <label htmlFor="addExpenses"></label>
              <input type="text" id='addExpenses' required value={getTitle} onChange={(e) => setTitle(e.target.value)}/>
              <label htmlFor="addPrice"></label>
              <input type="number" id='addPrice' required value={getPrice} onChange={(e) => setPrice(e.target.value)}/>

              </div>

              <div className={styles.addExpenseModal2}>
              <label htmlFor="addCategory"></label>
              <select name="addCategory" id="addCategory" required value={getCategory} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
              </select>
              


              <label htmlFor="expenseDate"></label>
              <input type="date" id='expenseDate' required value={getDate} onChange={(e) => setDate(e.target.value)}/>

              </div>

              <div className={styles.addExpenseModal3}>
              <button type='submit' style={{backgroundColor: "var(--primary-button)"}}>Edit Expense</button>
              <button onClick={handleCancel}>Cancel</button>
              </div>
              </div>
          </form>}
        </Modal>
      </>
    );
}
};


export default ExpenseModal


