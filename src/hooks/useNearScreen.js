import { useState, useEffect, useRef } from 'react';

export default function useNearScreen({
  distance = '100px',
  externalRef,
  once = true,
} = {}) {
  const [isNearScreen, setIsNearScreen] = useState(false);
  const elementRef = useRef();

  useEffect(() => {
    let observer;
    const element = externalRef ? externalRef.current : elementRef.current;
    const intersectCallback = (entries, observer) => {
      const el = entries[0];
      if (el.isIntersecting) {
        setIsNearScreen(true);
        once && observer.disconnect();
      } else {
        !once && setIsNearScreen(false);
      }
    };

    Promise.resolve(
      typeof IntersectionObserver !== 'undefined'
        ? IntersectionObserver
        : import('intersection-observer')
    ).then(() => {
      observer = new IntersectionObserver(intersectCallback, {
        rootMargin: distance,
      });
      observer.observe(element);
    });

    return () => observer && observer.disconnect();
  }, [distance, externalRef, once]);

  return { isNearScreen, elementRef };
}
