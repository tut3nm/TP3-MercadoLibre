import React, { useState } from 'react';
import axios from 'axios';
import '../estilos/Buscador.css';
import Mostrar from './Mostrar.jsx'; // Antes: Resultados

function Buscador() {
  const [producto, setProducto] = useState('');
  const [resultados, setResultados] = useState([]);

  const manejarBusqueda = async () => {
    if (producto.trim() === '') return;

    try {
      const respuesta = await axios.get(
        `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(producto)}&limit=15`
      );
      setResultados(respuesta.data.results);
    } catch (error) {
      console.error('Error al buscar productos:', error);
      setResultados([]);
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

      {/* pasamos los resultados al componente Mostrar */}
      <Mostrar productos={resultados} />
    </div>
  );
}

export default Buscador;
