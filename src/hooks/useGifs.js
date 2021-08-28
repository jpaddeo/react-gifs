import { useState, useEffect, useContext } from 'react';

import GifsContext from '../context/GifsContext';
import getGifs from '../services/getGifs';

export function useGifs({ keyword } = { keyword: null }) {
  const { gifs, setGifs } = useContext(GifsContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const keywordToUse =
      keyword || localStorage.getItem('lastKeyword') || 'random';
    getGifs({ keyword: keywordToUse }).then((resGifs) => {
      setGifs(resGifs);
      setLoading(false);
      localStorage.setItem('lastKeyword', keyword);
    });
  }, [keyword, setGifs]);

  return { loading, gifs };
}
