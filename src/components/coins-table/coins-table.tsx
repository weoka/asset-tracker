import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useCoins } from "../../hooks/use-coins";
import { ProgressSpinner } from "primereact/progressspinner";

const CoinsTable: React.FC = () => {
  const { coins, loading, error } = useCoins();

  if (loading) return <ProgressSpinner />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="card">
      <DataTable value={coins} paginator rows={10}>
        <Column field="rank" header="Rank"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="symbol" header="Symbol"></Column>
        <Column field="type" header="Type"></Column>
      </DataTable>
    </div>
  );
};

export default CoinsTable;
