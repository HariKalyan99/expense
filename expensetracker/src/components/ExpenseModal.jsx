import React, { useRef, useState } from 'react';
import { Button, Modal } from 'antd';
const ExpenseModal = ({addIncomeBalance, addExpenses, modalWhich}) => {
  const [open, setOpen] = useState(false);

  const incomeRef = useRef("");

  const expenseTitleRef = useRef("");
  const expensePriceRef = useRef("");
  const expenseCategoryRef = useRef("");
  const expenseDateRef = useRef("");
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const addIncomeForm = (e) => {
    e.preventDefault();
    addIncomeBalance(Number(incomeRef.current.value));
    incomeRef.current.value = ""
    setOpen(!open)
  }


  const addExpenseForm = (e) => {
    e.preventDefault();

    localStorage.setItem('expenseListFromLocal', JSON.stringify([{ title: expenseTitleRef.current.value, price: Number(expensePriceRef.current.value), category: expenseCategoryRef.current.value, date: expenseDateRef.current.value}, ...JSON.parse(localStorage.getItem('expenseListFromLocal'))]));

    addExpenses(Number(expensePriceRef.current.value));
    expenseTitleRef.current.value = "";
    expensePriceRef.current.value = "";
    expenseCategoryRef.current.value = "";
    expenseDateRef.current.value = "";
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
          closeIcon={null}
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
};


export default ExpenseModal


