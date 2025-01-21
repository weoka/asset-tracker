const chainMap = {
  1: { id: 1, key: "eth", name: "Ethereum", symbol: "ETH" },
  11155111: {
    id: 11155111,
    key: "sepolia",
    name: "Ethereum Sepolia",
    symbol: "ETH",
  },
  17000: { id: 17000, key: "holesky", name: "Ethereum Holesky", symbol: "ETH" },
  10856: {
    id: 10856,
    key: "polygon amoy",
    name: "Polygon Amoy",
    symbol: "MATIC",
  },
  137: { id: 137, key: "polygon", name: "Polygon", symbol: "MATIC" },
  56: { id: 56, key: "bsc", name: "Binance Smart Chain", symbol: "BNB" },
  97: { id: 97, key: "bsc testnet", name: "BSC Testnet", symbol: "BNB" },
  43114: { id: 43114, key: "avalanche", name: "Avalanche", symbol: "AVAX" },
  250: { id: 250, key: "fantom", name: "Fantom", symbol: "FTM" },
  11297108109: {
    id: 11297108109,
    key: "palm",
    name: "Palm Network",
    symbol: "PALM",
  },
  25: { id: 25, key: "cronos", name: "Cronos", symbol: "CRO" },
  42161: { id: 42161, key: "arbitrum", name: "Arbitrum One", symbol: "ARB" },
  100: { id: 100, key: "gnosis", name: "Gnosis Chain", symbol: "xDAI" },
  1039: {
    id: 1039,
    key: "gnosis testnet",
    name: "Gnosis Testnet",
    symbol: "xDAI",
  },
  88888: { id: 88888, key: "chiliz", name: "Chiliz Chain", symbol: "CHZ" },
  88882: {
    id: 88882,
    key: "chiliz testnet",
    name: "Chiliz Testnet",
    symbol: "CHZ",
  },
  8453: { id: 8453, key: "base", name: "Base", symbol: "ETH" },
  84532: {
    id: 84532,
    key: "base sepolia",
    name: "Base Sepolia",
    symbol: "ETH",
  },
  10: { id: 10, key: "optimism", name: "Optimism", symbol: "ETH" },
  59144: { id: 59144, key: "linea", name: "Linea", symbol: "ETH" },
  59140: {
    id: 59140,
    key: "linea sepolia",
    name: "Linea Sepolia",
    symbol: "ETH",
  },
  1284: { id: 1284, key: "moonbeam", name: "Moonbeam", symbol: "GLMR" },
  1285: { id: 1285, key: "moonriver", name: "Moonriver", symbol: "MOVR" },
  1287: { id: 1287, key: "moonbase", name: "Moonbase Alpha", symbol: "DEV" },
  539: { id: 539, key: "flow", name: "Flow", symbol: "FLOW" },
  545: { id: 545, key: "flow-testnet", name: "Flow Testnet", symbol: "FLOW" },
  2020: { id: 2020, key: "ronin", name: "Ronin", symbol: "RON" },
  2021: {
    id: 2021,
    key: "ronin-testnet",
    name: "Ronin Testnet",
    symbol: "RON",
  },
  1137: { id: 1137, key: "lisk", name: "Lisk", symbol: "LSK" },
  4202: { id: 4202, key: "lisk-sepolia", name: "Lisk Sepolia", symbol: "LSK" },
  369: { id: 369, key: "pulse", name: "PulseChain", symbol: "PLS" },
};

const getChainName = (chainId: number) =>
  chainMap[chainId as keyof typeof chainMap] || "Unknown Chain";

export default getChainName;
