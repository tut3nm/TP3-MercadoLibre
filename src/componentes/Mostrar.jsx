import React from 'react';
import '../estilos/Mostrar.css';

function Mostrar({ artistas }) {
  return (
    <div className="lista-artistas">
      {artistas.map((artista) => (
        <div key={artista.id} className="tarjeta-artista">
          <img
            src={artista.images[0]?.url}
            alt={artista.name}
            className="imagen-artista"
          />
          <div className="info-artista">
            <h3 className="nombre-artista">{artista.name}</h3>
            {artista.genres.length > 0 && (
              <p className="genero-artista">Géneros: {artista.genres.join(', ')}</p>
            )}
            <p className="seguidores-artista">
              Seguidores: {artista.followers.total.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Mostrar;