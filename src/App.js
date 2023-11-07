import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListaRecetas from "./paginas/Recetas";
import VerReceta from "./paginas/verReceta";
import EditarReceta from "./paginas/EditarReceta";
import Invent from "./paginas/Inventario";
import Dashboard from "./paginas/Dashboard";
import Login from "./paginas/Login"; // Importa Login aquí
import Lotes from './paginas/Lotes';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />

          <Route path="/listaRecetas" element={<ListaRecetas />} />
          <Route path="/verReceta/:id" element={<VerReceta/>} /> 
          <Route path="/editarReceta/:id" element={<EditarReceta />} />
          <Route path="/inventario" element={<Invent/>} />
          <Route path="/lotes" element={<Lotes/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
