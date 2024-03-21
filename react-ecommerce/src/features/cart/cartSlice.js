import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, deleteToCart, resetCart, fetchItemsByUser, updateCart } from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
  cartLoaded: false
};
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);

export const fetchItemsByUserAsync = createAsyncThunk(
  "cart/fetchItemsByUser",
  async () => {
    const response = await fetchItemsByUser();
    console.log(response);
    return response.items;
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);

export const deleteToCartAsync = createAsyncThunk(
  "cart/deleteToCart",
  async (update) => {
    const response = await deleteToCart(update);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async () => {
    const response = await resetCart();
    return response.data;
  }
);


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
        state.cartLoaded = true;
      })
      .addCase(fetchItemsByUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.cartLoaded = true;
        
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index=state.items.findIndex((item)=>item.id===action.payload.id)
        state.items[index] = action.payload;
      })
      .addCase(deleteToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
        const index=state.items.findIndex((item)=>item.id===action.payload.id)
        state.items.splice(index,1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items=[];
        console.log(action.payload);
      });
  },
});

export const { increment, incrementByAmount } = cartSlice.actions;
export const selectItemsByUser=(state)=>state.cart.items;
export  const selectCartLoaded = (state) => state.cart.cartLoaded;
export default cartSlice.reducer;
