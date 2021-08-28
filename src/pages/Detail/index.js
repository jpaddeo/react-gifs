import React from 'react';

import Gif from '../../components/Gif';
import useGlobalGifs from '../../hooks/useGlobalGifs';

export default function Detail({ params }) {
  const gifs = useGlobalGifs();
  const { id } = params;
  const gif = gifs.find((singleGif) => singleGif.id === id);
  return <Gif {...gif} />;
}
