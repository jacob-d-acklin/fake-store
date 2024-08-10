import './index.css'
import './App.css';
import {
  Route,
  Routes,
} from "react-router-dom";
import RootLayout from './Routes/RootLayout';
import ErrorPage from './error-page';
import Product from './Routes/Product';
import Products from './Routes/Products';
import { Cart } from './Routes/Cart';
import { useState,useEffect } from 'react';
import { CartProvider } from 'react-use-cart';



function App() {
  // import data state
  const [fakedata, setFakeData] = useState([])
  
        useEffect(()=>{
        async function getData(){ 
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            console.log(data)
            
            setFakeData(data)
        }
        getData()

  
    },[])
  return (
    <CartProvider>
    <div>
      <Routes>
        <Route path='/' element={<RootLayout/>} errorElement={<ErrorPage/>}>
          <Route path='/' element={<Products setFakeData={setFakeData} fakedata={fakedata}/>}/>
          <Route path='/:productId' element={<Product setFakeData={setFakeData} fakedata={fakedata}/>}/>
        </Route>
        <Route path='cart' element={<Cart/>}/>
      </Routes>
    </div>
    </CartProvider>
  );
}

export default App;
