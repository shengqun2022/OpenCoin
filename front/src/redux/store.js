/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-20 10:51:51
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-09-24 16:06:32
 * @FilePath: /myapp/fronted/src/redux/store.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { configureStore } from '@reduxjs/toolkit'
import balanceSlice from './slice/balanceSlice'
import orderSlice from './slice/orderSlice'


const store  = configureStore({
  reducer: {
     balance: balanceSlice,
     order:orderSlice,
  }
})

export default store