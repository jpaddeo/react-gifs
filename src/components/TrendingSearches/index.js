import React, { Suspense } from 'react';
import useNearScreen from '../../hooks/useNearScreen';

const TrendingSearches = React.lazy(() => import('./TrendingSearches'));

export default function LazyTrending() {
  const { isNearScreen, elementRef } = useNearScreen({ distance: '200px' });

  return (
    <div ref={elementRef}>
      <Suspense fallback={<span>Loading...</span>}>
        {isNearScreen ? <TrendingSearches /> : <span>Loading...</span>}
      </Suspense>
    </div>
  );
}
