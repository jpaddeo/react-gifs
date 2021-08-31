import React, { useRef, useCallback, useEffect } from 'react';
import debounce from 'just-debounce-it';

import ListOfGifs from '../../components/ListOfGifs';

import { useGifs } from '../../hooks/useGifs';
import useNearScreen from '../../hooks/useNearScreen';

export default function SearchResults({ params }) {
  const { keyword } = params;
  const { loading, gifs, setPage } = useGifs({ keyword });
  const externalRef = useRef();
  const { isNearScreen } = useNearScreen({
    externalRef,
    once: false,
  });

  const debounceHandleNextPage = useCallback(
    () =>
      debounce(
        setPage((currentPage) => currentPage + 1),
        200
      ),
    [setPage]
  );

  useEffect(() => {
    if (isNearScreen) debounceHandleNextPage();
  }, [isNearScreen, debounceHandleNextPage]);

  return (
    <>
      {loading ? <span>Loading...</span> : <div><h1>{keyword}</h1><ListOfGifs gifs={gifs} /></div>}
      <div id='visor' ref={externalRef}></div>
    </>
  );
}
