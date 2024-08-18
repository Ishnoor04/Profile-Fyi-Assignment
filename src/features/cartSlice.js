
import { products } from "@/products";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";


export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('No token found');

  const response = await fetch('/api/cart', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });

  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
});

export const updateCart = createAsyncThunk('updateCart', async({item, remove})=>{
  const token = localStorage.getItem('token');
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
    body: JSON.stringify({item,remove}),
  });
  const data = await response.json();
  if (response.ok) {
    return data; // Handle the signup response, including token and user data
  } else {
    throw new Error(data.message);
  }
})

const initialState = {
  cart: [],
  items: products,
  totalQuantity: 0,
  totalPrice: 0,
  savings: 0,
  discountedPrice: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let find = state.cart.findIndex((item) => item.id === action.payload.id);
      if (find >= 0 && state.cart[find].quantity < state.cart[find].inStock) {
        state.cart[find].quantity += 1;
      } else if (
        find >= 0 &&
        state.cart[find].quantity === state.cart[find].inStock
      ) {
      } else {
        state.cart.push(action.payload);
      }
    },
    getCartTotal: (state) => {
      if (Array.isArray(state.cart)) {
        let { totalQuantity, totalPrice } = state.cart.reduce(
          (cartTotal, cartItem) => {
            
            const { price, quantity } = cartItem;
            const itemTotal = price * quantity;
            cartTotal.totalPrice += itemTotal;
            cartTotal.totalQuantity += quantity;
            return cartTotal;
          },
          {
            totalPrice: 0,
            totalQuantity: 0,
          }
        );
        state.totalPrice = parseFloat(totalPrice.toFixed(3));
        state.discountedPrice = parseFloat(totalPrice.toFixed(3) - state.savings);
        state.totalQuantity = totalQuantity;
      } else {
        // If cart is not an array, initialize it to an empty array
        state.cart = [];
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload && item.quantity < item.inStock) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },
    decreaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    },
    calculateSavings: (state, action) => {
      if(action.payload === 0) {
        state.savings = (state.totalPrice / 10).toFixed(2);
      }else if(action.payload === 1) {
        state.savings = 10
      }
      else if(action.payload === 2) {
        state.savings = 0
      }

    },
    clearSavings: (state, action) => {
      state.savings = 0;
    },
  },
  extraReducers:(builder)=>{
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
          state.cart = action.payload;
        
      })
  }
});
export const {
  addToCart,
  getCartTotal,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  calculateSavings,
  clearSavings,
} = cartSlice.actions;
export default cartSlice.reducer;
