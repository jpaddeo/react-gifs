import { API_URL, API_KEY } from './settings';

const fromApiResponseToGifs = (apiRes) => {
  const { data = [] } = apiRes;
  const { id, title, images } = data;
  const { url } = images.downsized_medium;
  return { id, title, url };
};

const getSingleGif = ({ id }) => {
  const apiUrl = `${API_URL}/gifs/${id}?api_key=${API_KEY}`;

  return fetch(apiUrl)
    .then((res) => res.json())
    .then(fromApiResponseToGifs);
};

export default getSingleGif;
