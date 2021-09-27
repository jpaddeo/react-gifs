import { useState, useEffect, useContext } from 'react';

import GifsContext from '../context/GifsContext';
import getGifs from '../services/getGifs';

const INITIAL_PAGE = 0;

export function useGifs({ keyword, rating } = { keyword: null }) {
  const { gifs, setGifs } = useContext(GifsContext);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(INITIAL_PAGE);

  const keywordToUse =
    keyword || localStorage.getItem('lastKeyword') || 'random';

  useEffect(() => {
    setLoading(true);
    getGifs({ keyword: keywordToUse, rating }).then((resGifs) => {
      setGifs(resGifs);
      setLoading(false);
      localStorage.setItem('lastKeyword', keyword);
    });
  }, [keyword, keywordToUse, rating, setGifs]);

  useEffect(() => {
    if (page === INITIAL_PAGE) return;
    getGifs({ keyword: keywordToUse, rating, page }).then((nextGifs) => {
      setGifs((prevGifs) => prevGifs.concat(nextGifs));
    });
  }, [keywordToUse, page, rating, setGifs]);

  return { loading, gifs, rating, setPage };
}
