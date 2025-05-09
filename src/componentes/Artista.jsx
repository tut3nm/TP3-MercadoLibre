import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import '../estilos/Artista.css';

function Artista({ token, id, onBack }) {
  const [artista, setArtista] = useState(null);

  useEffect(() => {
    const obtenerDetalles = async () => {
      try {
        const { data } = await axios.get(
          `https://api.spotify.com/v1/artists/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setArtista(data);
      } catch (error) {
        console.error('Error al obtener detalles del artista:', error);
      }
    };
    if (token) obtenerDetalles();
  }, [id, token]);

  if (!artista) return <p>Cargando artista...</p>;

  return (
    <div className="detalle-artista">
      <button className="boton-volver" onClick={onBack}>
        ← Volver a resultados
      </button>
      <h2>{artista.name}</h2>
      {artista.images[0] && (
        <img
          src={artista.images[0].url}
          alt={artista.name}
          className="imagen-detalle"
        />
      )}
      <p><strong>Géneros:</strong> {artista.genres.join(', ')}</p>
      <p>
        <strong>Seguidores:</strong>{' '}
        {artista.followers.total.toLocaleString()}
      </p>
      <p><strong>Popularidad:</strong> {artista.popularity}/100</p>
      <a
        href={artista.external_urls.spotify}
        target="_blank"
        rel="noreferrer"
      >
        Ver en Spotify
      </a>
    </div>
  );
}

export default Artista;
