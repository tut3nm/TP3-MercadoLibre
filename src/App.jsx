// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import Buscador from './componentes/Buscador';
import TokenSpotify from './componentes/AccessToken';
import Artista from './componentes/Artista';
import Favoritos from './componentes/Favoritos';

function App() {
  const [token, setToken] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [artistaSeleccionado, setArtistaSeleccionado] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  // Agrega un nuevo favorito (artista, álbum o canción)
  const agregarFavorito = (item) => {
    setFavoritos((prev) => [...prev, item]);
  };

  // Elimina un favorito por índice
  const eliminarFavorito = (index) => {
    setFavoritos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <TokenSpotify alRecibirToken={setToken} />

      {/* Sólo mostramos Buscador + Favoritos mientras no haya artista seleccionado */}
      {token && !artistaSeleccionado && (
        <div className="busqueda-y-favoritos">
          <Buscador
            token={token}
            artista={terminoBusqueda}
            setArtista={setTerminoBusqueda}
            resultados={resultados}
            setResultados={setResultados}
            onSelectArtist={setArtistaSeleccionado}
            agregarFavorito={agregarFavorito}
            favoritos={favoritos}
            eliminarFavorito={eliminarFavorito}
          />
          <Favoritos
            favoritos={favoritos}
            onRemove={eliminarFavorito}
          />
        </div>
      )}

      {/* Vista de Artista (oculta buscador y favoritos) */}
      {token && artistaSeleccionado && (
        <Artista
          token={token}
          id={artistaSeleccionado}
          onBack={() => setArtistaSeleccionado(null)}
          agregarFavorito={agregarFavorito}
          favoritos={favoritos}
          eliminarFavorito={eliminarFavorito}
        />
      )}
    </div>
  );
}

export default App;
