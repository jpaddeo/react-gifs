import { useEffect, useRef } from 'react';

export default function useSEO({ title, description }) {
  const prevTitle = useRef(document.title);
  const prevDescription = useRef(
    document.querySelector('meta[name="description"]').getAttribute('content')
  );

  useEffect(() => {
    const previousTitle = prevTitle.current;
    if (title) {
      document.title = `ReactGifs | ${title}`;
    }
    return () => (document.title = previousTitle);
  }, [title, prevTitle]);
  useEffect(() => {
    const previousDescription = prevDescription.current;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (description) {
      metaDescription.setAttribute('content', description);
    }
    return () => metaDescription.setAttribute('content', previousDescription);
  }, [description, prevDescription]);
}
