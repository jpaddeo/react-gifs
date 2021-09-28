import React from 'react';
import { Link, Route } from 'wouter';

import StaticContext from './context/StaticContext';
import { GifsContextProvider } from './context/GifsContext';

import Detail from './pages/Detail';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';

import TrendingSearches from './components/TrendingSearches';

import './App.css';

const initialContextProvider = {
  name: 'react-gifs',
  dataAContextear: true,
};

function App() {
  return (
    <StaticContext.Provider value={initialContextProvider}>
      <div className='App'>
        <section className='App-content'>
          <Link to='/'>
            <figure className='App-logo'>
              <img alt='Giffy logo' src='/logo192.png' />
            </figure>
          </Link>
          <GifsContextProvider>
            <Route path='/' component={Home} />
            <Route path='/search/:keyword/:rating?/:language?' component={SearchResults} />
            <Route path='/gif/:id' component={Detail} />
            <Route path='/404' component={() => <h1>404 Error :(</h1>} />
          </GifsContextProvider>
          <div className='App-category'>
            <TrendingSearches />
          </div>
        </section>
      </div>
    </StaticContext.Provider>
  );
}

export default App;
