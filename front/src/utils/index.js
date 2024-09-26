/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-24 19:19:00
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-09-24 19:19:11
 * @FilePath: /myapp/front/src/utils/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import {ethers} from 'ethers'

export function formatUnits(val) {
  if(!val) return ''
  const balanceInEther = ethers.formatUnits(val.toString(), "ether");
  return balanceInEther
}
export function parseUnits(val) {
  if(!val) return '0'
  const balanceInEther = ethers.parseUnits(val.toString(), "ether");
  return balanceInEther
}