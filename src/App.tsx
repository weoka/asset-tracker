import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex

import { Provider } from "react-redux";
import { store } from "./store";
import { PrimeReactProvider } from "primereact/api";

import { Header } from "./components/header/header";
import CoinsTable from "./components/coins-table/coins-table";

function App() {
  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <div className="App">
          <Header></Header>
          <CoinsTable></CoinsTable>
          <p className="text-center mt-5">Data provided by <a href="https://coinpaprika.com" target="_blank">Coinpaprika</a></p>
        </div>
      </PrimeReactProvider>
    </Provider>
  );
}

export default App;
