// https://eth-goerli.g.alchemy.com/v2/N_7qPFwu8Jc_0kC44B0B1e8diZJq9Wgg
// require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-waffle');
module.exports = {
  solidity: "0.8.18",
  networks:{
    goerli:{
      url:'https://eth-goerli.g.alchemy.com/v2/N_7qPFwu8Jc_0kC44B0B1e8diZJq9Wgg',
      accounts:['c78a334c62edbec0a6c3b42070d9b99a1188485b605515f6ca87c2bcc586c731']
    }
  }
};

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.18",
// };
