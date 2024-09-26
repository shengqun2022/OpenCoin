/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:16:28
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-09-25 20:21:08
 * @FilePath: /myapp/front/src/views/Content.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import Mine from './Mine'
import Trade from './Trade'
import { ethers } from "ethers";
import TokenJson from '../deployments/localhost/Token.json'
import ExchangeJson from '../deployments/localhost/Exchange.json'
import {useDispatch} from 'react-redux'
import { loadBalanceData } from '../redux/slice/balanceSlice'
import { loadCancelOrderData ,loadFillOrderData,loadAllOrdersData} from '../redux/slice/orderSlice'


const Content = () =>  {
  const dispatch = useDispatch()
  useEffect(()=>{
    async  function start() {
        // 获取链接之后的合约信息
        const web  = await initWeb()
        window.web = web
        console.log(web.exchange,'exchange')
        window.ethereum.on('accountsChanged', function (accounts) {
          window.location.reload()
       });
        //获取资产信息
        dispatch(loadBalanceData(web))
        // 获取订单信息
        dispatch(loadCancelOrderData(web))
        dispatch(loadFillOrderData(web))
        dispatch(loadAllOrdersData(web))
    }
    start()
  },[dispatch])
  
  async function initWeb () {
    let signer = null;
    let provider;
    if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults")
        provider = ethers.getDefaultProvider()
    } else {
        // 链接钱包
        provider = new ethers.BrowserProvider(window.ethereum)
        signer = await provider.getSigner();
        // 获取账户
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // 获取合约
        const token = await new ethers.Contract(TokenJson.address, TokenJson.abi, signer)
        const exchange =  await new ethers.Contract(ExchangeJson.address, ExchangeJson.abi, signer)
        // const approveTx = await token.approve(exchange.target,0)
        return {
          provider,
          signer,
          account:accounts[0],
          token,
          exchange,
        }

    }
  }
  const onChange = (key) => {
  };
  const items = [
    {
      key: '1',
      label: '我的',
     
      children: <Mine/>,
    },
    {
      key: '2',
      label: '交易池',
      children: <Trade/>
    },
  ];
  return  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
}

export default Content;