module.exports = {
    networks: {
      development: {
        host: "http://2719ac0aba99.ngrok.io",
        port: 80,
        network_id: "*" // Match any network id
      },
    },
    contracts_directory: './src/contracts/',
    contracts_build_directory: './src/abis/',
    compilers: {
      solc: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }