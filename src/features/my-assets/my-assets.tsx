import React from "react";
import { useWallet } from "../../hooks/use-wallet";

const MyAssets: React.FC = () => {
  const { address } = useWallet();
  return <h2>{address}</h2>;
};

export default MyAssets;
