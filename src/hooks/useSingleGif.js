import { useState, useEffect } from 'react';
import { useGifs } from './useGifs';

import getSingleGif from '../services/getSingleGif';

export default function useSingleGif({ id }) {
  const { gifs } = useGifs();
  const gifFromCache = gifs.find((singleGif) => singleGif.id === id);
  const [gif, setGif] = useState(gifFromCache);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!gif) {
      setLoading(true);
      getSingleGif({ id })
        .then((gifFromService) => {
          setGif(gifFromService);
          setLoading(false);
          setError(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
        });
    }
  }, [gif, id]);

  return { gif, loading, error };
}
