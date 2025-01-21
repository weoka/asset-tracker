import React, { useEffect } from "react";
import { ethers } from "ethers";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setWallet } from "../../store/slices/wallet-slice";
import { Link } from "react-router-dom";

declare global {
  interface Window {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    ethereum?: any;
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

        // Fetch the wallet balance
        const balanceBigInt = await provider.getBalance(accounts[0]);
        const balanceFormatted = ethers.formatEther(balanceBigInt);

        dispatch(
          setWallet({
            address: accounts[0],
            chainId: Number(network.chainId),
            balance: balanceFormatted,
          })
        );
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("MetaMask not detected. Please install it.");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      const handleChainChanged = (chainId: string) => {
        dispatch(
          setWallet({
            address: address || "",
            chainId: Number(chainId),
            balance: 0,
          })
        );
      };

      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, [dispatch, address]);

  return (
    <div>
      {address ? (
        <Link to="/my-assets">
          <Button
            label={`${address.substring(0, 6)}...${address.slice(-4)}`}
          ></Button>
        </Link>
      ) : (
        <Button label="Connect wallet" onClick={connectWallet} />
      )}
    </div>
  );
};

export default ConnectWallet;
