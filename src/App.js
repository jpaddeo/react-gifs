import React, { useState } from 'react';
import { Route } from 'wouter';

import ListOfGifs from './components/ListOfGifs';

import './App.css';

function App() {
  const [keyword, setKeyword] = useState('panda');
  return (
    <div className='App'>
      <section className='App-content'>
        {['pandas', 'ecuador', 'argentina'].map((key, idx) => (
          <a key={idx} href={`/gif/${key}`}>
            Gifs de {key}
          </a>
        ))}
        <button onClick={() => setKeyword('mapache')}>Cambiar Keyword</button>
        <Route path='/gif/:keyword' component={ListOfGifs} />
      </section>
    </div>
  );
}

export default App;
