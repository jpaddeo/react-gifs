import React from 'react';
import { Redirect } from 'wouter';
import { Helmet } from 'react-helmet';

import Gif from '../../components/Gif';
import useSingleGif from '../../hooks/useSingleGif';
// import useGlobalGifs from '../../hooks/useGlobalGifs';

export default function Detail({ params }) {
  const { id } = params;
  const { gif, loading, error } = useSingleGif({ id });
  const title = gif ? gif.title : '';

  if (loading)
    return (
      <>
        <Helmet>
          <title>Cargando...</title>
        </Helmet>
        <span>Loading...</span>
      </>
    );
  if (error) return <Redirect to='/404' />;
  if (!gif) return null;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <h3 className='App-title'>{gif.title}</h3>
      <Gif id={gif.id} title={gif.title} url={gif.url} />
    </>
  );
}
