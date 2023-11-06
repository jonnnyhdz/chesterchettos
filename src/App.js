import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import ListaRecetas from "./paginas/Recetas";
import Login from "./paginas/Login";
import VerReceta from "./paginas/verReceta";
import EditarReceta from "./paginas/EditarReceta";
import Invent from "./paginas/Inventario";
import Dashboard from "./paginas/Dashboard";

function App() {
  return (
    <div className="App">
      <>
        <Router>
          <Navbar />
          <div>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/listaRecetas" element={<ListaRecetas />} />
              <Route path="/verReceta" element={<VerReceta/>} /> 
              <Route path="/editarReceta" element={<EditarReceta />} />
              <Route path="/inventario" element={<Invent />} />
            </Routes>
          </div>
        </Router>
      </>
    </div>
  );
}

export default App;
