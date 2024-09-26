/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-18 14:50:08
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-09-20 09:46:49
 * @FilePath: /myapp/hardhat.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
require("@nomicfoundation/hardhat-toolbox");
require('hardhat-deploy');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  },
  namedAccounts: {
    deployer: {
      default: 0, // 默认使用第一个账户作为部署者账户
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
    deployments: "./fronted/src/deployments" 
  },
};
