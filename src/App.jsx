import React, { useState } from 'react';
import './App.css';
import Buscador from './componentes/Buscador';
import TokenSpotify from './componentes/AccessToken';
import Artista from './componentes/Artista';

function App() {
  const [token, setToken] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [artistaSeleccionado, setArtistaSeleccionado] = useState(null);

  return (
    <div className="App">
      <TokenSpotify alRecibirToken={setToken} />

      {token && !artistaSeleccionado && (
        <Buscador
          token={token}
          artista={terminoBusqueda}
          setArtista={setTerminoBusqueda}
          resultados={resultados}
          setResultados={setResultados}
          onSelectArtist={setArtistaSeleccionado}
        />
      )}

      {token && artistaSeleccionado && (
        <Artista
          token={token}
          id={artistaSeleccionado}
          onBack={() => setArtistaSeleccionado(null)}
        />
      )}
    </div>
  );
}

export default App;

