import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex

import { Provider } from "react-redux";
import { store } from "./store";
import { PrimeReactProvider } from "primereact/api";
import { Routes, Route } from "react-router-dom";

import Home from "./features/home/home";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function App() {
  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer></Footer>
      </PrimeReactProvider>
    </Provider>
  );
}

export default App;
