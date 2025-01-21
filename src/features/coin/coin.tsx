import React from "react";
import { useParams } from "react-router-dom";
import { useTicker } from "../../hooks/use-ticker";
import MarketTable from "../../components/market-table/market-table";
import PriceChart from "../../components/price-chart/price-chart";

const Coin: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { ticker, loading, error } = useTicker(id ?? "btc-bitcoin");

  if (loading) return <p>Loading coin details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!ticker) return <p>No details available for this coin.</p>;

  return (
    <div className="bg-white text-gray-700 p-6 border-round-sm">
      <div className="flex gap-4">
        <img
          src={`https://static.coinpaprika.com/coin/${ticker.id}/logo.png`}
          className="w-5rem"
        />
        <h2>
          {ticker.name} ({ticker.symbol})
        </h2>
      </div>

      <MarketTable ticker={ticker}></MarketTable>
      <PriceChart id={id ?? "btc-bitcoin"}></PriceChart>
    </div>
  );
};

export default Coin;
