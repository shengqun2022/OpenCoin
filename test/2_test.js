/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-18 14:50:08
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-09-24 19:58:58
 * @FilePath: /myapp/test/1_test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { ethers } = require("hardhat");
function formatUnits(val) {
  if(!val) return ''
  const balanceInEther = ethers.formatUnits(val.toString(), "ether");
  return balanceInEther
}
function parseUnits(val) {
  if(!val) return '0'
  const balanceInEther = ethers.parseUnits(val.toString(), "ether");
  return balanceInEther
}
const ETHER = '0x0000000000000000000000000000000000000000'

describe("Token", function() {
  it("Should return the new token s once it's changed", async function() {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy('MyToken', 'ZLD', '18');
    const Exchange = await ethers.getContractFactory("Exchange");
    const exchange = await Exchange.deploy('0xa0Ee7A142d267C1f36714E4a8F75612F20a79720', 10);
    const [owner,owner1] = await ethers.getSigners();
    token.transfer(owner1,parseUnits(1000))
    console.log(await token.balanceOf(owner),'owner')
    console.log(await token.balanceOf(owner1),'owner1')

  });
});