import React, { useState, useEffect } from 'react';
import Gif from './Gif';

import getGifs from '../services/getGifs';

const ListOfGifs = ({ params }) => {
  const [gifs, setGifs] = useState([]);
  const { keyword } = params;
  useEffect(() => {
    getGifs({ keyword }).then((gifs) => setGifs(gifs));
  }, [keyword]);

  return (
    <>
      {gifs.map(({ id, title, url }, idx) => (
        <Gif key={id} id={id} title={title} url={url} />
      ))}
    </>
  );
};

export default ListOfGifs;
