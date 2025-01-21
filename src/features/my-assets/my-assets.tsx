import React from "react";
import { useWallet } from "../../hooks/use-wallet";
import { useBalances } from "../../hooks/use-balances";
import getChainName from "../../utils/get-chain-name";

const MyAssets: React.FC = () => {
  const { address, chainId } = useWallet();
  const convertedChainId = getChainName(chainId ?? 0);
  const { balances } = useBalances(address ?? "", convertedChainId.key ?? "");
  console.log(chainId);
  console.log(balances);
  return <h2>{address}</h2>;
};

export default MyAssets;
