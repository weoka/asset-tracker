import React from "react";
import { useChart } from "../../hooks/use-chart";
import TraingviewChart from "../tradingview-chart/tradingview-chart";

const PriceChart: React.FC<{ id: string }> = ({ id }) => {
  const { chart, loading } = useChart(id ?? "btc-bitcoin");

  if (loading) return <p>Loading chart details...</p>;

  return (
    <>
      <h2>Market Chart</h2>
      <TraingviewChart
        data={chart ?? []}
        options={{ autoSize: true }}
      ></TraingviewChart>
    </>
  );
};

export default PriceChart;
