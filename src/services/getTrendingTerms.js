import { API_URL, API_KEY } from './settings';

const fromApiResponseToGifs = (apiRes) => {
  const { data = [] } = apiRes;
  return data;
};

const getTrendingTerms = () => {
  const apiUrl = `${API_URL}/trending/searches?api_key=${API_KEY}`;
  return fetch(apiUrl)
    .then((res) => res.json())
    .then(fromApiResponseToGifs);
};

export default getTrendingTerms;
