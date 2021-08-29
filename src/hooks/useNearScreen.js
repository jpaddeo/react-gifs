import { useState, useEffect, useRef } from 'react';

export default function useNearScreen({ distance = '100px' } = {}) {
  const [isNearScreen, setIsNearScreen] = useState(false);
  const elementRef = useRef();
  useEffect(() => {
    let observer;
    const intersectCallback = (entries, observer) => {
      const el = entries[0];
      if (el.isIntersecting) {
        setIsNearScreen(true);
        observer.disconnect();
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
      observer.observe(elementRef.current);
    });

    return () => observer && observer.disconnect();
  }, [distance]);

  return { isNearScreen, elementRef };
}
