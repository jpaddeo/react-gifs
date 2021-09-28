import React from 'react';
import { useLocation } from 'wouter';

import { RATINGS, LANGUAGES } from '../../hooks/useStaticData';

import useForm from './hook';

function SearchForm({ initialKeyword = '', initialRating, initialLanguage }) {
  const {
    keyword,
    rating,
    language,
    times,
    updateKeyword,
    updateRating,
    updateLanguage,
  } = useForm({
    initialKeyword,
    initialRating,
    initialLanguage,
  });

  const [_, pushLocation] = useLocation();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    pushLocation(`/search/${keyword}/${rating}/${language}`);
  };

  const handleChangeKeyword = (ev) => {
    updateKeyword(ev.target.value);
  };

  const handleChangeRating = (ev) => {
    updateRating(ev.target.value);
  };

  const handleChangeLanguage = (ev) => {
    updateLanguage(ev.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={keyword}
        onChange={handleChangeKeyword}
        placeholder='Search a gif...'
      />
      <select value={rating} onChange={handleChangeRating}>
        <option disabled>Rating type</option>
        {RATINGS.map((rating) => (
          <option key={rating}>{rating}</option>
        ))}
      </select>
      <select value={language} onChange={handleChangeLanguage}>
        <option disabled>Language</option>
        {LANGUAGES.map((lang) => (
          <option key={lang.key} value={lang.key}>
            {lang.name}
          </option>
        ))}
      </select>
      <small>{times}</small>
    </form>
  );
}

export default React.memo(SearchForm);
