import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../estilos/Album.css';

function Album({ token, idAlbum, onBack }) {
  const [detalle, setDetalle] = useState(null);
  const [pistas, setPistas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token || !idAlbum) return;

    const cargarDatos = async () => {
      try {
        // obtener datos del álbum y pistas
        const resp = await axios.get(
          `https://api.spotify.com/v1/albums/${idAlbum}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const albumData = resp.data;
        setDetalle(albumData);
        setPistas(albumData.tracks.items);
      } catch (e) {
        console.error(e);
        setError('Error cargando detalles del álbum');
      }
    };

    cargarDatos();
  }, [token, idAlbum]);

  if (error) return (
    <div className="album-page">
      <button className="boton-volver" onClick={onBack}>
        ← Volver al Artista
      </button>
      <p className="mensaje-error">{error}</p>
    </div>
  );
  if (!detalle) return <p className="cargando">Cargando álbum…</p>;

  return (
    <div className="album-page">
      <button className="boton-volver" onClick={onBack}>
        ← Volver al Artista
      </button>

      <div className="detalle-album">
        {detalle.images[0] && (
          <img
            src={detalle.images[0].url}
            alt={detalle.name}
            className="album-imagen"
          />
        )}
        <div className="album-info">
          <h1>{detalle.name}</h1>
          <h2>{detalle.artists[0].name}</h2>
          <p>Fecha de lanzamiento: {detalle.release_date}</p>
          <p>Canciones: {detalle.total_tracks}</p>
        </div>
      </div>

      <h3>Lista de pistas</h3>
      <ul className="lista-pistas">
        {pistas.map(p => (
          <li key={p.id} className="pista-item">
            <a href={p.external_urls.spotify}>
              <span className="pista-nombre">{p.name}</span>
            </a>
            <span className="pista-duracion">
              {Math.floor(p.duration_ms/60000)}:
              {String(Math.floor((p.duration_ms % 60000)/1000)).padStart(2,'0')}
            </span>
            <span className="pista-popularidad">
              Popularidad: {p.popularity ?? '-'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Album;