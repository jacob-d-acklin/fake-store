import React from 'react'

import { useCart } from 'react-use-cart'

import { useNavigate } from 'react-router-dom'





const ShopCart = ({closeModal}) => {

  const navigate = useNavigate()

  const { 
    isEmpty,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
   } = useCart()

   function addZeroes(num) {
    const dec = num.toString().split('.')[1]
    const len = dec && dec.length > 2 ? dec.length : 2
    return Number(num).toFixed(len)
  }

   
  
  return (
  
    <div style={{width: 350, height:500, backgroundColor:"white", position:'absolute', top:0, right:0}} className='rounded shadow-lg flex flex-col '>
  
        <div className='border-b-2 text-center text-xl flex justify-between align-center py-2'>
          <button className='px-2 hover:text-red-500' onClick={()=>{
        closeModal(false)
          }}>
            X
          </button>

          <h1 className=' ml-11'>
            Cart 
          </h1>

          <button className='bg-red-600 text-white text-sm mx-4 p-2' onClick={()=>emptyCart()}>
            Clear Cart
          </button>
        </div>

        <div className=' flex flex-col gap-y-3 py-3 h-full' style={{ overflowY:'auto'}}>
        {(isEmpty) 
        ? 
        <h1 className='centerMiddle text-center text-2xl'>Cart is Empty</h1> 
        : 
        items.map((item,index)=>{
          return(
          <div className='flex flex-col shadow-lg'>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', zIndex:'1'}} key={index} className=' rounded-sm py-2'>
            <img src={item.image} alt="" srcSet="" className=' rounded pl-4' style={{width:85, height:85}}/>
            <h1 className='text-center text-xs w-44'>{item.title}</h1>
            <h2 className='text-center text-sm px-2'>${addZeroes(item.price)}</h2>

            </div>
            <div className=' flex justify-between'>
              <button className='rounded p-2 shadow-lg text-white transition duration-500 ease-in-out bg-red-500 hover:-translate-y-1 hover:scale-90 hover:bg-red-600 duration-300 ml-2 mb-2 w-28 text-sm' onClick={()=>removeItem(item.id)}>
                Remove Item
              </button>
              <div className='flex px-4 '>
                <h1 className='px-4 my-2'>quantity:</h1>
                <button onClick={()=>updateItemQuantity(item.id, item.quantity -1 )}>-</button>
                <h1 className='p-2 text-red-500'>{item.quantity}</h1>
                <button onClick={()=>updateItemQuantity(item.id, item.quantity +1 )}>+</button>
              </div>
            </div>
          </div>
          )
        })}
        </div>
        <div className='border-t-2 border-inherit'>
          <h1 className='text-right px-4'>Total: ${addZeroes(cartTotal).slice(0,6)}</h1>
        </div>

        <div className=''>
        <button className='bg-red-500 text-white transition duration-500 ease-in-out bg-red-500 hover:-translate-y-1 hover:scale-90 hover:bg-red-600 duration-200' style={{minWidth:'50%',height:'40px'}} onClick={()=>{
        closeModal(false)
      }}>Continue Shopping</button>
        <button className='text-white transition duration-500 ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-90 hover:bg-blue-600 duration-100' style={{ minWidth:'50%',height:'40px'}} onClick={()=>{
          (isEmpty) ? alert("No items to purchase") :
          navigate("cart", {state: items,emptyCart})
        }}>Check Out</button>
        </div>

    </div>
  )
}

export default ShopCart;
