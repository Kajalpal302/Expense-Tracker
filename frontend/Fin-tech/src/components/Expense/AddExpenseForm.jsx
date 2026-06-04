import React, { useState } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'


const AddExpenseForm = ({ onAddExpense }) => {
  const [income, setIncome] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
    receipt: null,
  });
 

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });
     console.log(income.receipt);
  return (
    <div>
      <EmojiPickerPopup
       icon={income.icon}
       onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
       />

       <Input
       value={income.category}
       onChange={({target}) => handleChange("category", target.value)}
       label="Category"
       placeholder="Rent, Groceries, etc"
       type="text"
       />

       <Input
       value={income.amount}
       onChange={({target}) => handleChange("amount", target.value)}
       label="Amount"
       placeholder=""
       type="number"
       />

       <Input
       value={income.date}
       onChange={({target}) => handleChange("date", target.value)}
       label="Date"
       placeholder=""
       type="date"
       />

       
        

        <div className='mt-4'>
          <label className='text-sm font-medium block mb-2'>
            Upload Receipt
          </label>

          <label className='
            flex items-center justify-center w-full p-4 border-2 border-dashed border-violet-400 rounded-xl cursor-pointer hover:bg-violet-50/10 transition
          '>
             <div className='text-center'>
              <p className='text-sm text-gray-200'>
                Click to upload receipt
              </p>
              <p className='text-xs text-gray-400 mt-1'>
                PNG, JPG, JPEG
              </p>

              {income.receipt && (
                <p className='text-sm text-violet-300 mt-2'>
                  {income.receipt.name}
                </p>
              )}

             </div>
             <input
             type="file"
             accept="image/*"
             className='hidden'
             onChange={(e) =>
              handleChange("receipt", e.target.files[0])
             }
             />
          </label>
        

        
       </div>
  <div className='flex justify-end mt-6'>
  <button
    type="button"
    className='add-btn add-btn-fill'
   
    onClick={()=>onAddExpense(income)}
    >
      Add Expense
    </button>
  </div>
</div>
  )
}

export default AddExpenseForm
