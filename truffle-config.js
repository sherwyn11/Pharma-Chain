const path = require("path");

module.exports = {
    contracts_build_directory: path.join(__dirname, "./src/contracts"),
    networks: {
        develop: {
            port: 7545
        }
    }
};