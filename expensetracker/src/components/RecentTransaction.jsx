import React, { useContext, useEffect, useState } from "react";
import { ExpenseListStore } from "./Dashboard";

import Transactions from "./Transactions";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

const RecentTransaction = () => {
  const [btnCount, setBtnCount] = useState(1);

  const { expenseList } = useContext(ExpenseListStore);

  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage, setTransactionsPerPage] = useState(3);

  useEffect(() => {
    setCurrentPage(btnCount);
  }, [btnCount]);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const curretTransactionsList = expenseList.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const paginateButton = (pg) => {
    if (pg === "next") {
      setBtnCount((prev) => prev + 1);
    } else if (pg === "prev") {
      setBtnCount((prev) => prev - 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        position: 'relative', 
      }}
    >
      {curretTransactionsList.length > 0 &&
        curretTransactionsList.map((listItem, ind) => (
          <Transactions key={ind} listItem={listItem} />
        ))}
      <div style={{ display: "flex", position: 'absolute', bottom: 3 }}>
        <button
          onClick={() => paginateButton("prev")}
          disabled={btnCount === 1 && true}
          style={{height: "40px", width: "40px", margin: "10px", borderRadius: "15px", border: "none", backgroundColor: "#F1F1F1", boxShadow: "0px 5px 1rem black"}}
        >
          <FaArrowLeftLong />
        </button>
        
        <input type="button" readonly style={{height: "40px", width: "40px", margin: "10px", borderRadius: "10px", border: "none",backgroundColor: "#43967B", boxShadow: "0px 5px 1rem black", color: 'var(--text-white)'}} value={btnCount}/>
        <button
          onClick={() => paginateButton("next")}
          disabled={expenseList.length <= btnCount * 3 && true}
          style={{height: "40px", width: "40px", margin: "10px", borderRadius: "15px", border: "none", backgroundColor: "#F1F1F1", boxShadow: "0px 5px 1rem black"}}
        >
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
};

export default RecentTransaction;
