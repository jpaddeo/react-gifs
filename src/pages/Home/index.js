import React from 'react';
import { Helmet } from 'react-helmet';
import ListOfGifs from '../../components/ListOfGifs';
import SearchForm from '../../components/SearchForm';

import { useGifs } from '../../hooks/useGifs';

import './Home.css';

export default function Home() {
  const { gifs } = useGifs();

  return (
    <>
      <Helmet>
        <title>ReactGifs | Home</title>
        <meta name='application-name' content='ReactGifs' />
        <meta name='robots' content='index,follow' />
        <meta name='googlebot' content='index,follow' />
        <meta name='description' content='ReactGifs Home page' />
      </Helmet>
      <h1>react(gifs)</h1>
      <SearchForm />
      <h1>Ultima búsqueda</h1>
      <ListOfGifs gifs={gifs} />
    </>
  );
}
