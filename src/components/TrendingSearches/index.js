import React, { useState, useEffect, useRef } from 'react';

import Category from '../Category';

import getTrendingTerms from '../../services/getTrendingTerms';

function TrendingSearches() {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    getTrendingTerms().then(setTrends);
  }, []);

  return <Category name='Tendencias' options={trends} />;
}

export default function LazyTrending() {
  const [show, setShow] = useState(false);
  const elementRef = useRef();

  useEffect(() => {
    let observer;
    const intersectCallback = (entries, observer) => {
      const el = entries[0];
      if (el.isIntersecting) {
        setShow(true);
        observer.disconnect();
      }
    };

    Promise.resolve(
      typeof IntersectionObserver !== 'undefined'
        ? IntersectionObserver
        : import('intersection-observer')
    ).then(() => {
      observer = new IntersectionObserver(intersectCallback, {
        rootMargin: '100px',
      });
      observer.observe(elementRef.current);
    });

    return () => observer && observer.disconnect();
  }, []);

  return <div ref={elementRef}>{show ? <TrendingSearches /> : null}</div>;
}
