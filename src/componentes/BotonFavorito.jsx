import React from 'react';
import '../estilos/BotonFavorito.css';

export default function BotonFavorito({
  item,            
  favoritos = [],  
  agregarFavorito,  
  eliminarFavorito  
}) {
  const esFav = favoritos.some(
    (f) => f.tipo === item.tipo && f.nombre === item.nombre
  );

  const toggle = (e) => {
    e.stopPropagation();
    const idx = favoritos.findIndex(
      (f) => f.tipo === item.tipo && f.nombre === item.nombre
    );
    if (idx >= 0) eliminarFavorito(idx);
    else agregarFavorito(item);
  };

  return (
    <button
      className={`boton-favorito${esFav ? ' activo' : ''}`}
      onClick={toggle}
    >
      {esFav ? '– Favoritos' : '+ Favoritos'}
    </button>
  );
}

