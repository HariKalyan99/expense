import React, { useState } from 'react'
import { MdOutlineCancel } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

const Transactions = ({listItem}) => {
    


  return (
    <div style={{height: "80px", borderBottom: "1px solid black", display: "flex", justifyContent: "space-between", margin: "1rem", width: "90%" }}>
    <div >
        <h1>{listItem.title}</h1>
        <p>{listItem.date}</p>
        </div>

        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "200px"}}>
            <h4>Rs.{listItem.price}</h4>
            <button><MdOutlineCancel /></button>
            <button><FaPencilAlt /></button>
        </div>
    </div>
  )
}

export default Transactions