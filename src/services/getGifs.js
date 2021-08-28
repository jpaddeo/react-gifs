import { API_URL, API_KEY } from './settings';

const getGifs = ({ keyword = 'morty' } = {}) => {
  const apiUrl = `${API_URL}/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=25&offset=0&rating=g&lang=en`;
  return fetch(apiUrl)
    .then((res) => res.json())
    .then((response) => {
      const { data } = response;
      if (Array.isArray(data)) {
        const gifs = data.map((apiGif) => {
          const { id, title, images } = apiGif;
          const { url } = images.downsized_medium;
          return { id, title, url };
        });
        return gifs;
      }
    });
};

export default getGifs;
