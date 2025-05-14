import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../estilos/Album.css';

function Album({ token, idAlbum, onBack, agregarFavorito }) {
  return (
    <div className="album-page">
      <button className="boton-volver" onClick={onBack}>
        ← Volver al Artista
      </button>
      <h3>Lista de pistas</h3>
      <ul className="lista-pistas">
        {pistas.map(p => (
          <li key={p.id} className="pista-item">
            <a href={p.external_urls.spotify} className="pista-nombre">
              {p.name}
            </a>
            <button
              className="boton-favorito"
              onClick={() => agregarFavorito({
                tipo: 'Pista',
                nombre: p.name,
                url: p.external_urls.spotify
              })}
            >
              + Favoritos
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Album;
