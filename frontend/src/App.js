import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import './index.css';
import List from "./components/ClientList";
import Form from "./components/Form"; 

function App() {
  return (
    <Router>
      <div>
        <header>
          <h1> Cadastro de Clientes - APS </h1>
        </header>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/cliente" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;