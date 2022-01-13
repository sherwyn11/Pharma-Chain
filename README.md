# Pharma-Chain :pill:

A supply chain for the safe distribution of medicines using Blockchain and AI.

## ⏯️ Explanation + Demo Video

<a href="https://www.youtube.com/watch?v=uQZH6UH1lyY"><img src="https://img.youtube.com/vi/uQZH6UH1lyY/0.jpg" height="500px" width="700px"/></a>

## ✨ Motivation
<p align="justify">
At present, counterfeit drugs pose a serious threat as it is difficult for people to know the true value of purchased medicines due to a significant lack of transparency in the current system. Also, tampering within the supply chain is difficult to investigate when suspicion of illegal or unethical practices. 
</p>

## ⚡ Our Solution
<p align="justify">
Our solution is an amalgamation of two powerful technologies - Blockchain and AI. Blockchain is an open, distributed ledger that can efficiently record transactions between two parties in a verifiable and permanent way. Since blockchains are decentralized, distributed, transparent, and immutable, they can easily solve counterfeit medicines. AI in pharmacology helps improve customer service, loyalty and enables easy access to blockchain-based medical intelligence. 
</p>
<p align="justify">
This project proposes a system that uses blockchain and AI for the safe supply of medical drugs throughout the supply chain. Each product within the chain can be transferred between authenticated entities of the chain using an event request-response mechanism. All transactions between entities are recorded into the blockchain using smart contracts with the help of which a product can be traced to its source. We built a Rasa chatbot integrated into a Flutter app enabling ordering, tracing back medicines, and enhancing blockchain-based credit evaluation. A DApp was then developed using React Framework. The smart contracts were deployed on a local blockchain provided by Ganache. Using Web3.js and Truffle framework, DApp is connected to the blockchain. The experimental results show that our solution is feasible and comparatively more secure than existing systems.
</p>

## 💻 System Overview
<img src="assets/Blockchain Supply Chain.jpeg"/>

## 👀 Getting Started

### To deploy the Smart Contract

1. Install Ganache and create a workspace.
2. Install Truffle npm package globally by running ```npm install -g truffle```.
3. In the `truffle-config.js` file update the `from:` address to an address from your Ganache workspace.
4. Run ```truffle migrate --reset``` from the command line to deploy the smart contract to the blockchain.
5. Download Metamask Chrome extension for the browser to help interaction between the application and the blockchain.

### To run React development server

```bash
cd blockchain
npm install
npm start
```

### To run Node.js server
```bash
cd server
npm install
npm start
```


## :octocat: Project GitHub Links:
- <a href="https://github.com/sherwyn11/Pharma-Chain">Smart Contracts for Blockchain + Frontend + Backend</a>
- <a href="https://github.com/Darlene-Naz/pharma-assistant">RASA Chatbot</a>
- <a href="https://github.com/Darlene-Naz/MediBot">Flutter Application</a>

## 🔥 Our Published Paper Link:
<a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3852034" target="_blank">https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3852034</a>

## :busts_in_silhouette: Contributors

<table>
  <tr>
    <td align="center"><a href="https://github.com/sherwyn11"><img src="https://avatars.githubusercontent.com/u/43489167?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Sherwyn D'souza</b></sub></a><br /><a href="" title="">:new_moon_with_face:</a></td>
    <td align="center"><a href="https://github.com/Darlene-Naz"><img src="https://avatars.githubusercontent.com/u/46684660?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Darlene Nazareth</b></sub></a><br /><a href="" title="">:snowflake:</a></td>
    <td align="center"><a href="https://github.com/CassiaVaz"><img src="https://avatars.githubusercontent.com/u/54650944?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Cassia Vaz</b></sub></a><br /><a href="" title="">:sparkles:</a></td></td>
  </tr>
 </table>

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[MIT License Link](https://github.com/sherwyn11/Pharma-Chain/blob/master/LICENSE)
