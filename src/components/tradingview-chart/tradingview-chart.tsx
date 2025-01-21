import React, { useEffect, useRef } from "react";
import {
  createChart,
  IChartApi,
  DeepPartial,
  ChartOptions,
  Time,
} from "lightweight-charts";

interface ChartProps {
  width?: number;
  height?: number;
  data: { time: Time; value: number }[];
  options?: DeepPartial<ChartOptions>;
}

const TraingviewChart: React.FC<ChartProps> = ({
  width = 600,
  height = 300,
  data,
  options,
}) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartRef.current = createChart(chartContainerRef.current, {
      width,
      height,
      ...options,
    });

    const lineSeries = chartRef.current.addLineSeries();
    lineSeries.setData(data);

    return () => {
      chartRef.current?.remove();
    };
  }, [data, options, width, height]);

  return <div ref={chartContainerRef} />;
};

export default TraingviewChart;
