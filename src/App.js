import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharactersBySaga from "./pages/CharactersBySaga";
import CharacterDetails from "./pages/CharacterDetails";
import ComicDetails from "./pages/ComicDetails";
import "./App.css";
import Navbar from "./components/Navbar"; // Importamos el Navbar

const App = () => (
  <Router>
    <>
      <Navbar /> {/* Siempre visible */}
      <Routes>
        <Route path="/" element={<CharactersBySaga />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
        <Route path="/comic/:comicId" element={<ComicDetails />} />
      </Routes>
    </>
  </Router>
);

export default App;
