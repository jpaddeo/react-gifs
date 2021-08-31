import React, { useCallback } from 'react';
import { useLocation } from 'wouter';
import ListOfGifs from '../../components/ListOfGifs';
import SearchForm from '../../components/SearchForm';

import { useGifs } from '../../hooks/useGifs';

import './Home.css';

export default function Home() {
  const [path, pushLocation] = useLocation();
  const { loading, gifs } = useGifs();

  const handleSubmit = useCallback(
    ({ keyword }) => {
      pushLocation(`/search/${keyword}`);
    },
    [pushLocation]
  );

  return (
    <>
      <h1>react(gifs)</h1>
      <SearchForm onSubmit={handleSubmit} />
      <h1>Ultima búsqueda</h1>
      <ListOfGifs gifs={gifs} />
    </>
  );
}
