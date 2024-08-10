import React from 'react'
import { useEffect} from 'react'
import { Link} from 'react-router-dom'
import { useCart } from 'react-use-cart'


const Products = (props) => {
  const {fakedata,setFakeData} = props
  const { addItem } = useCart();  

  useEffect(()=>{
    setFakeData(fakedata)
    window.scrollTo(0, 0)
},[setFakeData,fakedata])

function addZeroes(num) {
  const dec = num.toString().split('.')[1]
  const len = dec && dec.length > 2 ? dec.length : 2
  return Number(num).toFixed(len)
}




  return (
    <>
    <section className='h-full '>
        <h1 className='text-4xl text-center my-10 underline underline-offset-4'>Products</h1>
        <div className='h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 gap-y-6'>
        {fakedata.map((item)=>{
          return <div className='productCard rounded h-auto shadow-md' key={item.id}>
            <div className='w-64 h-64 mx-auto '>
            <Link to ={`${item.id}`}
                    state={{item}}>
              <img src={item.image} alt="" srcSet="" className='h-full w-full object-contain text-white transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110  duration-300'/>
            </Link>
          </div>
          {/* Card Header*/}
          <div className='flex flex-col justify-around items-center border-x-2 border-t-2 border-gray-100 h-28 p-3'>
              <p className='text-md w-54'>{item.title}</p>
              <p className='text-sm underline underline-offset-4'>${addZeroes(item.price)}
              
              </p>
          </div>
          {/* Card Buttons */}
          <div className='flex justify-around m-5'>
              <Link to ={`${item.id}`}
                    state={{item}}

                 className='rounded p-2 shadow-lg text-white transition duration-300 ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-blue-600 duration-300'>View Product</Link>
              <Link state={{item}}>
                <button className='rounded p-2 shadow-lg text-white transition duration-300 ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-blue-600 duration-300' onClick={()=> addItem(item)}>
                Add to Cart
                </button>
              </Link>
              
          </div>

          </div>
        })}
        


        </div>
    </section>
    </>
  )
}

export default Products