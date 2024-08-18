import { store } from "@/app/store";
import { fetchUser } from "@/features/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addToCart,
  calculateSavings,
  clearSavings,
  decreaseItemQuantity,
  fetchData,
  getCartTotal,
  increaseItemQuantity,
  removeItem,
  updateCart,
} from "@/features/cartSlice";
import { handleCurrency } from "@/utils/HandleCurrency";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartItem = () => {
  const { cart, totalQuantity, totalPrice, savings, discountedPrice } =
    useSelector((state) => state.allCart);
  const { user } = useSelector((state) => state.auth);
  const [coupon, setCoupon] = useState("");
  const [right, setRight] = useState(false);
  const [wrong, setWrong] = useState(false);
  const handleCoupon = () => {
    if (coupon === "ISHNOORPER10") {
      dispatch(calculateSavings(0));
      dispatch(getCartTotal());
      setRight(true);
      setWrong(false);
    } else if (coupon === "ISHNOOR10") {
      dispatch(calculateSavings(1));
      dispatch(getCartTotal());
      setRight(true);
      setWrong(false);
    } else {
      dispatch(calculateSavings(2));
      dispatch(getCartTotal());

      setWrong(true);
      setRight(false);
    }
  };
  const removeCoupon = () => {
    dispatch(calculateSavings(2));
    dispatch(getCartTotal());
  };
  const dispatch = useDispatch();
  useEffect(() => {
    setWrong(false);
    setRight(false);
    dispatch(clearSavings());
  }, [cart]);
  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchUser());
  }, []);

  const handleIncrement = (cartItemId) => {
    dispatch(increaseItemQuantity(cartItemId));

    // Using a short delay to allow Redux state to update before logging the new value
    setTimeout(() => {
      const updatedCart = store.getState().allCart.cart; // Get updated state
      let updatedItem = updatedCart.find((item) => item.id === cartItemId);
      dispatch(updateCart({ item: updatedItem, remove: false }));
    }, 0);
  };
  const handleDecrement = (cartItemId) => {
    dispatch(decreaseItemQuantity(cartItemId));

    // Using a short delay to allow Redux state to update before logging the new value
    setTimeout(() => {
      const updatedCart = store.getState().allCart.cart; // Get updated state
      let updatedItem = updatedCart.find((item) => item.id === cartItemId);
      dispatch(updateCart({ item: updatedItem, remove: false }));
    }, 0);
  };

  return (
    <>
      <ToastContainer />
      <section class="bg-white py-8 antialiased  md:p-16">
        <div class="mx-auto max-w-screen-[1400px] px-4 2xl:px-0">
          <h2 class="text-xl font-semibold text-gray-900 e sm:text-2xl">
            Shopping Cart
          </h2>

          <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div class="mx-auto w-full flex-none lg:max-w-4xl">
              <div class="space-y-6">
                {cart && cart.length === 0 && (
                  <div className="flex flex-col items-center gap-4">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="262"
                        height="262"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z" />
                      </svg>
                    </div>
                    <p className="text-[22px]">Your cart is empty</p>
                    <Link href="/">
                      <div class="flex items-center justify-center rounded-lg bg-slate-200 px-5 py-2.5 text-sm font-medium text-black hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">
                        Let's go shopping
                      </div>
                    </Link>
                  </div>
                )}
                {cart &&
                  cart.map((cartItem, index) => (
                    <div
                      key={index}
                      class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm d md:p-6"
                    >
                      <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <a href="#" class="shrink-0 md:order-1">
                          <img
                            class="h-20 w-20 "
                            src={cartItem.image}
                            alt="imac image"
                          />
                          <img
                            class="hidden h-20 w-20 "
                            src={cartItem.image}
                            alt="imac image"
                          />
                        </a>

                        <label for="counter-input" class="sr-only">
                          Choose quantity:
                        </label>
                        <div class="flex items-center justify-between md:order-3 md:justify-end">
                          <div class="flex items-center">
                            <button
                              type="button"
                              id="decrement-button"
                              data-input-counter-decrement="counter-input"
                              onClick={() => {
                                handleDecrement(cartItem.id);
                              }}
                              class={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 ${cartItem.quantity === 1 ? "cursor-not-allowed opacity-50": "cursor-pointer"}`}
                            >
                              <svg
                                class="h-2.5 w-2.5 text-gray-900 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <input
                              type="text"
                              id="counter-input"
                              data-input-counter
                              class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                              placeholder=""
                              value={cartItem.quantity}
                              required
                            />
                            <button
                              type="button"
                              id="increment-button"
                              onClick={() => {
                                if (cartItem.quantity >= cartItem.inStock) {
                                  // alert("Maximum quanity reached");
                                  toast.error("Maximum quantity reached", {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                                  });
                                } else {
                                  // dispatch(increaseItemQuantity(cartItem.id));
                                  handleIncrement(cartItem.id);

                                  // dispatch(updateCart(cartItem, user.user._id));
                                }
                              }}
                              data-input-counter-increment="counter-input"
                              class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 "
                            >
                              <svg
                                class="h-2.5 w-2.5 text-gray-900 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                          <div class="text-end md:order-4 md:w-32">
                            <p class="text-base font-bold text-gray-900 ">
                             {handleCurrency(cartItem.price)}
                            </p>
                          </div>
                        </div>

                        <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a
                            href=""
                            class="text-base font-medium text-gray-900 hover:underline "
                          >
                            {cartItem.title}
                          </a>
                          <p>{cartItem.inStock} - In stock</p>

                          <div class="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => {
                                dispatch(removeItem(cartItem.id));
                                dispatch(
                                  updateCart({ item: cartItem, remove: true })
                                );
                              }}
                              class="inline-flex items-center text-sm font-medium text-red-600 hover:underline "
                            >
                              <svg
                                class="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18 17.94 6M18 18 6.06 6"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <p class="text-xl font-semibold text-gray-900 ">
                  Order summary
                </p>

                <div class="space-y-4">
                  <div class="space-y-2">
                    <dl class="flex items-center justify-between gap-4">
                      <dt class="text-base font-normal text-gray-500">
                        Total Items
                      </dt>
                      <dd class="text-base font-medium text-gray-900 ">
                        {totalQuantity}
                      </dd>
                    </dl>
                    <dl class="flex items-center justify-between gap-4">
                      <dt class="text-base font-normal text-gray-500">
                        Original price
                      </dt>
                      <dd class="text-base font-medium text-gray-900 ">
                        {handleCurrency(totalPrice)}
                      </dd>
                    </dl>

                    <dl class="flex items-center justify-between gap-4">
                      <dt class="text-base font-normal text-gray-500">
                        Savings
                      </dt>
                      <dd class="text-base font-medium text-green-600">
                        {handleCurrency(savings)}
                      </dd>
                    </dl>
                  </div>

                  <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                    <dt class="text-base font-bold text-gray-900 ">Total</dt>
                    <dd class="text-base font-bold text-gray-900 ">
                      {handleCurrency(discountedPrice)}
                    </dd>
                  </dl>
                </div>

                <div
                  onClick={() => {
                    if (user) {
                      toast.success("Order Placed", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                    } else {
                      toast.error("Please login to place order", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                    }
                  }}
                  class={`flex w-full items-center justify-center rounded-lg bg-slate-200 px-5 py-2.5 text-sm font-medium text-black hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 }`}
                >
                  Proceed to Checkout
                </div>

                <div class="flex items-center justify-center gap-2">
                  <span class="text-sm font-normal text-gray-500"> or </span>
                  <Link
                    href="/products"
                    title=""
                    class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline "
                  >
                    Continue Shopping
                    <svg
                      class="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <form class="space-y-4">
                  <div>
                    <label
                      for="voucher"
                      class="mb-2 block text-sm font-medium text-gray-900 "
                    >
                      {" "}
                      Do you have a COUPON?{" "}
                    </label>
                    <div className="flex flex-row items-center">
                      <input
                        type="text"
                        id="voucher"
                        onChange={(e) => {
                          setCoupon(e.target.value);
                        }}
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Try ISHNOORPER10 or ISHNOOR10"
                        required
                        value={coupon}
                      />
                      <div
                        className="-ml-6 cursor-pointer"
                        onClick={() => {
                          setCoupon("");
                          setRight(false);
                          setWrong(false);
                          removeCoupon();
                        }}
                      >
                        X
                      </div>
                    </div>
                    {right && (
                      <p className="text-green-500">Valid coupon code</p>
                    )}
                    {wrong && (
                      <p className="text-red-600">Invalid coupon code</p>
                    )}
                  </div>
                  <div
                    onClick={() => {
                      if (coupon) {
                        handleCoupon();
                      }
                    }}
                    class={`flex cursor-pointer  w-full items-center justify-center rounded-lg bg-slate-200 px-5 py-2.5 text-sm font-medium text-black hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 ${coupon ? "cursor-pointer":"cursor-not-allowed opacity-50"}`}
                  >
                    Apply Code
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartItem;
