import React from "react";
import { useParams } from "react-router-dom";

const Coin: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>Coin ID: {id}</h1>
    </div>
  );
};

export default Coin;
