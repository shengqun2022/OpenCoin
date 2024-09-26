/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-09-25 20:12:02
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { Card, Col, Row, Statistic,Button, Modal,InputNumber,message,Divider  } from 'antd';
import {ethers} from 'ethers'
import {formatUnits,parseUnits} from '../utils/index'
import {FEE_ACCOUNT,ETHER} from '../plugins/constant'

const App = () => {
  const state = useSelector(state=> state.balance)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [optionType, setOptionType] = useState('');
  const [num, setNum] = useState('');
  const handleOk = async ()=> {
    if(!num) {
      message.error('数量不能为空')
      return
    }
    const amout = parseUnits(num)
    console.log(window.web,amout)
    if(optionType === 'Ether') {
      const tx =  await  window.web.exchange.depositEther({ value: amout })
      await tx.wait();
    } else {
      const approveTx = await window.web.token.approve('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',amout)
      await approveTx.wait()
      const depositTx = await window.web.exchange.depositToken(window.web.token.target,amout)
      await depositTx.wait()
    }
    setIsModalOpen(false)
  }
  const handleCancel = ()=> {
    setIsModalOpen(false)
  }
  const open = (type)=> {
    setIsModalOpen(true)
    setOptionType(type)
  }
  const onChange =(val)=> {
    setNum(val)
  }
  const markerOrder = async ()=> {
    await window.web.exchange.markOrder(window.web.token.target,parseUnits(100),ETHER,parseUnits(10))
    alert('创建订单成功')
  }
  return  <div> <Row gutter={16}>
    <Col span={6}>
      <Card  hoverable={true} bordered={false}>
        <Statistic
          title="Ether"
          value={formatUnits(state.EtherWallet)}
          valueStyle={{
            color: '#3f8600',
          }}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card  hoverable={true}  bordered={false}>
        <Statistic
          title="交易所中的Ether"
          value={formatUnits(state.EtherExchange)}
          valueStyle={{
            color: '#cf1322',
          }}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card  hoverable={true}  bordered={false}>
        <Statistic
          title="ZLD"
          value={formatUnits(state.TokenWallet)}
          valueStyle={{
            color: '#136acf',
          }}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card  hoverable={true}  bordered={false}>
        <Statistic
          title="交易所中的ZLD"
          value={formatUnits(state.TokenExchange)}
          valueStyle={{
            color: '#9a5310',
          }}
        />
      </Card>
    </Col>
  </Row>
  <Divider/>
  <Button type="primary" onClick={()=> open('Ether')}>交易所存Ether</Button>
  <Button style={{marginLeft:'20px'}}  type="primary" onClick={()=>open('Zld')}> 交易所存ZLD</Button>
  <Divider/>
  <Button type="primary" onClick={markerOrder}>创建订单</Button>
   <Modal  title="交易所" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <InputNumber style={{width:'100%'}} min={1} onChange={onChange} />
   </Modal>
  </div>
};
export default App;