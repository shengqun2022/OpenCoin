/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-06 14:21:27
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-09-20 17:01:50
 * @FilePath: /react-dapp/deploy.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const hre = require('hardhat');
require('hardhat-deploy');

// async function deploy({ deployments,getNamedAccounts }) {
//   const { deploy } = deployments;
//   const { deployer } = await getNamedAccounts();
//   const TOKEN = await hre.ethers.getContractFactory('Token');
//   const token = await TOKEN.deploy('MyToken','ZLD',18,{
//     from: deployer,
//     log: true,
//   });
//   const EXCHANGE = await hre.ethers.getContractFactory('Exchange');
//   const exchange = await EXCHANGE.deploy('0xa0Ee7A142d267C1f36714E4a8F75612F20a79720',10,{
//     from: deployer,
//     log: true,
//   });
// }
// async function main() {
//     await deploy(hre);
// }
// main()

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // 部署 Token 合约
  const token = await deploy('Token', {
    from: deployer,
    args: ['MyToken', 'ZLD', 18], // 构造函数参数
    log: true,
  });
  console.log(deployer,'deployer')

  // 部署 Exchange 合约
  const exchange = await deploy('Exchange', {
    from: deployer,
    args: ['0xa0Ee7A142d267C1f36714E4a8F75612F20a79720', 10], // 构造函数参数
    log: true,
  });
};