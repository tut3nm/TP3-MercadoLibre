// src/componentes/Obtener_Token.jsx

import React, { useState } from 'react';
import axios from 'axios';

function Obtener_Token({ setToken }) {
  const [error, setError] = useState(null);

  const obtenerToken = async () => {
    try {
      const datos = {
        grant_type: 'client_credentials',
        client_id: '1576751186890669',
        client_secret: 'XAtD0yWKHO9Fwof7PP6jk2BEpGJQLXz9',
      };

      const respuesta = await axios.post('https://api.mercadolibre.com/oauth/token', datos, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        transformRequest: [(data) => {
          return Object.entries(data)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        }],
      });

      setToken(respuesta.data.access_token);
    } catch (error) {
      console.error('Error al obtener el token:', error);
      setError('Error al obtener el token');
    }
  };

  return (
    <div style={{ display: 'none' }}>
      {/* No mostramos nada visual, se maneja internamente */}
    </div>
  );
}

export default Obtener_Token;

