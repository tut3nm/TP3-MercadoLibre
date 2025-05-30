import React from 'react';
import axios from 'axios';
import Mostrar from './Mostrar';
import '../estilos/Buscador.css';

function Buscador({
  token,
  artista,
  setArtista,
  resultados,
  setResultados,
  onSelectArtist,
  agregarFavorito,
  favoritos, 
  eliminarFavorito
}) {
  const manejarBusqueda = async () => {
    if (!artista.trim()) return;
    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(artista)}&type=artist`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResultados(data.artists.items);
    } catch (error) {
      console.error('Error al buscar artistas:', error);
    }
  };

  return (
    <div>
      <div className="contenedor-buscador">
        <h2 className="titulo-buscador">Buscador de música</h2>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
          alt="spotify-logo"
        />
        <div className="contenedor-input-boton">
          <input
            type="text"
            className="input-buscador"
            placeholder="Ingrese su Artista..."
            value={artista}
            onChange={(e) => setArtista(e.target.value)}
          />
          <div className="boton-buscar" onClick={manejarBusqueda}>
            Buscar
          </div>
        </div>
      </div>

      {resultados.length > 0 && (
        <Mostrar
          artistas={resultados}
          onSelectArtist={onSelectArtist}
          onBackMostrar={() => setResultados([])}
          agregarFavorito={agregarFavorito}      
          favoritos={favoritos}                   
          eliminarFavorito={eliminarFavorito}     
        />
      )}
    </div>
  );
}

export default Buscador;
