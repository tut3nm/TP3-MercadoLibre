import React, { useState } from 'react';
import '../estilos/Favoritos.css';

export default function Favoritos({ favoritos, onRemove }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button
        className="toggle-fav-button"
        onClick={() => setVisible((v) => !v)}
      >
        {visible ? 'Cerrar Favoritos' : 'Ver Favoritos'}
      </button>
      {visible && (
        <div className="favoritos-container">
          <h2>Favoritos</h2>
          {favoritos.length === 0 ? (
            <p className="sin-fav">No hay favoritos aún.</p>
          ) : (
            <ul className="favoritos-lista">
              {favoritos.map((item, idx) => (
                <li key={idx} className="favorito-item">
                  <span className="tipo-fav">{item.tipo.toUpperCase()}:</span>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.nombre}
                  </a>
                  <button
                    className="boton-quitar-fav"
                    onClick={() => onRemove(idx)}
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
