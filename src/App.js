import AuthProvider from "./components/Autenticacao/AuthContext";
import ListaProdutos from "./pages/Cliente/ListaProdutos/ListaProdutos";
import Vitrine from "./pages/Cliente/Vitrine/Vitrine";
import Produto from "./pages/Cliente/Produto/Produto";
import Gerenciador from "./pages/Gerenciador/Gerenciador/Gerenciador";
import Login from "./pages/Gerenciador/Login/Login";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/produtos" element={<ListaProdutos />} />
            <Route exact path="/" element={<Vitrine />} />
            <Route exact path="/gerenciador" element={<Gerenciador />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/produtos/:idProduto" element={<Produto />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
