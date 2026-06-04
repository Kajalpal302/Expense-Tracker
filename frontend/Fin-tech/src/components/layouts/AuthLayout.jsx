import React from 'react'
import IMG_2 from "../../assets/images/img-2.png"
import { LuTrendingUpDown } from "react-icons/lu"



const  AuthLayout = ({ children }) => {
  return <div className="flex">
    <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 '>
      <h2 className='text-lg font-medium text-black '>Fin Tech</h2>
      {children}
    </div>
   <div className='hidden md:block w-[40vw] h-screen bg-orange-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative '>
       <div className='w-40 h-40 rounded-[30px] bg-orange-600 absolute -top-7 -left-5 z-0 '></div>
       <div className='w-48 h-56 rounded-[40px] border-[20px] border-orange-300 absolute top-[30%] -right-4 z-0' ></div>
       <div className='w-48 h-48 rounded-[40px] bg-orange-500 absolute -bottom-10 left-6 z-0'></div>
       <div className='grid grid-cols-1 z-20'>
        <StasInfoCard
        icon={<LuTrendingUpDown className="text-white text-[26px]" />}
        label="Track Your Income & Expenses"
        value="430,000"
        color="bg-orange-500"
        
        />
       </div>

       <img src={IMG_2}
       className="w-[80%] 
             absolute 
             bottom-20
             right-12
             object-contain
              rounded-2xl
             z-10
             shadow-lg shadow-orange-300/30"
            
       />
   </div>
  </div>;
};

export default AuthLayout


const StasInfoCard = ({icon, label, value,color}) => {
  return <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-orange-400/10 border border-yellow-400 z-10 ">
    <div
  className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
  >
    {icon}
  
  </div>
  <div>
  <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
  <span className="text-[20px] text-orange-500">${value}</span>
  </div>
  </div>
}