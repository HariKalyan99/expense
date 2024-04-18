import React, { useContext, useEffect, useState } from 'react'
import { MdOutlineCancel } from "react-icons/md";
import { ExpenseListStore } from './Dashboard';
import ExpenseModal from './ExpenseModal';
import { MdFastfood } from "react-icons/md";
import { BsSuitcase2Fill } from "react-icons/bs";
import { MdOutlineLiveTv } from "react-icons/md";
import styles from './Transactions.module.css'


const Transactions = ({listItem}) => {
    
  const {handleDelete} = useContext(ExpenseListStore);

  const [getModal, setModal] = useState(false);

  const convertDate = (date) => {
    let newDate = new Date(date);
    return newDate.toDateString()
  }
 

  return (
    <div style={{height: "100px", borderBottom: "1px solid black", display: "flex", justifyContent: "space-between",  width: "95%" }}>
    <div style={{display: "flex", gap: "10%", justifyContent: "center", alignItems: "center"}}>
      <div >
      {listItem.category === "Food" ? <MdFastfood  size={30}/> :  listItem.category === "Travel" ? <BsSuitcase2Fill   size={30}/> : <MdOutlineLiveTv   size={30}/>}
      </div>
        <div>
        <p style={{textAlign: "center", fontSize: "larger", fontWeight: "bold"}}>{listItem.title}</p>
        <p style={{textAlign: "center", fontSize: "small"}}>{convertDate(listItem.date)}</p>
        </div>
        </div>

        <div style={{display: "flex", justifyContent: "center", gap: "10px",alignItems: "center", width: "200px"}}>
            <h3 style={{color: "var(--primary-button)"}}>₹{listItem.price}</h3>
            <button className={styles.resetBtn} onClick={() => handleDelete(listItem.id, listItem.price)}><MdOutlineCancel color='white' size={30}/></button>
            <button onClick={() => setModal(!getModal)} className={styles.editBtn}>{getModal ?  "Cancel"  :"Edit!"}</button>
            {getModal && <ExpenseModal  previousTransaction={listItem} setModal={setModal} getModal={getModal} modalWhich={"Edit Transaction"}/>}
            
        </div>
    </div>
  )
}

export default Transactions