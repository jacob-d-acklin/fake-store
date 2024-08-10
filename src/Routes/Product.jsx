import React, { useEffect } from 'react'
import { Link, useLocation} from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useCart } from 'react-use-cart';




const Product = (props) => {

    let {state} = useLocation()
    const {item} = state
    const {title,price,description,image} = item

    const {addItem} = useCart()

    function addZeroes(num) {
        const dec = num.toString().split('.')[1]
        const len = dec && dec.length > 2 ? dec.length : 2
        return Number(num).toFixed(len)
      }

      useEffect(()=>{
        
      })

  return (
    <>
    <Link to="/" className='flex pt-6'> 
    <AiOutlineArrowLeft size={30}/> 
    <h1 className='text-lg text-center '>
        back to products
    </h1> 
    </Link>
    <div className='' >
        {/* Product Page Image */}

        
        
        <div className='w-80 m-auto pt-4'>
            <img src={image} style={{backgroundSize:'cover', height:"100%", width:"100%"}} alt="" />
        </div>

        {/* Product page Description Container */}
        <div className='productDescriptionContainer flex flex-col justify-between px-12 pt-4 m-auto gap-4 xs:w-96 md:w-3/4 lg:w-4/5'>
            <p className='text-xl m-auto'>{title}</p>
            <p className='text-xl m-auto '>${addZeroes(price)}</p>
            <p className='text-md mb-4'>{description}</p>

            {/* Add to Cart Button */}
            <button className='rounded p-2 mb-4 w-32 mx-auto shadow-lg text-white transition duration-300 ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-blue-600 duration-300' 
            onClick={()=> addItem(item)}>
                <p className='text-xl text-white'>Add to cart</p>
            </button>
        
        </div>


    </div>
    </>
  )
}

export default Product