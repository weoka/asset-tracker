import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex

import { Header } from './components/Header/Header';

function App() {

  return (
    <div className="App">
      <Header></Header>
    </div>
  );
}

export default App;