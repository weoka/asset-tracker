import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex

import { Provider } from "react-redux";
import { store } from "./store";
import { PrimeReactProvider } from "primereact/api";

import { Header } from "./components/header/header";

function App() {
  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <div className="App">
          <Header></Header>
        </div>
      </PrimeReactProvider>
    </Provider>
  );
}

export default App;
