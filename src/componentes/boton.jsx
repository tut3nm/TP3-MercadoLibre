import axios from 'axios'

async function boton(producto){
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(palabraClave)}`;

    try {
        const respuesta = await axios.get(url);
        const resultados = respuesta.data.results.slice(0, 5);
        return resultados;
      } catch (error) {
        console.error('Error al buscar productos:', error);
        return [];
    }
}