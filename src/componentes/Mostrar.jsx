import React from 'react';
import '../estilos/Mostrar.css';

function Mostrar({ productos }) {
  return (
    <div className="lista-productos">
      {productos.map((producto) => (
        <div key={producto.id} className="tarjeta-producto">
          <img src={producto.thumbnail} alt={producto.title} className="imagen-producto" />
          <div className="info-producto">
            <h3 className="titulo-producto">{producto.title}</h3>
            <p className="vendedor-producto">Por {producto.seller?.nickname || "Vendedor desconocido"}</p>
            <p className="precio-producto">${producto.price.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Mostrar;