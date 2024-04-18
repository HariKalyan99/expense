import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import {v4 as uuidv4} from 'uuid'
import { FaPencilAlt } from 'react-icons/fa';
import { ExpenseListStore } from './Dashboard';

const ExpenseModal = ({previousTransaction, modalWhich}) => {
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

  
  const {addTransaction, expenseList, updateTransaction} = useContext(ExpenseListStore)


  useEffect(() => {
    if(modalWhich === "Edit Transaction"){
      console.log(true)
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
  };

  // const addIncomeForm = (e) => {
  //   e.preventDefault();
  //   addIncomeBalance(Number(incomeRef.current.value));
  //   incomeRef.current.value = ""
  //   setOpen(!open)
  // }


  const addExpenseForm = (e) => {
    e.preventDefault();

    addTransaction({ title: expenseTitleRef.current.value, price: Number(expensePriceRef.current.value), category: expenseCategoryRef.current.value, date: expenseDateRef.current.value, id: uuidv4()})
    // localStorage.setItem('expenseListFromLocal', JSON.stringify([{ title: expenseTitleRef.current.value, price: Number(expensePriceRef.current.value), category: expenseCategoryRef.current.value, date: expenseDateRef.current.value, id: uuidv4()}, ...JSON.parse(localStorage.getItem('expenseListFromLocal'))]));

    // addExpenses(Number(expensePriceRef.current.value));
    expenseTitleRef.current.value = "";
    expensePriceRef.current.value = "";
    expenseCategoryRef.current.value = "";
    expenseDateRef.current.value = "";
    setOpen(!open)
}


const updateExpenseForm = (e) => {
  e.preventDefault();
  updateTransaction({ title: getTitle, price: Number(getPrice), category: getCategory, date: getDate, id: previousTransaction.id});
  setTitle("")
setPrice("")
setCategory("")
setDate("")
setOpen(!open)
}

  
if(modalWhich === "Add Balance"){
    return (
      <>
        <Button type="primary" onClick={showModal}>
          {modalWhich}
        </Button>
        <Modal
          open={open}
          footer={null}
          centered
            onCancel={() => setOpen(false)}
          closeIcon={null}
          keyboard={true}
        >
          {modalWhich == "Add Balance" && <form onSubmit={(e) => addIncomeForm(e)}>
              <label htmlFor="addBalance"><h1>{modalWhich}</h1></label>
              <input type="number" id='addBalance' required ref={incomeRef}/>
              <button type='submit'>Add income</button>
              <button onClick={handleCancel}>Cancel</button>
          </form> }
        </Modal>
      </>
    );
}else if(modalWhich === "Add Expenses"){
    return (
        <>
          <Button type="primary" onClick={showModal}>
            {modalWhich}
          </Button>
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
                <label htmlFor="addExpenses"></label>
                <input type="text" id='addExpenses' required ref={expenseTitleRef}/>
                <label htmlFor="addExpenses"></label>
                <input type="number" id='addExpenses' required ref={expensePriceRef}/>
                <label htmlFor="addCategory"></label>
                <select name="addCategory" id="addCategory" required ref={expenseCategoryRef}>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                </select>
                
                <label htmlFor="expenseDate"></label>
                <input type="date" id='expenseDate' required ref={expenseDateRef}/>

                <button type='submit'>Add Expense</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>}
          </Modal>
        </>
      );
}
else if(modalWhich === "Edit Transaction"){
  return (
      <>
        <Button type="primary" onClick={showModal}>
        <FaPencilAlt />
        </Button>
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
              <label htmlFor="addExpenses"></label>
              <input type="text" id='addExpenses' required value={getTitle} onChange={(e) => setTitle(e.target.value)}/>
              <label htmlFor="addExpenses"></label>
              <input type="number" id='addExpenses' required value={getPrice} onChange={(e) => setPrice(e.target.value)}/>
              <label htmlFor="addCategory"></label>
              <select name="addCategory" id="addCategory" required value={getCategory} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
              </select>
              
              <label htmlFor="expenseDate"></label>
              <input type="date" id='expenseDate' required value={getDate} onChange={(e) => setDate(e.target.value)}/>

              <button type='submit'>Edit Expense</button>
              <button onClick={handleCancel}>Cancel</button>
          </form>}
        </Modal>
      </>
    );
}
};


export default ExpenseModal


