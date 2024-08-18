import React, { useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { store } from "../app/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Navbar } from "@/components/Navbar";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import { fetchUser, login } from "@/features/authSlice";
import Link from "next/link";
import { useRouter } from "next/router";

const App = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchUser());
    router.push("signup");
  }, []);
  
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default App;
