import React, { useState } from 'react'
import {FaStoreAlt} from 'react-icons/fa'
import {BsCart3} from 'react-icons/bs'
import ShopCart from './ShopCart'
import { useCart } from 'react-use-cart'
import { useNavigate } from 'react-router-dom'



const Nav = () => {
  const [ opencart, setOpenCart ] = useState(false)

  const navigate = useNavigate()
  const {totalItems,isEmpty} = useCart();


  return (

    <div className='sticky top-0 z-40 ' >
    <nav className='h-24 bg-gray-200 flex justify-between items-center p-6 backdrop-filter backdrop-blur-lg bg-opacity-30'>
        <div className='text-4xl cursor-pointer'>
          <FaStoreAlt onClick={()=>{
            navigate("/")
          }}/>
        </div>
        
        <div className=''>
          <h1 className='text-5xl cursor-default'>Fake Store</h1>
        </div>

        <div className='flex relative h-10'>
          <BsCart3 className='text-xl m-auto cursor-pointer' onClick={()=>{
            setOpenCart(true)
          }}/>
          {(!isEmpty) 
          ? 
          <div className='cartNumber'>{totalItems}</div>
          :
          null
          }
        </div>
        {opencart && <ShopCart closeModal={setOpenCart}/>}
    </nav>
    </div>
  )
}

export default Nav