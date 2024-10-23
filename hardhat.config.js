require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0", // Your Solidity version
  networks: {
    sepolia: {
      url: process.env.INFURA_URL, // Infura URL with Sepolia
      accounts: [process.env.PRIVATE_KEY] // Private key for deployment
    }
  }
};
