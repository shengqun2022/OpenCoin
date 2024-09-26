/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-20 10:53:09
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-09-24 20:00:14
 * @FilePath: /myapp/front/src/redux/slice/blanceSlice.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    TokenWallet: "0",
    TokenExchange: "0",
    EtherWallet: "0",
    EtherExchange: "0",
  },
  reducers: {
    setTokenWallet(state, action) {
      state.TokenWallet = action.payload;
    },
    setTokenExchange(state, action) {
      state.TokenExchange = action.payload;
    },
    setEtherWallet(state, action) {
      state.EtherWallet = action.payload;
    },
    setEtherExchange(state, action) {
      state.EtherExchange = action.payload;
    },
  },
});
export const {setTokenWallet,setTokenExchange,setEtherWallet,setEtherExchange} = balanceSlice.actions
export default balanceSlice.reducer


export const loadBalanceData = createAsyncThunk('balance/fetchBalanceData', async (data,{dispatch})=> {
   const  feeAccount = '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720'
   const ETHER = '0x0000000000000000000000000000000000000000'

   const {provider,signer,account,token,exchange} = data
  //  console.log(await exchange.tokens(ETHER),999)
     //获取钱包的token
     const tokenWallet = await token.balanceOf(account)
     console.log(account,tokenWallet,'tokenWallet')

     dispatch(setTokenWallet(tokenWallet.toString()))

    //  获取交易所的token
     const tokenExchange = await exchange.balanceOf(token.target,account)
     dispatch(setTokenExchange(tokenExchange.toString()))
   
    //  获取钱包的ether
     const address = signer.getAddress()
     const etherWallet = await provider.getBalance(address)
     dispatch(setEtherWallet(etherWallet.toString()))
     // 获取交易所的ether
     const etherExchange  = await exchange.balanceOf(ETHER,account)
     dispatch(setEtherExchange(etherExchange.toString()))

})


