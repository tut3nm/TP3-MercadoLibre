import { useState } from 'react'

import './App.css'
import './componentes/boton'
function App() {
  const [producto, setProducto] = useState(0)

  return (
<<<<<<< HEAD
    <>
      <h1>¿Que querés buscar?</h1>
      <div className='search-bar'>
        <input
          type="text"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
          placeholder="Ingresar producto..."/>

          <button onClick={manejarClick}>Buscar</button>
          {boton}
          <Boton texto={textoEnviado}/>
      </div>
    </>
    
=======
    <h1>Mercado Libre</h1>
>>>>>>> 51c8a58099e008aa65308711897c7d6330601d6e
  )
}

export default App
