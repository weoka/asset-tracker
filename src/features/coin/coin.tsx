import React from "react";
import { useParams } from "react-router-dom";
import { useTicker } from "../../hooks/use-ticker";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Coin: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { ticker, loading, error } = useTicker(id ?? "btc-bitcoin");

  if (loading) return <p>Loading coin details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!ticker) return <p>No details available for this coin.</p>;

  return (
    <div className="flex gap-5">
      <div className="bg-white text-gray-700 p-6 border-round-sm">
        <h2>
          {ticker.name} ({ticker.symbol})
        </h2>
        <img
          src={`https://static.coinpaprika.com/coin/${ticker.id}/logo.png`}
        />
      </div>

      <div className="bg-white text-gray-700 p-6 border-round-sm">
        <DataTable value={[ticker.quotes["USD"]]}>
          <Column field="price" header="Price"></Column>
          <Column field="volume_24h" header="Volume"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default Coin;
