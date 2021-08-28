import React, { useState } from 'react';
import { useLocation } from 'wouter';
import ListOfGifs from '../../components/ListOfGifs';

import { useGifs } from '../../hooks/useGifs';

import './Home.css';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [path, pushLocation] = useLocation();
  const { loading, gifs } = useGifs();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    pushLocation(`/search/${keyword}`);
  };
  const handleChange = (ev) => {
    setKeyword(ev.target.value);
  };
  return (
    <>
      <h1>react(gifs)</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={keyword}
          onChange={handleChange}
          placeholder='Search a gif...'
        />
      </form>
      <h1>Ultima búsqueda</h1>
      <ListOfGifs gifs={gifs} />
    </>
  );
}
