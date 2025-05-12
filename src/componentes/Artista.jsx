import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Album from './Album';  
import '../estilos/Artista.css';

function Artista({ token, id, onBack }) {
  const [artista, setArtista] = useState(null);
  const [albumes, setAlbumes] = useState([]);
  const [error, setError] = useState(null);
  const [albumSeleccionado, setAlbumSeleccionado] = useState(null);


  useEffect(() => {
    if (!token) return;

    const fetchArtistaYAlbumes = async () => {
      try {
        const { data: artistaData } = await axios.get(
          `https://api.spotify.com/v1/artists/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setArtista(artistaData);

        const { data: albData } = await axios.get(
          `https://api.spotify.com/v1/artists/${id}/albums`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              include_groups: 'album,single',
              market: 'US',
              limit: 50
            }
          }
        );
        setAlbumes(albData.items);
      } catch (e) {
        console.error(e);
        setError('No se pudieron cargar los datos del artista.');
      }
    };

    fetchArtistaYAlbumes();
  }, [id, token]);

  if (error) {
    return (
      <div className="artista-page">
        <button className="boton-volver" onClick={onBack}>← Volver</button>
        <p className="mensaje-error">{error}</p>
      </div>
    );
  }

  if (!artista) {
    return <p className="cargando">Cargando artista…</p>;
  }
  if (albumSeleccionado) {
    return (
      <Album
        token={token}
        idAlbum={albumSeleccionado}
        // onBack limpia el estado para volver a la vista de artista
        onBack={() => setAlbumSeleccionado(null)}
      />
    );
  }

  return (
    <div className="artista-page">
      <button className="boton-volver" onClick={onBack}>
        ← Volver a resultados
      </button>

      {artista.images[0] && (
        <div className="detalle-imagen">
          <img
            src={artista.images[0].url}
            alt={artista.name}
            className="imagen-principal"
          />
        </div>
      )}

      <div className="detalle-info">
        <h1 className="nombre-principal">{artista.name}</h1>
        {artista.genres.length > 0 && (
          <p className="generos">
            <strong>Géneros:</strong> {artista.genres.join(', ')}
          </p>
        )}
        <p className="seguidores">
          <strong>Seguidores:</strong> {artista.followers.total.toLocaleString()}
        </p>
        <p className="popularidad">
          <strong>Popularidad:</strong> {artista.popularity}/100
        </p>
        <a
          href={artista.external_urls.spotify}
          target="_blank"
          rel="noreferrer"
          className="link-spotify"
        >
          Ver en Spotify
        </a>
      </div>

      <h2 className="titulo-albumes">Álbumes</h2>
      <div className="albumes-scroll">
        {albumes.map(alb => {
          const año = alb.release_date.split('-')[0];
          return (
            <div
              key={alb.id}
              className="tarjeta-album"
              style={{ cursor: 'pointer' }}
              // Al click, guardo el id en el estado local
              onClick={() => setAlbumSeleccionado(alb.id)}
            >
              {alb.images[0] && (
                <img
                  src={alb.images[0].url}
                  alt={alb.name}
                  className="imagen-album"
                />
              )}
              <p className="nombre-album">{alb.name}</p>
              <p className="año-album">{año}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Artista;