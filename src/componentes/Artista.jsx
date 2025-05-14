import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../estilos/Artista.css';

function Artista({ token, id, onBack, agregarFavorito }) {
  

  return (
    <div className="artista-page">
      <button className="boton-volver" onClick={onBack}>
        ← Volver a resultados
      </button>

      <div className="detalle-info">
        <button
          className="boton-favorito"
          onClick={() => agregarFavorito({
            tipo: 'Artista',
            nombre: artista.name,
            url: artista.external_urls.spotify
          })}
        >
          + Favoritos
        </button>
      </div>

      <h2 className="titulo-albumes">Álbumes</h2>
      <div className="albumes-scroll">
        {albumes.map(alb => {
          const año = alb.release_date.split('-')[0];
          return (
            <div
              key={alb.id}
              className="tarjeta-album"
              onClick={() => setAlbumSeleccionado(alb.id)}
            >
              <button
                className="boton-favorito"
                onClick={(e) => {
                  e.stopPropagation();
                  agregarFavorito({
                    tipo: 'Álbum',
                    nombre: alb.name,
                    url: alb.external_urls.spotify
                  });
                }}
              >
                + Favoritos
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Artista;
