import { API_URL, API_KEY } from './settings';

const fromApiResponseToGifs = (apiRes) => {
  const { data = [] } = apiRes;
  if (Array.isArray(data)) {
    const gifs = data.map((apiGif) => {
      const { id, title, images } = apiGif;
      const { url } = images.downsized_medium;
      return { id, title, url };
    });
    return gifs;
  }
  return data;
};

const getGifs = ({
  keyword = 'morty',
  limit = 5,
  rating = 'g',
  language = 'es',
  page = 0,
} = {}) => {
  const apiUrl = `${API_URL}/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=${limit}&offset=${
    page * limit
  }&rating=${rating}&lang=${language}`;

  return fetch(apiUrl)
    .then((res) => res.json())
    .then(fromApiResponseToGifs);
};

export default getGifs;
