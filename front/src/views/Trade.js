/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-09-24 21:33:22
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { Card, Col, Row,Table,Button} from 'antd';
import {formatUnits,parseUnits} from '../utils/index'
import moment from 'moment';



const App = () => {
  const state = useSelector(state=> state.order)
  const buy =  async (id)=>  {
    await window.web.exchange.fillOrdeer(id)
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key:'id',
      render: (text) => <span>{Number(text)}</span>,
    },
    {
      title: 'ZLD',
      dataIndex: '_amountGet',
      key: '_amountGet',
      render: (text) => <span>{formatUnits(text)}</span>,
    },
    {
      title: 'Ether',
      dataIndex: '_amountGive',
      key: '_amountGive',
      render: (text) => <span>{formatUnits(text)}</span>,
    },
    {
      title: '创建时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text) => <span>{moment(Number(text) * 1000).format('YYYY/MM/DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (text,record) => <Button onClick={()=>buy(record.id)}>买入</Button>,
    }
  ];
 
  console.log(state,'balance')
  return  <Row gutter={16}>
    <Col span={12}>
      <Card  bordered={true}>
        <h3>交易池</h3>
        <Table dataSource={state.allOrders} rowKey={item=>item.id} columns={columns} />;
      </Card>
    </Col>
    <Col span={12}>
      <Card bordered={true}>
        <h3>已完成的订单</h3>
        <Table dataSource={state.fillOrders} rowKey={item=>item.id}  columns={columns} />;
      </Card>
    </Col>
   
  </Row>
};
export default App;