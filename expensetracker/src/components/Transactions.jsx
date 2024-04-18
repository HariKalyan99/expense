import React, { useContext, useEffect, useState } from 'react'
import { MdOutlineCancel } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { ExpenseListStore } from './Dashboard';
import ExpenseModal from './ExpenseModal';

const Transactions = ({listItem}) => {
    
  const {handleDelete} = useContext(ExpenseListStore);

  const [getModal, setModal] = useState(false);
 

  return (
    <div style={{height: "80px", borderBottom: "1px solid black", display: "flex", justifyContent: "space-between", margin: "1rem", width: "90%" }}>
    <div >
        <h1>{listItem.title}</h1>
        <p>{listItem.date}</p>
        </div>

        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "200px"}}>
            <h4>Rs.{listItem.price}</h4>
            <button onClick={() => handleDelete(listItem.id, listItem.price)}><MdOutlineCancel /></button>
            <button onClick={() => setModal(!getModal)}>Click</button>
            {getModal && <ExpenseModal  previousTransaction={listItem} modalWhich={"Edit Transaction"}/>}
            
        </div>
    </div>
  )
}

export default Transactions