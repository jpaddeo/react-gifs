import React, { useRef, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import debounce from 'just-debounce-it';

import ListOfGifs from '../../components/ListOfGifs';

import { useGifs } from '../../hooks/useGifs';
import useNearScreen from '../../hooks/useNearScreen';
import SearchForm from '../../components/SearchForm';

export default function SearchResults({ params }) {
  const { keyword, rating = 'g' } = params;
  const { loading, gifs, setPage } = useGifs({ keyword, rating });
  const externalRef = useRef();
  const { isNearScreen } = useNearScreen({
    externalRef,
    once: false,
  });
  const title = gifs ? `${gifs.length} resultados de ${keyword}` : '';
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
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div>
          <SearchForm initialKeyword={keyword} initialRating={rating} />
          <h1>{decodeURIComponent(keyword)}</h1>
          <ListOfGifs gifs={gifs} />
        </div>
      )}
      <div id='visor' ref={externalRef}></div>
    </>
  );
}
