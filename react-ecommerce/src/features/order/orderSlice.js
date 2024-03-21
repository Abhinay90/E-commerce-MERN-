import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrder, fetchAllOrders, updateOrder } from "./orderAPI";

const initialState = {
  order: [],
  status: "idle",
  currentOrder: null,
  totalOrder: null,
};
export const addOrderAsync = createAsyncThunk(
  "order/addOrder",
  async (order) => {
    const response = await addOrder(order);
    return response.data;
  }
);
export const getAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({sort,pagination}) => {
    
  console.log(sort,pagination)

    const response = await fetchAllOrders(sort,pagination);
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (updateData) => {
    console.log(updateData);
    const response = await updateOrder(updateData);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.order.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(getAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.order = action.payload.orders;
        state.totalOrder = action.payload.totalOrder;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index=state.order.findIndex((order)=>order.id===action.payload.id);
        state.order[index] = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export const selectOrder = (state) => state.orders.order;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectTotalOrder = (state) => state.orders.totalOrder;
export default orderSlice.reducer;
