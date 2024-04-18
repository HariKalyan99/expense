import React, { useContext, useEffect, useState } from 'react'
import { MdOutlineCancel } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { ExpenseListStore } from './Dashboard';
import ExpenseModal from './ExpenseModal';

const Transactions = ({listItem}) => {
    
  const {handleDelete} = useContext(ExpenseListStore);

  const [getModal, setModal] = useState(false);

  const convertDate = (date) => {
    let newDate = new Date(date);
    return newDate.toDateString()
  }
 

  return (
    <div style={{height: "70px", borderBottom: "1px solid black", display: "flex", justifyContent: "space-between", margin: "1rem", width: "90%" }}>
    <div >
        <h1>{listItem.title}</h1>
        <p>{convertDate(listItem.date)}</p>
        </div>

        <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "200px"}}>
            <h2 style={{color: "var(--primary-button)"}}>₹{listItem.price}</h2>
            <button style={{backgroundColor: "#FF3E3E", border: "none", borderRadius: "15px", padding: "5px"}} onClick={() => handleDelete(listItem.id, listItem.price)}><MdOutlineCancel color='white' size={30}/></button>
            <button onClick={() => setModal(!getModal)} style={{backgroundColor: "var(--primary-button)", border: "none", borderRadius: "15px", padding: "10px", color: 'white'}}>Edit!</button>
            {getModal && <ExpenseModal  previousTransaction={listItem} setModal={setModal} getModal={getModal} modalWhich={"Edit Transaction"}/>}
            
        </div>
    </div>
  )
}

export default Transactions