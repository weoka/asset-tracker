import React from "react";
import { ethers } from "ethers";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setWallet } from "../../store/slices/wallet-slice";

declare global {
  interface Window {
    ethereum?: "";
  }
}

const ConnectWallet: React.FC = () => {
  const dispatch = useDispatch();
  const { address } = useSelector((state: RootState) => state.wallet);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const network = await provider.getNetwork();

        dispatch(
          setWallet({
            address: accounts[0],
            chainId: network.chainId.toString(),
          })
        );
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("MetaMask not detected. Please install it.");
    }
  };

  return (
    <div>
      {address ? (
        <Button
          label={`${address.substring(0, 6)}...${address.slice(-4)}`}
        ></Button>
      ) : (
        <Button label="Connect wallet" onClick={connectWallet} />
      )}
    </div>
  );
};

export default ConnectWallet;
