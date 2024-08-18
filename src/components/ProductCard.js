import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, fetchData, updateCart } from "@/features/cartSlice";
import Ratings from "@/utils/Ratings";
import { products } from "@/products";
import { store } from "@/app/store";
import { handleCurrency } from "@/utils/HandleCurrency";
import { fetchUser } from "@/features/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/styles";

const ProductCard = ({ res }) => {
  const { items, cart } = useSelector((state) => state.allCart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  const cardRefs = useRef([]);
  const handleAddToCart = async (product, index) => {
    const updatedCart = store.getState().allCart.cart; // Get updated state
    let updatedItem = updatedCart.find((item) => item.id === product.id);
    if (updatedItem && updatedItem.quantity >= product.inStock) {
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
      return;
    } else {
      const cartIcon = document.querySelector(".cart-icon");
      const image = cardRefs.current[index]?.querySelector("img");

      // Get the position of the product image
      const {
        x: imageX,
        y: imageY,
        width,
        height,
      } = image.getBoundingClientRect();

      // Create a clone of the image
      const clone = image.cloneNode(true);
      document.body.appendChild(clone);

      // Set the position of the clone to be the same as the original image
      gsap.set(clone, {
        position: "fixed",
        top: imageY,
        left: imageX,
        width: "100px",
        height: "100px",
        zIndex: 1000,
      });

      // Calculate the final position for the animation to the cart icon
      const { top: cartTop, left: cartLeft } = cartIcon.getBoundingClientRect();

      gsap.to(clone, {
        duration: 0.7,
        top: cartTop,
        left: cartLeft - 20,
        scale: 0.1,
        opacity: 0.5,
        ease: "power2.out",
        onComplete: () => {
          // Remove the clone after the animation completes
          clone.remove();
        },
      });

      // Add product to cart
      dispatch(addToCart(product));
      setTimeout(() => {
        const updatedCart = store.getState().allCart.cart; // Get updated state
        let updatedItem = updatedCart.find((item) => item.id === product.id);
        dispatch(updateCart({ item: updatedItem, remove: false }));
      }, 0);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="pt-24">
        <div className="grid grid-cols-1 ss:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items &&
            items.map((product, index) => (
              <div
                key={product.id}
                className="lg:max-w-[400px] md:max-w-[340px] ss:max-w-[290] max-w-[300px] mx-auto border p-4"
                ref={(el) => (cardRefs.current[index] = el)}
              >
                <div className="w-full max-w-md aspect-square">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full rounded-xl"
                  />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <h6 className={`${styles.heading2}`}>{product.title}</h6>
                    <h6 className="font-semibold text-xl leading-8 text-indigo-600">
                      {handleCurrency(product.price)}
                    </h6>
                    <div className="flex flex-row gap-2 items-center">
                      <Ratings rating={product.rating.rate} />
                      <p className="text-gray-500">({product.rating.count})</p>
                    </div>
                    <p className="text-gray-500">
                      {product.inStock} - In Stock
                    </p>
                  </div>
                  <button
                    onClick={() => {

                      if (product.quantity >= product.inStock) {
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
                        handleAddToCart(product, index);
                      }
                    }}
                    className="p-2 min-[400px]:p-4 rounded-full bg-white border border-gray-300 flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-blue-400 hover:bg-blue-50"
                  >
                    <svg
                      className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                    >
                      <path
                        d="M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25"
                        stroke=""
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
