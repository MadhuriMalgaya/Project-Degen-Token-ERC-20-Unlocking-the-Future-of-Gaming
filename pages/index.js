import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import styled from 'styled-components';
import Select from 'react-select';
import MyToken from '../artifacts/contracts/DegenToken.sol/DegenToken.json';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.header`
  background-color: #4caf50;
  color: white;
  padding: 20px;
  font-size: 2em;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #45a049;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: calc(100% - 22px); /* Adjusting for padding and border */
`;

const Label = styled.label`
  margin-top: 10px;
  font-weight: bold;
`;

const options = [
  { value: 'tea', label: 'Tea: 10 DGN' },
  { value: 'coffee', label: 'Coffee: 15 DGN' },
  { value: 'chips', label: 'Chips 5 DGN' },
  { value: 'samosha', label: 'Samosha 10 DGN' },
  { value: 'cookies', label: 'Cookies 30 DGN' }
];

function App() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [myToken, setMyToken] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [recipient, setRecipient] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [mintAmount, setMintAmount] = useState('');
  const [burnAmount, setBurnAmount] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [redeemAmount, setRedeemAmount] = useState('');
  const [purchases, setPurchases] = useState([]);
  const [accountForPurchases, setAccountForPurchases] = useState('');

  const contractAddress = "0x6D65Bd917F545E84467030Ad926f336f05e3eF3B"; // Update this with your contract address
  const myTokenABI = MyToken.abi;

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        setEthWallet(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (ethWallet && account) {
      const provider = new ethers.providers.Web3Provider(ethWallet);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(contractAddress, myTokenABI, signer);
      setMyToken(tokenContract);
    }
  }, [ethWallet, account]);

  useEffect(() => {
    const getBalance = async () => {
      if (myToken) {
        const balance = await myToken.balanceOf(account);
        setBalance(balance.toString());
      }
    };
    getBalance();
  }, [myToken, account]);

  const handleMint = async () => {
    if (myToken && mintAmount) {
      const tx = await myToken.mint(account, mintAmount);
      await tx.wait();
      const balance = await myToken.balanceOf(account);
      setBalance(balance.toString());
    }
  };

  const handleBurn = async () => {
    if (myToken && burnAmount) {
      const tx = await myToken.burn(burnAmount);
      await tx.wait();
      const balance = await myToken.balanceOf(account);
      setBalance(balance.toString());
    }
  };

  const handleTransfer = async () => {
    if (myToken) {
      const tx = await myToken.transfer(recipient, transferAmount);
      await tx.wait();
      const balance = await myToken.balanceOf(account);
      setBalance(balance.toString());
    }
  };

  const handleRedeem = async () => {
    if (myToken && selectedItems.length > 0 && redeemAmount) {
      for (const item of selectedItems) {
        const tx = await myToken.redeem(item.value, redeemAmount);
        await tx.wait();
      }
      const balance = await myToken.balanceOf(account);
      setBalance(balance.toString());
    }
  };

  const handleGetPurchases = async () => {
    if (myToken && accountForPurchases) {
      const purchases = await myToken.getPurchases(accountForPurchases);
      setPurchases(purchases);
    }
  };

  return (
    <Container>
      <Header>Tea Shop DApp</Header>
      <Card>
        <p>Account: {account}</p>
        <p>Balance: {balance}</p>
        <div>
          <Label>Mint Amount:</Label>
          <Input
            type="text"
            placeholder="Mint Amount"
            value={mintAmount}
            onChange={(e) => setMintAmount(e.target.value)}
          />
          <Button onClick={handleMint}>Mint Tokens</Button>
        </div>
        <div>
          <Label>Burn Amount:</Label>
          <Input
            type="text"
            placeholder="Burn Amount"
            value={burnAmount}
            onChange={(e) => setBurnAmount(e.target.value)}
          />
          <Button onClick={handleBurn}>Burn Tokens</Button>
        </div>
        <div>
          <Label>Recipient Address:</Label>
          <Input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <Label>Transfer Amount:</Label>
          <Input
            type="text"
            placeholder="Transfer Amount"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
          />
          <Button onClick={handleTransfer}>Transfer Tokens</Button>
        </div>
        <div>
          <Label>Select Items:</Label>
          <Select
            isMulti
            options={options}
            value={selectedItems}
            onChange={(selected) => setSelectedItems(selected)}
          />
          <Label>Redeem Amount:</Label>
          <Input
            type="text"
            placeholder="Redeem Amount"
            value={redeemAmount}
            onChange={(e) => setRedeemAmount(e.target.value)}
          />
          <Button onClick={handleRedeem}>Redeem Tokens</Button>
        </div>
        <div>
          <Label>Account for Purchases:</Label>
          <Input
            type="text"
            placeholder="Account Address"
            value={accountForPurchases}
            onChange={(e) => setAccountForPurchases(e.target.value)}
          />
          <Button onClick={handleGetPurchases}>Get Purchases</Button>
          {purchases.length > 0 && (
            <div>
              <h3>Purchases:</h3>
              <ul>
                {purchases.map((purchase, index) => (
                  <li key={index}>{purchase}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </Container>
  );
}

export default App;
