import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Mostrar from './Mostrar';
import Obtener_Token from './Obtener_Token'; // Importar componente
import '../estilos/Buscador.css';

function Buscador() {
  const [producto, setProducto] = useState('');
  const [resultados, setResultados] = useState([]);
  const [token, setToken] = useState('');

  const manejarBusqueda = async () => {
    if (producto.trim() === '' || token === '') return;

    try {
      const respuesta = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(producto)}&limit=15`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResultados(respuesta.data.results);
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  };

  return (
    <div>
      {/* Se ejecuta automáticamente cuando el componente carga */}
      <Obtener_Token setToken={setToken} />

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

      {resultados.length > 0 && <Mostrar productos={resultados} />}
    </div>
  );
}

export default Buscador;


