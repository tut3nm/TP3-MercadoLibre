import { useEffect, useState } from "react";
import axios from "axios";

const ID_CLIENTE = import.meta.env.VITE_ID_CLIENTE;
const SECRETO_CLIENTE = import.meta.env.VITE_SECRETO_CLIENTE;

const TokenSpotify = ({ alRecibirToken }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const obtenerToken = async () => {
      try {
        const respuesta = await axios.post(
          "https://accounts.spotify.com/api/token",
          new URLSearchParams({ grant_type: "client_credentials" }),
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

  return null;
};

export default TokenSpotify;
