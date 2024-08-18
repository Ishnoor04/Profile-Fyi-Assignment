import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import LoginForm from "@/components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/features/authSlice";
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
      <LoginForm />

    ) : (
      <div className="text-black pt-32">
        Already logged in please continue to <Link href='/products' className="underline">shop</Link>
      </div>
    )}
  </div>

  )
}
  

export default App;
