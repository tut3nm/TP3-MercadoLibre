import React from 'react';
import '../estilos/Favoritos.css';

function Favoritos({ favoritos, onRemove }) {
  return (
    <div className="favoritos-container">
      <h2>Favoritos</h2>
      {favoritos.length === 0 ? (
        <p>No hay favoritos aún.</p>
      ) : (
        <ul className="favoritos-lista">
          {favoritos.map((item, index) => (
            <li key={index} className="favorito-item">
              <span>{item.tipo.toUpperCase()}: </span>
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.nombre}
              </a>
              <button onClick={() => onRemove(index)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favoritos;