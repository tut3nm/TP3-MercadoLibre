import React from 'react';
import '../estilos/Mostrar.css';

function Mostrar({ artistas, onSelectArtist, onBackMostrar, agregarFavorito }) {
  return (
    <div className="contenedor-mostrar">
      <button
        className="boton-volver-buscar"
        onClick={onBackMostrar}
      >
        ← Volver a buscar
      </button>
      <div className="lista-artistas">
        {artistas.map((artista) => (
          <div
            key={artista.id}
            className="tarjeta-artista"
            onClick={() => onSelectArtist(artista.id)}
          >
            <div className="imagen-container">
              <img
                src={artista.images[0]?.url}
                alt={artista.name}
                className="imagen-artista"
              />
            </div>
            <div className="info-artista">
              <h3 className="nombre-artista">{artista.name}</h3>
              {artista.genres.length > 0 && (
                <p className="genero-artista">
                  Géneros: {artista.genres.join(', ')}
                </p>
              )}
              <p className="seguidores-artista">
                Seguidores: {artista.followers.total.toLocaleString()}
              </p>
              <button
                className="boton-favorito"
                onClick={(e) => { e.stopPropagation(); agregarFavorito({
                  tipo: 'Artista',
                  nombre: artista.name,
                  url: artista.external_urls.spotify
                }); }}
              >
                + Favoritos
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mostrar;

