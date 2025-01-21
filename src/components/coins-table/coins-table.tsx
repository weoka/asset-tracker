import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useCoins } from "../../hooks/use-coins";
import { ProgressSpinner } from "primereact/progressspinner";
import { Coin } from "../../types/coin";
import { Link } from "react-router-dom";

const CoinsTable: React.FC = () => {
  const { coins, loading, error } = useCoins();

  if (loading) return <ProgressSpinner />;
  if (error) return <p className="error">{error}</p>;

  const coinTemplate = (coin: Coin) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          alt={coin.name}
          src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
          style={{ width: "24px" }}
        />
        <Link to={`/coin/${coin.id}`}>
          <span className="text-gray-700 underline">{coin.name}</span>
        </Link>
      </div>
    );
  };

  return (
    <div className="card">
      <DataTable value={coins} paginator rows={10}>
        <Column field="rank" header="Rank"></Column>
        <Column field="name" header="Name" body={coinTemplate}></Column>
        <Column field="symbol" header="Symbol"></Column>
        <Column field="type" header="Type"></Column>
      </DataTable>
    </div>
  );
};

export default CoinsTable;
