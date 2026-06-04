import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'
const ExpenseList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>All Expenses</h5>


        <button className='card-btn' onClick={onDownload}>
            <LuDownload className='text-base' /> Download
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2'>
        {transactions?.map((expense) => (
            <TransactionInfoCard
               key={expense._id}
               title={expense.category || "Receipt Expense"}
               icon={expense.icon}
               date={ expense.date
                ? moment(expense.date).format("Do MMM YYYY")
              : "Receipt Uploaded"
            }
               amount={expense.amount || "Pending OCR"}
               type="expense"
               onDelete={() => onDelete(expense._id)}
               />
        ))}
      </div>
    </div>
  )
}

export default ExpenseList
