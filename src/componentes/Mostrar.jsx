import React from 'react';
import '../estilos/Mostrar.css';

function Mostrar({ productos }) {
  if (productos.length === 0) {
    return null; // no mostramos nada si no hay productos
  }

  return (
    <div className="contenedor-mostrar">
      {productos.map((item) => (
        <div key={item.id} className="tarjeta-producto">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="imagen-producto"
          />
          <h3 className="titulo-producto">{item.title}</h3>
          <p className="precio-producto">${item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Mostrar;
