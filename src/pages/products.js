import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/features/authSlice";
import { fetchData } from "@/features/cartSlice";

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchUser())
    dispatch(fetchData())
  },[])
  const {user} = useSelector((state)=>state.auth)
  return(
  <div>
    <Navbar />
    <ProductCard />{" "}
  </div>
)};

export default App;
