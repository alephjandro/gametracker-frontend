import React, { useState } from 'react';
import Navegacion from './components/Navegacion';
import AgregarJuego from './components/AgregarJuego';
import BibliotecaJuegos from './components/BibliotecaJuegos';
import TodasResenas from './components/TodasResenas';
import EstadisticasPersonales from './components/EstadisticasPersonales';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleGameAdded = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="app-container">
      <div className="titulo-container">
        <h1 className="titulo-gametracker">GameTracker</h1>
        <div className="divider"></div>
        <h2 className="subtitulo-gametracker">Tu biblioteca de juegos personalizada</h2>
      </div>
      <Navegacion />
      <section id="agregar" className="seccion-contenido">
        <AgregarJuego onGameAdded={handleGameAdded} />
      </section>
      <section id="juegos" className="seccion-contenido">
        <BibliotecaJuegos key={refreshKey} />
      </section>
      <section id="resenas" className="seccion-contenido">
        <TodasResenas />
      </section>
      <section id="estadisticas" className="seccion-contenido">
        <EstadisticasPersonales />
      </section>
    </div>
  );
}

export default App;






