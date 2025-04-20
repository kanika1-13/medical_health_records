require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: `https://sepolia.infura.io/v3/c48178dd67cc4324a151083ba256b5b8`,  // Replace with your Infura project ID
      accounts: [`0x${0x9ed504201ea4328f820e74af648f7ae2971fa795}`],  // Replace with your MetaMask private key
    },
  },
};
