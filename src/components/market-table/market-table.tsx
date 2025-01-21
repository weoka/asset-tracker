import React from "react";
import { Ticker } from "../../types/ticker";
import { Quote } from "../../types/ticker";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const MarketTable: React.FC<{ ticker: Ticker }> = ({ ticker }) => {
  const DollarTemplate: React.FC<{ number: number; decimals?: number }> = ({
    number,
    decimals = 2,
  }) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>
          $
          {number.toLocaleString(undefined, {
            currency: "USD",
            maximumFractionDigits: decimals,
          })}
        </span>
      </div>
    );
  };

  const PercentTemplate: React.FC<{ number: number }> = ({ number }) => {
    return (
      <div className="flex align-items-center gap-2">
        <span className={number > 0 ? "text-teal-500" : "text-red-500"}>
          {number.toFixed(2)}%
        </span>
      </div>
    );
  };

  const priceTemplate = (quote: Quote) => {
    return <DollarTemplate number={quote.price}></DollarTemplate>;
  };

  const marketcapTemplate = (quote: Quote) => {
    return <DollarTemplate number={quote.market_cap}></DollarTemplate>;
  };

  const volumeTemplate = (quote: Quote) => {
    return (
      <DollarTemplate number={quote.volume_24h} decimals={0}></DollarTemplate>
    );
  };

  const change24h = (quote: Quote) => {
    return (
      <PercentTemplate number={quote.percent_change_24h}></PercentTemplate>
    );
  };

  const change7d = (quote: Quote) => {
    return <PercentTemplate number={quote.percent_change_7d}></PercentTemplate>;
  };

  const change30d = (quote: Quote) => {
    return (
      <PercentTemplate number={quote.percent_change_30d}></PercentTemplate>
    );
  };

  const change1y = (quote: Quote) => {
    return <PercentTemplate number={quote.percent_change_1y}></PercentTemplate>;
  };

  return (
    <DataTable value={[ticker.quotes["USD"]]}>
      <Column header="Price" body={priceTemplate}></Column>
      <Column header="Market cap" body={marketcapTemplate}></Column>
      <Column header="Volume" body={volumeTemplate}></Column>
      <Column header="Price change 24h" body={change24h}></Column>
      <Column header="Price change 7d" body={change7d}></Column>
      <Column header="Price change 30d" body={change30d}></Column>
      <Column header="Price change 1 year" body={change1y}></Column>
    </DataTable>
  );
};

export default MarketTable;
