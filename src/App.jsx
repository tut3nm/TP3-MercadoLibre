import React, { useState } from 'react';
import './App.css';
import Buscador from './componentes/Buscador';
import TokenSpotify from './componentes/AccessToken';

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="App">
      <TokenSpotify alRecibirToken={setToken} />
      {token && <Buscador token={token} />}
    </div>
  );
}

export default App;
