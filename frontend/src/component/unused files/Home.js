import React, { useEffect } from 'react'
import { useState } from "react";
import "./Home.css";
import Products from "./Products";
import Footer from './Footer';
import axios from 'axios';
import { Authuse } from '../UserAuth';

const Home = () => {
    const useauth=Authuse()
    const URLlink=useauth.productsUrl

    const [productList, setProductList] = useState([]);
    const [productCheck,setproductCheck]=useState([])


    useEffect(()=>{
        axios.get(URLlink).then(res=>setproductCheck(res.data)).catch(err=>console.log(err))
        const fillVerify=productCheck.filter((item)=>item.Status==="Verified")
        setProductList(fillVerify)
    },[productCheck])

  


  
    return (
        <div>
            <div className="home">
                <h1 className='proCount'>Properties (<span>{productList.length}</span>)</h1>
                <hr/>
                <br/>
                <Products productList={productList} />
            </div>
            <Footer />
        </div>

    )
}

export default Home
