import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { UseCoins } from "../../hooks/use-coins";
import { Coin } from "../../types/coin";

const Search: React.FC = () => {
  const { coins, loading, error } = UseCoins();
  const [filteredCoins, setFilteredCoins] = useState<Coin[] | undefined>(
    undefined
  );
  const [selectedCoin, setSelectedCoin] = useState<Coin | undefined>(undefined);

  const search = (event: { query: string }) => {
    let _filteredCoins;
    if (!event.query.trim().length) {
      _filteredCoins = [...coins];
    } else {
      _filteredCoins = coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(event.query.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(event.query.toLowerCase())
      );
    }
    setFilteredCoins(_filteredCoins.slice(0, 5));
  };

  const itemTemplate = (coin: Coin) => {
    return (
      <div className="flex align-items-center">
        <img
          alt={coin.name}
          src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
          className="mr-2"
          style={{ width: "18px" }}
        />
        <div>
          {coin.name} ({coin.symbol})
        </div>
      </div>
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="card flex justify-content-center">
      <AutoComplete
        field="name"
        value={selectedCoin}
        suggestions={filteredCoins}
        completeMethod={search}
        onChange={(e) => setSelectedCoin(e.value)}
        itemTemplate={itemTemplate}
        placeholder="Search coin..."
      />
    </div>
  );
};

export default Search;
