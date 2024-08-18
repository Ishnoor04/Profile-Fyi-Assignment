import { fetchUser, logout } from "@/features/authSlice";
import { fetchData, getCartTotal } from "@/features/cartSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function Navbar() {
  const { cart, totalQuantity, totalPrice } = useSelector(
    (state) => state.allCart
  );
  const {user} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const router = useRouter()
  useEffect(() => {
    dispatch(getCartTotal());
    
  }, [cart]);
  useEffect(()=>{
    dispatch(fetchData())

    dispatch(getCartTotal());
  },[])
  return (
    <header
      id="navbar"
      className="fixed z-[999] w-screen bg-white py-4 shadow-xl"
    >
      <div className="header-row flex justify-between items-center px-6 md:px-10 ">
        <div className="brand-logo flex items-center justify-center">
          <Link href="/products">
            <h5 className="mt-2 text-[32px] font-bold tracking-tight text-black font-allura">
              E-Shop
            </h5>
          </Link>
        </div>
        <Link href="/cart">
          <button
            className="menu-toggle relative bg-transparent border-none cursor-pointer cart-icon flex flex-row items-center"
            id="menuToggle"
          >
            {totalQuantity > 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="62"
                height="62"
                viewBox="0 0 32 24"
              >
                <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
              </svg>
            )}
            {totalQuantity === 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="62"
                height="62"
                viewBox="0 0 32 24"
              >
                <path d="M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z" />
              </svg>
            )}
        
            <p className="text-black absolute top-[-24%] right-[40%] text-[26px]  rounded-full p-1">
              {totalQuantity}
            </p>
          </button>
        </Link>
        {user && (
          <button type="submit" onClick={()=>{
            dispatch(logout())
            dispatch(fetchUser())
            router.reload()
          }}>Logout</button>

        )}
      </div>
    </header>
  );
}
