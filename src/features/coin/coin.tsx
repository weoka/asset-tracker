import React from "react";
import { useParams } from "react-router-dom";
import { useTicker } from "../../hooks/use-ticker";
import MarketTable from "../../components/market-table/market-table";

const Coin: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { ticker, loading, error } = useTicker(id ?? "btc-bitcoin");

  if (loading) return <p>Loading coin details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!ticker) return <p>No details available for this coin.</p>;

  return (
    <div className="flex justify-content-between">
      <div className="bg-white text-gray-700 text-center p-6 pr-8 pl-8 border-round-sm">
        <h2>
          {ticker.name} ({ticker.symbol})
        </h2>
        <img
          src={`https://static.coinpaprika.com/coin/${ticker.id}/logo.png`}
        />
      </div>

      <div className="bg-white text-gray-700 p-6 border-round-sm">
        <MarketTable ticker={ticker}></MarketTable>
      </div>
    </div>
  );
};

export default Coin;
