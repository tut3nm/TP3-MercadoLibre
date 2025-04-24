import { useState } from 'react'

import './App.css'
import './componentes/boton'
function App() {
  const [producto, setProducto] = useState(0)

  return (
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
  )
}

export default App
