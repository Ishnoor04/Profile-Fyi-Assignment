import React, { useEffect } from "react";
import CartItem from "@/components/CartItem";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/app/store";
import { Navbar } from "@/components/Navbar";
import { fetchUser } from "@/features/authSlice";

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchUser())
  })
  return(
  
  <div>
    <Navbar />
    <CartItem />{" "}
  </div>
)};

export default App;
