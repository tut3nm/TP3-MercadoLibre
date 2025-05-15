import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BotonFavorito from './BotonFavorito';
import Favoritos from './Favoritos';
import '../estilos/Artista.css';

export default function Artista({
  token,
  id,
  onBack,
  agregarFavorito,
  favoritos,
  eliminarFavorito
}) {
  const [artista, setArtista] = useState(null);
  const [albumes, setAlbumes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const [artRes, albRes] = await Promise.all([
          axios.get(`https://api.spotify.com/v1/artists/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`https://api.spotify.com/v1/artists/${id}/albums`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { include_groups: 'album,single', market: 'US', limit: 50 }
          })
        ]);
        setArtista(artRes.data);
        setAlbumes(albRes.data.items);
      } catch (e) {
        console.error(e);
        setError('No se pudieron cargar los datos.');
      }
    })();
  }, [id, token]);

  if (error) {
    return (
      <div className="artista-page">
        <Favoritos favoritos={favoritos} onRemove={eliminarFavorito} />
        <button className="boton-volver" onClick={onBack}>← Volver</button>
        <p className="mensaje-error">{error}</p>
      </div>
    );
  }
  if (!artista) {
    return (
      <div className="artista-page">
        <Favoritos favoritos={favoritos} onRemove={eliminarFavorito} />
        <p className="cargando">Cargando artista…</p>
      </div>
    );
  }

  return (
    <div className="artista-page">
      <Favoritos favoritos={favoritos} onRemove={eliminarFavorito} />
      <button className="boton-volver" onClick={onBack}>
        ← Volver a resultados
      </button>
      <div className="detalle-imagen">
        {artista.images[0] && (
          <img
            src={artista.images[0].url}
            alt={artista.name}
            className="imagen-principal"
          />
        )}
      </div>
      <div className="detalle-info">
        <h1 className="nombre-principal">{artista.name}</h1>
        <BotonFavorito
          item={{
            tipo: 'Artista',
            nombre: artista.name,
            url: artista.external_urls.spotify
          }}
          favoritos={favoritos}
          agregarFavorito={agregarFavorito}
          eliminarFavorito={eliminarFavorito}
        />
      </div>
      <h2 className="titulo-albumes">Álbumes</h2>
      <div className="albumes-scroll">
        {albumes.map((alb) => {
          const año = alb.release_date.split('-')[0];
          return (
            <div key={alb.id} className="tarjeta-album">
              <BotonFavorito
                item={{
                  tipo: 'Álbum',
                  nombre: alb.name,
                  url: alb.external_urls.spotify
                }}
                favoritos={favoritos}
                agregarFavorito={agregarFavorito}
                eliminarFavorito={eliminarFavorito}
              />
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

