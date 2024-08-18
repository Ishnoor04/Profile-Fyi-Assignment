import React, { useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { store } from "../app/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Navbar } from "@/components/Navbar";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import { fetchUser, login } from "@/features/authSlice";
import Link from "next/link";


const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchUser())
  },[])
  const {user} = useSelector((state)=>state.auth)
  return(
  
  <div>
    <Navbar />
    {!user ? (
      <SignupForm />

    ) : (
      <div className="text-black pt-32">
        Already logged in please continue to <Link href='/products' className="underline">shop</Link>
      </div>
    )}
  </div>

  )
}
  


export default App;
