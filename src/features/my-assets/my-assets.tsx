import React from "react";
import { useWallet } from "../../hooks/use-wallet";
import { useBalances } from "../../hooks/use-balances";
import getChainName from "../../utils/get-chain-name";
import { TokenBalance } from "../../types/token-balance";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const MyAssets: React.FC = () => {
  const { address, chainId, balance } = useWallet();

  const convertedChainId = getChainName(chainId ?? 0);
  const { balances, loading } = useBalances(
    address ?? "",
    convertedChainId.key ?? ""
  );

  if (!address) return <h2>No wallet connected</h2>;

  if (loading) return;

  let dataBalances: TokenBalance[] = [
    {
      symbol: convertedChainId.symbol,
      balance: balance,
    },
  ];

  if (balances) dataBalances = dataBalances.concat(balances);

  return (
    <>
      <h2>My Assets</h2>
      <DataTable value={dataBalances}>
        <Column field="symbol" header="Symbol"></Column>
        <Column field="balance" header="Balance"></Column>
      </DataTable>
    </>
  );
};

export default MyAssets;
