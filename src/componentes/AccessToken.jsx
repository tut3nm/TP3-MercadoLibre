// src/Componentes/TokenSpotify.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const ID_CLIENTE = "f01da26954a8481380ab4ffd1f8e3fc5";
const SECRETO_CLIENTE = "ed2a3a6707084526864d24d5a01c99a2";

const TokenSpotify = ({ alRecibirToken }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const obtenerToken = async () => {
      try {
        const respuesta = await axios.post(
          "https://accounts.spotify.com/api/token",
          new URLSearchParams({grant_type: "client_credentials"}),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization:
                "Basic " + btoa(`${ID_CLIENTE}:${SECRETO_CLIENTE}`),
            },
          }
        );

        const tokenObtenido = respuesta.data.access_token;
        setToken(tokenObtenido);
        if (alRecibirToken) alRecibirToken(tokenObtenido);
      } catch (error) {
        console.error("Error al obtener el token de Spotify:", error);
      }
    };

    obtenerToken();
  }, []);

  return null; // No renderiza nada visible
};

export default TokenSpotify;
