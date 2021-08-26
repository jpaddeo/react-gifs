const API_KEY = 'DKAyxa7pT2X7DsQ3sQZDdudEqhfWUxK2';

const getGifs = ({ keyword = 'morty' } = {}) => {
  const API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=25&offset=0&rating=g&lang=en`;
  return fetch(API_URL)
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
