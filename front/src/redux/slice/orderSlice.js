/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-20 10:53:09
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-09-24 20:54:13
 * @FilePath: /myapp/fronted/src/redux/slice/blanceSlice.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
const orderSlice = createSlice({
  name: "order",
  initialState: {
    cancelOrders: [],
    fillOrders: [],
    allOrders: [],
  },
  reducers: {
    setCancelOrders(state, action) {
      state.cancelOrders = action.payload;
    },
    setFillOrders(state, action) {
      state.fillOrders = action.payload;
    },
    setAllOrders(state, action) {
      state.allOrders = action.payload;
    },
  },
});
export const { setCancelOrders, setFillOrders, setAllOrders } =
  orderSlice.actions;
export default orderSlice.reducer;

export const loadCancelOrderData = createAsyncThunk(
  "order/fetchCancelOrderData",
  async (data, { dispatch }) => {
    const { exchange, provider, account } = data;
    const orderData = await exchange.queryFilter("Cancel", 0, "latest");
    const cancelOrder = orderData.map((item) => item.args.toObject(item.args));
    if (cancelOrder.length) {
      dispatch(setCancelOrders(cancelOrder));
    }
  }
);

export const loadFillOrderData = createAsyncThunk(
  "order/fetchFillOrderData",
  async (data, { dispatch }) => {
    const { exchange, provider, account } = data;
    const orderData = await exchange.queryFilter("Trade", 0, "latest");
    const fillOrder = orderData.map((item) => item.args.toObject(item.args));
    if (fillOrder.length) {
      dispatch(setFillOrders(fillOrder));
    }
  }
);

export const loadAllOrdersData = createAsyncThunk(
  "order/fetchAllOrderData",
  async (data, { dispatch }) => {
    const { exchange, provider, account } = data;
    const orderData = await exchange.queryFilter("Order", 0, "latest");
    const allOrder = orderData.map((item) => item.args.toObject(item.args));
    if (allOrder.length) {
      dispatch(setAllOrders(allOrder));
    }
  }
);
