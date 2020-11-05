module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      gas: 30000000,
      from: '0xF353de384d13e5C1c07FA63ABB0e4051871b0EbC',
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/build/',
  compilers: {
    solc: {
      version: "0.6.6",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
}