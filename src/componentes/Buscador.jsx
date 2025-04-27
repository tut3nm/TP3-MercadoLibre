import React, { useState } from 'react';
import axios from 'axios';
import '../estilos/Buscador.css';

function Buscador() {
  const [producto, setProducto] = useState('');

  const manejarBusqueda = async () => {
    if (producto.trim() === '') return;

    try {
      const respuesta = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(producto)}&limit=15`);
      console.log(respuesta.data.results); // Acá vas a recibir los 15 resultados
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  };

  return (
    <div className="contenedor-buscador">
      <h2 className="titulo-buscador">Buscador de productos</h2>
      <div className="contenedor-input-boton">
        <input
          type="text"
          className="input-buscador"
          placeholder="Ingrese su producto..."
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
        />
        <div className="boton-buscar" onClick={manejarBusqueda}>
          Buscar
        </div>
      </div>
    </div>
  );
}

export default Buscador;