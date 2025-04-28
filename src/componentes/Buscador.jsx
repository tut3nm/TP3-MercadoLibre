import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Mostrar from './Mostrar.jsx';
import '../estilos/Buscador.css';

function Buscador() {
  const [producto, setProducto] = useState('');
  const [resultados, setResultados] = useState([]);
  const [accessToken, setAccessToken] = useState(null); // Estado para almacenar el access token
  const client_id = 1576751186890669;
  const client_secret = 'XAtD0yWKHO9Fwof7PP6jk2BEpGJQLXz9';
  const redirect_uri = 'https://buscadormelidds.netlify.app/';

  useEffect(() => {
    const obtenerAccessToken = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
          const respuestaToken = await axios.post(
            'https://api.mercadolibre.com/oauth/token',
            new URLSearchParams({
              grant_type: 'authorization_code',
              client_id: client_id,
              client_secret: client_secret,
              code: code,
              redirect_uri: redirect_uri,
            }).toString(),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
              },
            }
          );
          setAccessToken(respuestaToken.data.access_token);
          // Opcional: Limpiar el código de la URL
          window.history.replaceState({}, document.title, window.location.pathname);
        } else {
          // Si no hay código, redirigir para autenticar
          const authUrl = `https://auth.mercadolibre.com.ar/authorize?response_type=code&client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
          window.location.href = authUrl;
        }
      } catch (error) {
        console.error('Error al obtener el access token:', error);
        if (error.response) {
          console.error('Detalles del error:', error.response.data);
        }
      }
    };

    obtenerAccessToken();
  }, [client_id, client_secret, redirect_uri]); // Dependencias para que se ejecute al montar y si cambian las credenciales

  const manejarBusqueda = async () => {
    if (producto.trim() === '') return;
    if (!accessToken) {
      console.warn('Aún no se ha obtenido el access token.');
      return;
    }
    try {
      const respuesta = await axios.get(
        `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(producto)}&limit=15`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Usar el accessToken del estado
          },
        }
      );
      setResultados(respuesta.data.results);
    } catch (error) {
      console.error('Error al buscar productos:', error);
      if (error.response) {
        console.error('Detalles del error de búsqueda:', error.response.data);
      }
    }
  };

  return (
    <div>
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
