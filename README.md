# Tea Shop DApp
This decentralized application (DApp) is designed to allow users to manage and utilize Degen tokens for purchasing tea and other items. 
This Solidity contract, DegenToken, demonstrates the implementation of a simple ERC20 token with additional functionalities such as minting, burning, and redeeming tokens. It also includes purchase history tracking for users, serving as a practical example of smart contract development using Solidity.

# Description
Solidity Contract:
* Token Functionality: The DegenToken contract is an ERC20 token implementation with minting, burning, and redeeming features, allowing users to manage their tokens and track purchase histories.
* Owner Control: Only the contract owner can mint new tokens, ensuring controlled distribution and management.
* Purchase Tracking: Users' redemptions are recorded, providing a transparent history of all token-based transactions within the contract.

React Application:
* Blockchain Interaction: This React application connects to the Ethereum blockchain, allowing users to manage their Degen tokens through minting, burning, transferring, and redeeming functionalities.
* User-Friendly Interface: The application features an intuitive UI, enabling users to easily interact with their tokens and view their transaction histories.
* Ethers.js Integration: Utilizes ethers.js for seamless integration with the DegenToken smart contract, providing a robust and efficient interface for blockchain interactions.

# Getting Started
# Executing program
* Step-by-Step Commands to run the program
```shell
npm install --save-dev hardhat
npx hardhat
npm install @openzeppelin/contracts
npx hardhat run --network fuji scripts/deploy.js
npm run dev
```
# Contract Details
The DegenToken contract is implemented in Solidity version 0.8.20. I use @openzeppelin here for using functionalities of ERC20. The contract has the following features:

* Token name: DegenToken
* Token symbol: DGN
Token Functionality: 
totalSupply(): Returns the total supply of DegenTokens.
balanceOf(address account): Returns the token balance of the specified account.
transfer(address to, uint256 value): Transfers tokens from the sender's account to the specified recipient.
burn(uint256 value): Burns tokens from the sender's account, reducing the total supply.
mint(address to, uint256 value): Mints new tokens and assigns them to the specified recipient. Only the contract owner can perform this operation.
getPurchases(address account): Retrieves the list of purchases made by the specified account.
redeem(string memory itemName, uint256 value): Allows the sender to redeem tokens for an item in the in-game store.
allowance(address owner, address spender): Returns the amount of tokens that the spender is allowed to spend on behalf of the owner.
approve(address spender, uint256 value): Approves the spender to transfer a specific amount of tokens from the sender's account.
transferFrom(address from, address to, uint256 value): Transfers tokens from one address to another on behalf of a specified address.

# Application Preview 📸
![image](https://github.com/MadhuriMalgaya/Project-Degen-Token-ERC-20-Unlocking-the-Future-of-Gaming/assets/129099016/ef5dbb59-e830-4b71-a8ac-d8442c6d5c8c)

![image](https://github.com/MadhuriMalgaya/Project-Degen-Token-ERC-20-Unlocking-the-Future-of-Gaming/assets/129099016/24b79438-444f-47b7-8ff2-1ccc9370807d)

Here, I use Metamask MetaMask is a free web and mobile crypto wallet that allows users to store and swap cryptocurrencies, interact with the Ethereum blockchain ecosystem, and host a growing array of decentralized applications (dApps).

# Authors
Madhuri Malgaya madhumalgaya@gmail.com

# License
This project is licensed under the MIT License - see the LICENSE.md file for details


