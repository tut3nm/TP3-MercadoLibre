import React from 'react';
import BotonFavorito from './BotonFavorito';
import Favoritos from './Favoritos';
import '../estilos/Mostrar.css';

export default function Mostrar({
  artistas,
  onSelectArtist,
  onBackMostrar,
  agregarFavorito,
  favoritos,
  eliminarFavorito
}) {
  return (
    <div className="contenedor-mostrar">
      <Favoritos favoritos={favoritos} onRemove={eliminarFavorito} />
      <button className="boton-volver-buscar" onClick={onBackMostrar}>
        ← Volver a buscar
      </button>
      <div className="lista-artistas">
        {artistas.map((a) => (
          <div
            key={a.id}
            className="tarjeta-artista"
            onClick={() => onSelectArtist(a.id)}
          >
            <div className="imagen-container">
              <img
                src={a.images[0]?.url}
                alt={a.name}
                className="imagen-artista"
              />
            </div>
            <div className="info-artista">
              <h3 className="nombre-artista">{a.name}</h3>
              {a.genres.length > 0 && (
                <p className="genero-artista">
                  Géneros: {a.genres.join(', ')}
                </p>
              )}
              <p className="seguidores-artista">
                Seguidores: {a.followers.total.toLocaleString()}
              </p>
              <BotonFavorito
                item={{
                  tipo: 'Artista',
                  nombre: a.name,
                  url: a.external_urls.spotify
                }}
                favoritos={favoritos}
                agregarFavorito={agregarFavorito}
                eliminarFavorito={eliminarFavorito}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
