import React, { useState } from "react";
import { ethers } from "ethers";
import { Button } from "primereact/button";

declare global {
  interface Window {
    ethereum?: "";
  }
}

const ConnectWallet: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("MetaMask not detected. Please install it.");
    }
  };

  return (
    <div>
      {account ? (
        <Button
          label={`${account.substring(0, 6)}...${account.slice(-4)}`}
        ></Button>
      ) : (
        <Button label="Connect wallet" onClick={connectWallet} />
      )}
    </div>
  );
};

export default ConnectWallet;
