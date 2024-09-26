/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-18 14:50:08
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-09-25 20:04:11
 * @FilePath: /myapp/test/1_test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-18 14:50:08
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-09-25 18:38:48
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
    console.log(token.target,exchange.target,owner.address,owner1.address)
    
  //   const approveTx = await token.approve(exchange.target,parseUnits(100),{
  //      from:owner.address
  //   });
  //   await approveTx.wait()
  //   const a111 = await token.allowance(owner.address,exchange.target)
  //   console.log(formatUnits(a111))
  //   // console.log(token.target,exchange.target,owner.address)
  //   const depositTx = await exchange.depositToken(token.target,parseUnits(100),{
  //     from:owner.address
  //  })
  //   await depositTx.wait()
  //   // const a = await token.balanceOf(owner.address)
  //   const a2 = await exchange.tokens(token.target,owner.address)
  //   // console.log(formatUnits(a),'a')
  //   console.log(formatUnits(a2),'a2')
    await exchange.connect(owner).markOrder(token.target,parseUnits(1000),ETHER,parseUnits(1))
    await exchange.connect(owner).markOrder(token.target,parseUnits(2000),ETHER,parseUnits(2))
    await exchange.connect(owner1).markOrder(token.target,parseUnits(100),ETHER,parseUnits(1))
    await exchange.connect(owner1).markOrder(token.target,parseUnits(200),ETHER,parseUnits(2))
    const orderCount = await exchange.orderCount()
    const orderInfo  = await exchange.orders(3)
    console.log(orderCount,orderInfo,'orderCount')
  });
});